import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Button, IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions,MenuItem, FormControl,Typography, InputLabel, Select, Grid, InputAdornment} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import  ListeneintragBO  from '../../api/ListeneintragBO';
import  API from '../../api/API';
import ContextErrorMessage from './ContextErrorMessage';
import LoadingProgress from './LoadingProgress';
import SearchIcon from '@material-ui/icons/Search';
import TextField from '@material-ui/core/TextField';

/**
 * Zeigt einen modalen Formulardialog für ein ArtikelBO in prop artikel. Wenn der Artikel
 * angelegt ist, ist der Dialog als ein Editierdialog konfiguriert. Dabei ist das Formular mit dem gegebenen
 * ArtikelBO Objekt befüllt. Wenn der Artikel null ist, wird der Dialog als ein neuer Artikel
 * Dialog konfiguriert und die Textfelder sind leer. In Abhängigkeit des editier/neu Zustands werden die Backend
 * Aufrufe gemacht, um einen Artikel upzudaten oder anzulegen. Danach wird die Funktion des onClose prop
 * mit dem angelegt/upgedated ArtikelBO Objekt als Parameter aufgerufen. Wenn der Dialog beendet ist,
 * wird onClose mit null aufgerufen.
 */

class ListeneintragForm extends Component {

  constructor(props) {
    super(props);

    let lan = '', lam = '', lae = '', len = '', lbn = '', le = '';
    if (props.listeneintrag) {
      //lan = props.listeneintrag.getArtikel_name();
      lan = props.listeneintrag.getArtikel_name();
      lam = props.listeneintrag.getMenge();
      lae = props.listeneintrag.getArtikel_einheit();
      len = props.listeneintrag.getEinzelhaendler_name();
      lbn = props.listeneintrag.getBenutzer_name();
      le  = props.listeneintrag.getErledigt();
    }

    // Init state
    this.state = {
      benutzerObjekt: null,
      benutzerSearchError: null,
      benutzerNotFound: false,
      einzelhaendlerObjekt: null,
      einzelhaendlerSearchError: null,
      einzelhaendlerNotFound: false,
      artikelObjekt: null,
      artikelSearchError: null,
      artikelNotFound: false,
      listeneintragArtikelName: lan,
      listeneintragArtikelNameValidationFailed: false,
      listeneintragArtikelNameEdited: false,
      listeneintragArtikelMenge: lam,
      listeneintragArtikelMengeEdited: false,
      listeneintragArtikelMengeError: false,
      listeneintragArtikelEinheit: lae,
      listeneintragArtikelEinheitEdited: false,
      listeneintragEinzelhaendlerName: len,
      listeneintragEinzelhaendlerNameEdited: false,
      listeneintragBenutzerName: lbn,
      listeneintragBenutzerNameEdited: false,
      listeneintragErledigt: le,
      listeneintragErledigtEdited: false,
      filteredArtikel: [],
      addingInProgress: false,
      updatingInProgress: false,
      addingError: null,
      updatingError: null,
    };

    // Speichere dieses state zum abbrechen
    this.baseState = this.state;
  }

  /** Legt Listeneintrag an */
  addListeneintrag = () => {
    let newListeneintrag = new ListeneintragBO();
    console.log(this.state.listeneintragArtikelMenge)
    newListeneintrag.setMenge(this.state.listeneintragArtikelMenge);
    newListeneintrag.setEinkaufsliste_id(this.props.einkaufsliste.getID());
    newListeneintrag.setEinzelhaendler_id(this.state.einzelhaendlerObjekt.getID())
    newListeneintrag.setEinzelhaendler_name(this.state.einzelhaendlerObjekt.getName())
    newListeneintrag.setArtikel_name(this.state.artikelObjekt.getName());
    newListeneintrag.setArtikel_id(this.state.artikelObjekt.getID())
    newListeneintrag.setArtikel_einheit(this.state.artikelObjekt.getEinheit());
    newListeneintrag.setBenutzer_id(this.state.benutzerObjekt.getID())               //legt neues Artikelobjekt mit name aus dem state an
    newListeneintrag.setBenutzer_name(this.state.benutzerObjekt.getName())
    API.getAPI().addListeneintragAPI(newListeneintrag).then(listeneintrag => {
      // Backend Aufruf erfolgreich
      // reinit den Dialog state für einen neuen leeren Artikel
      this.setState(this.baseState);
      this.props.onClose(listeneintrag); // Aufruf mit Hilfe des Artikel Objekts aus dem Backend
    }).catch(e =>
      this.setState({
        updatingInProgress: false,    // Ladeanzeige deaktivieren
        updatingError: e              // Zeige Error Nachricht
      })
    );

    // Setze laden als true
    this.setState({
      updatingInProgress: true,       // Ladeanzeige anzeigen
      updatingError: null             // Fehlermeldung deaktivieren
    });

    this.props.reload() // Seite wird neugeladen damit die neue letzte Änderung kenntlich gemacht werden kann
  }

  /** Updated den Listeneintrag */
  updateListeneintrag = () => {
    // Klont den originalen Artikel, wenn der Backend Aufruf fehlschlägt
    let updatedListeneintrag = Object.assign(new ListeneintragBO(), this.props.listeneintrag);
    // Setzt die neuen Attribute aus dem Dialog
    updatedListeneintrag.setArtikel_name(this.state.artikelObjekt.getName());
    updatedListeneintrag.setArtikel_id(this.state.artikelObjekt.getID());
    updatedListeneintrag.setMenge(this.state.listeneintragMenge);
    updatedListeneintrag.setArtikel_einheit(this.state.artikelObjekt.getEinheit());
    updatedListeneintrag.setEinzelhaendler_name(this.state.einzelhaendler_name)
    updatedListeneintrag.setBenutzer_id(this.state.benutzer_name)
    updatedListeneintrag.setErledigt(this.state.erledigt)
    API.getAPI().updateListeneintragAPI(updatedListeneintrag).then(listeneintrag => {
      this.setState({
        updatingInProgress: false,              // Ladeanzeige deaktivieren
        updatingError: null                     // Keine Error Nachricht
      });
      // Behalte das neue state als Base state
      this.baseState.artikel_name = this.state.artikel_name;
      this.baseState.listeneintragMenge = this.state.listeneintragMenge;
      this.baseState.artikel_einheit = this.state.artikel_einheit;
      this.baseState.einzelhaendler_name = this.state.einzelhaendler_name;
      this.baseState.benutzer_name = this.state.benutzer_name;
      this.baseState.erledigt = this.state.erledigt;
      this.props.onClose(updatedListeneintrag);      // Aufruf mit dem neuen Artikel
    }).catch(e =>
      this.setState({
        updatingInProgress: false,              // Ladeanzeige deaktivieren
        updatingError: e                        // Zeige Error Nachricht
      })
    );

    // Setzt laden auf true
    this.setState({
      updatingInProgress: true,                 // Ladeanzeige anzeigen
      updatingError: null                       // Fehlermeldung deaktivieren
    });
    this.props.reload()  // Seite wird neugeladen damit die neue letzte Änderung kenntlich gemacht werden kann
  }

listeneintragArtikelNameChange = (event) => {
    let artikelName = event.target.value;
    this.setState({
      listeneintragArtikelName: artikelName,
      listeneintragArtikelNameEdited: true
    });
  }

  listeneintragArtikelMengeChange = (event) => {
    let menge = event.target.value;
    this.setState({
      listeneintragArtikelMenge: menge,
      listeneintragArtikelMengeEdited: true
    });

    if(isNaN(menge)){
      this.setState({
        listeneintragArtikelMengeError: true
      })
    }
    else{
      this.setState({
        listeneintragArtikelMengeError: false
      })
    }
  }

  listeneintragArtikelEinheitChange= (event) => {
    let einheit = event.target.value;
    this.setState({
      listeneintragArtikelEinheit: einheit,
      listeneintragArtikelEinheitEdited: true
    });
  }

  listeneintragEinzelhaendlerNameChange = (event) => {
    let einzelhaendlerName = event.target.value;
    this.setState({
      listeneintragEinzelhaendlerName: einzelhaendlerName,
      listeneintragEinzelhaendlerNameEdited: true
    });
  }

  listeneintragBenutzerNameChange = (event) => {
    let benutzerName = event.target.value;
    this.setState({
      listeneintragBenutzerName: benutzerName,
      listeneintragBenutzerNameEdited: true
    });
  }

  /** Behandelt das schließen/abbrechen Tasten klick Ereignis. */
  handleClose = () => {
    // Setzt state zurück
    this.setState(this.baseState);
    this.props.onClose(null);
  }

  /** Behandelt das onChange Ereignis von dem Artikel filtern Textfeld */
  filterFieldValueChange = event => {
    const value = event.target.value.toLowerCase();
    this.setState({
      filteredArtikel: this.state.listeneintragArtikelName.filter(artikel => {
        let NameContainsValue = artikel.getName().toLowerCase().includes(value);
        return NameContainsValue;
      }),
      artikelFilter: value
    });
  }

/** Searches for customers with a customerName and loads the corresponding accounts */
  sucheArtikel = async () => {
    const { listeneintragArtikelName } = this.state;
    if (listeneintragArtikelName.length > 0) {
      try {
        // set loading to true
        this.setState({
          artikelObjekt: null,            // the initial customer
          loadingInProgress: true,              // show loading indicator
          artikelSearchError: null             // disable error message
        });

        // Load customers first
        const artikel = await API.getAPI().getArtikelByNameAPI(listeneintragArtikelName);

        // Set the final state
        this.setState({
          artikelObjekt: artikel[0],
          loadingInProgress: false,           // disable loading indicator
          artikelSearchError: null,
          artikelNotFound: false,
        });
          if(!artikel[0]){
          this.setState({
          artikelNotFound: true           // no error message
        });
        }
      } catch (e) {
        this.setState({
          artikelObjekt: null,
          loadingInProgress: false,           // disable loading indicator
          artikelSearchError: e              // show error message
        });
      }
    } else {
      this.setState({
        artikelNotFound: true
      });
    }
  }

/** Searches for customers with a customerName and loads the corresponding accounts */
  sucheEinzelhaendler = async () => {
    const { listeneintragEinzelhaendlerName } = this.state;
    if (listeneintragEinzelhaendlerName.length > 0) {
      try {
        // set loading to true
        this.setState({
          einzelhaendlerObjekt: null,            // the initial customer
          loadingInProgress: true,              // show loading indicator
          einzelhaendlerSearchError: null             // disable error message
        });

        // Load customers first
        const einzelhaendler = await API.getAPI().getEinzelhaendlerByNameAPI(listeneintragEinzelhaendlerName);

        // Set the final state
        this.setState({
          einzelhaendlerObjekt: einzelhaendler[0],
          loadingInProgress: false,           // disable loading indicator
          einzelhaendlerSearchError: null,
          einzelhaendlerNotFound: false           // no error message
        });
        if(!einzelhaendler[0]){
          this.setState({
          einzelhaendlerNotFound: true           // no error message
        });
        }

      } catch (e) {
        this.setState({
          einzelhaendlerObjekt: null,
          loadingInProgress: false,           // disable loading indicator
          einzelhaendlerSearchError: e              // show error message
        });
      }
    } else {
      this.setState({
        einzelhaendlerNotFound: true
      });
    }
  }

/** Searches for customers with a customerName and loads the corresponding accounts */
  sucheBenutzer = async () => {
    const { listeneintragBenutzerName } = this.state;
    if (listeneintragBenutzerName.length > 0) {
      try {
        // set loading to true
        this.setState({
          benutzerObjekt: null,            // the initial customer
          loadingInProgress: true,              // show loading indicator
          benutzerSearchError: null             // disable error message
        });

        // Load customers first
        const benutzer = await API.getAPI().getBenutzerByNameAPI(listeneintragBenutzerName);

        // Set the final state
        this.setState({
          benutzerObjekt: benutzer[0],
          loadingInProgress: false,           // disable loading indicator
          benutzerSearchError: null,
          benutzerNotFound: false           // no error message
        });
        if(!benutzer[0]){
          this.setState({
          benutzerNotFound: true           // no error message
        });
        }

      } catch (e) {
        this.setState({
          benutzerObjekt: null,
          loadingInProgress: false,           // disable loading indicator
          benutzerSearchError: e              // show error message
        });
      }
    } else {
      this.setState({
        benutzerNotFound: true
      });
    }
  }

  /** Rendert die Komponente */
  render() {
    const { classes,show,listeneintrag, artikel } = this.props;
    const { listeneintragArtikelName, listeneintragArtikelNameValidationFailed, listeneintragArtikelNameEdited,
            listeneintragArtikelMenge, listeneintragArtikelMengeEdited, listeneintragArtikelEinheit,
            listeneintragArtikelEinheitEdited, listeneintragEinzelhaendlerName, listeneintragEinzelhaendlerNameEdited,
            listeneintragBenutzerName, addingInProgress, addingError, updatingInProgress, updatingError,
            artikelCombobox, einheitCombobox, einzelhaendlerCombobox, benutzerCombobox, ausgewaehlterArtikelBO,
      artikelSearchError, alleArtikel , artikelNotFound, artikelObjekt, einzelhaendlerNotFound, einzelhaendlerObjekt, benutzerObjekt, benutzerNotFound ,listeneintragArtikelMengeError} = this.state;

    let title = '';
    let header = '';

    if (listeneintrag) {
      // Erstellt einen neuen Artikel, wenn nicht bereits einer vorhanden ist.
      title = 'Update des Listeneintrags';
      header = `Listeneintrag ID: ${listeneintrag.getID()}`;
    } else {
      title = 'Erstelle einen neuen Listeneintrag';
      header = 'Gebe Listeneintragsdaten ein';
    }

    return (
      show ?
        <Dialog open={show} onClose={this.handleClose} maxWidth='xs'>
          <DialogTitle id='form-dialog-title'>{title}
            <IconButton className={classes.closeButton} onClick={this.handleClose}>
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              {header}
            </DialogContentText>
            <form className={classes.root} noValidate autoComplete='off'>

              <TextField autoFocus fullWidth margin='normal' type='text' required id='ArtikelName' label='Artikel Name:'
                    onChange={this.listeneintragArtikelNameChange}
                    error={artikelNotFound}
                    helperText={artikelNotFound ? 'Es wurden keine Artikel mit diesem Namen gefunden' : ' '}
                    InputProps={{
                      endAdornment: <InputAdornment position='end'>
                        <IconButton onClick={this.sucheArtikel}>
                          <SearchIcon />
                        </IconButton>
                      </InputAdornment>,
                    }} />

                    <div>
                      {artikelObjekt ?
                          <Typography>Einheit: {artikelObjekt.getEinheit()}</Typography>
                              :null
                      }
                    </div>

              <TextField autoFocus type='text' required fullWidth margin='normal' id='menge' label='Menge' value={listeneintragArtikelMenge}
                onChange={this.listeneintragArtikelMengeChange}
                helperText={listeneintragArtikelMengeError ? 'ACHTUNG: Geben Sie eine Zahl ein' : ' '} />

                <TextField autoFocus fullWidth margin='normal' type='text' required id='EinzelhaendlerName' label='Einzelhändler Name:'
                    onChange={this.listeneintragEinzelhaendlerNameChange}
                    error={einzelhaendlerNotFound}
                    helperText={einzelhaendlerNotFound ? 'Es wurden keine Einzelhändler mit diesem Namen gefunden' : ' '}
                    InputProps={{
                      endAdornment: <InputAdornment position='end'>
                        <IconButton onClick={this.sucheEinzelhaendler}>
                          <SearchIcon />
                        </IconButton>
                      </InputAdornment>,
                    }} />

                <TextField autoFocus fullWidth margin='normal' type='text' required id='BenutzerName' label='Benutzer Name:'
                    onChange={this.listeneintragBenutzerNameChange}
                    error={benutzerNotFound}
                    helperText={benutzerNotFound ? 'Es wurden keine Benutzer mit diesem Namen gefunden' : ' '}
                    InputProps={{
                      endAdornment: <InputAdornment position='end'>
                        <IconButton onClick={this.sucheBenutzer}>
                          <SearchIcon />
                        </IconButton>
                      </InputAdornment>,
                    }} />
          <FormControl className={classes.formControl}>
          </FormControl>
          <FormControl className={classes.formControl}>
          </FormControl>
            </form>
            <LoadingProgress show={addingInProgress || updatingInProgress} />
            {
              // Zeigt Error Nachricht in Abhängigkeit des Artikel prop.
              listeneintrag ?
                <ContextErrorMessage error={artikelSearchError} contextErrorMsg={`Der Artikel ${artikel.getID()} konnte nicht geupdatet werden.`} onReload={this.sucheArtikel} />
                :
                <ContextErrorMessage error={addingError} contextErrorMsg={`Der Artikel konnte nicht hinzugefügt werden..`} onReload={this.addArtikel} />
            }
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color='secondary'>
              Abbrechen
            </Button>
            {
              // Wenn Artikel vorhanden ist, zeige eine Update Taste, sonst eine Anlegen Taste.
              listeneintrag ?
                <Button disabled={listeneintragArtikelNameValidationFailed} variant='contained' onClick={this.updateListeneintrag} color='primary'>
                  Update
              </Button>
                : <Button disabled={false} variant='contained' onClick={this.addListeneintrag} color='primary'>
                  Hinzufügen
             </Button>
            }
          </DialogActions>
        </Dialog>
        : null
    );
  }
}




/** Componentenspezifische Stile */

const styles = theme => ({
  root: {
    width: '100%',
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  formControl: {
    minWidth: 150,
    margin: 5,
  }
});

/** PropTypes */

ListeneintragForm.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,
  /** Das ArtikelBO wird editiert. */
  listeneintrag: PropTypes.object,
  /** Wenn true, wird das Formular gerendert. */
  show: PropTypes.bool.isRequired,
  /**
   * Handler Funktion, die aufgerufen wird wenn der Dialog geschlossen ist.
   * Sendet das editierte oder angelegte ArtikelBO als Parameter oder null,
   * wenn abbrechen gedrückt wurde.
   */
  onClose: PropTypes.func.isRequired,
  artikel: PropTypes.func.isRequired,
}

export default withStyles(styles)(ListeneintragForm);