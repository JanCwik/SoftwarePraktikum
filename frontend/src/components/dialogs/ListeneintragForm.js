
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Button, IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions,MenuItem, FormControl,Typography, InputLabel, Select, Grid, InputAdornment} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import  ListeneintragBO  from '../../api/ListeneintragBO';
import  API from '../../api/API';
import ContextErrorMessage from './ContextErrorMessage';
import LoadingProgress from './LoadingProgress';
import SearchIcon from '@material-ui/icons/Search';
import ClearIcon from "@material-ui/icons/Clear";
import TextField from '@material-ui/core/TextField';



import Autocomplete from '@material-ui/lab/Autocomplete';

/**
 * Zeigt einen modalen Formulardialog für ein ArtikelBO in prop artikel. Wenn der Artikel
 * angelegt ist, ist der Dialog als ein Editierdialog konfiguriert. Dabei ist das Formular mit dem gegebenen
 * ArtikelBO Objekt befüllt. Wenn der Artikel null ist, wird der Dialog als ein neuer Artikel            <form noValidate autoComplete='off'>
              {
                // show a search text field if there are no searchedCustomer yet
                (targetCustomers.length === 0) ?
                  <TextField autoFocus fullWidth margin='normal' type='text' required id='customerName' label='Customer name:'
                    onChange={this.textFieldValueChange}
                    onBlur={this.searchCustomer}
                    error={customerNotFound}
                    helperText={customerNotFound ? 'No customers with the given name have been found' : ' '}
                    InputProps={{
                      endAdornment: <InputAdornment position='end'>
                        <IconButton onClick={this.searchCustomer}>
                          <SearchIcon />
                        </IconButton>
                      </InputAdornment>,
                    }} />
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
      artikelObjekt: null,
      artikelSearchError: null,
      artikelNotFound: false,
      listeneintragArtikelName: lan,
      listeneintragArtikelNameValidationFailed: false,
      listeneintragArtikelNameEdited: false,
      listeneintragArtikelMenge: lam,
      listeneintragArtikelMengeEdited: false,
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










  /** Legt Artikel an */

  addListeneintrag = () => {
    let newListeneintrag = new ListeneintragBO();
    newListeneintrag.setArtikel_name(this.state.ausgewaehlterArtikelBO.getName());
    newListeneintrag.setArtikel_id(this.state.ausgewaehlterArtikelBO.getID())
    newListeneintrag.setMenge(this.state.listeneintragMenge);
    newListeneintrag.setArtikel_einheit(this.state.ausgewaehlterArtikelBO.getEinheit());
    newListeneintrag.setEinzelhaendler_name(this.state.einzelhaendler_name)
    newListeneintrag.setBenutzer_id(this.state.benutzer_name)//legt neues Artikelobjekt mit name aus dem state an
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

  /** Updates the customer */

  updateListeneintrag = () => {
    // Klont den originalen Artikel, wenn der Backend Aufruf fehlschlägt
    let updatedListeneintrag = Object.assign(new ListeneintragBO(), this.props.listeneintrag);
    // Setzt die neuen Attribute aus dem Dialog
    updatedListeneintrag.setArtikel_name(this.state.artikel_name);
    updatedListeneintrag.setMenge(this.state.listeneintragMenge);
    updatedListeneintrag.setArtikel_einheit(this.state.artikel_einheit);
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
/*
  // Behandelt Wertänderungen aus den Textfeldern vom Formular und validiert diese.
  valueChange = (event) => {
    const value = event.target.value;

    let error = false;
    if (value === null) {
      error = true;
    }
console.log([event.target.id])
    this.setState({
      [event.target.id]: event.target.value,
      [event.target.id + 'ValidationFailed']: error,
      [event.target.id + 'Edited']: true
    });
  }
**/

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
          artikelSearchError: null           // no error message
        });
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





  /** Rendert die Komponente */

  render() {
    const { classes,show,listeneintrag, artikel } = this.props;
    const { listeneintragArtikelName, listeneintragArtikelNameValidationFailed, listeneintragArtikelNameEdited,
            listeneintragArtikelMenge, listeneintragArtikelMengeEdited, listeneintragArtikelEinheit,
            listeneintragArtikelEinheitEdited, listeneintragEinzelhaendlerName, listeneintragEinzelhaendlerNameEdited,
            listeneintragBenutzerName, addingInProgress, addingError, updatingInProgress, updatingError,
            artikelCombobox, einheitCombobox, einzelhaendlerCombobox, benutzerCombobox, ausgewaehlterArtikelBO, alleArtikel , artikelNotFound, artikelObjekt } = this.state;
console.log(artikelObjekt)
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
                    onBlur={this.sucheArtikel}
                    error={artikelNotFound}
                    helperText={artikelNotFound ? 'Es wurden keine Artikel mit dem folgenden Namen gefunden' : ' '}
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
                          : null

                      }
                    </div>






          <FormControl className={classes.formControl}>



          </FormControl>
          <FormControl className={classes.formControl}>



          </FormControl>
            </form>




            <LoadingProgress show={addingInProgress || updatingInProgress} />
            {
              // Zeigt Error Nachricht in Abhängigkeit des Artikel prop.
              artikel ?
                <ContextErrorMessage error={updatingError} contextErrorMsg={`Der Artikel ${artikel.getID()} konnte nicht geupdatet werden.`} onReload={this.updateArtikel} />
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
              artikel ?
                <Button disabled={listeneintragArtikelNameValidationFailed} variant='contained' onClick={this.updateArtikel} color='primary'>
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

/*
Alte lösungen

<TextField autoFocus type='text' required fullWidth margin='normal' id='artikelName' label='Artikel Name' value={listeneintragArtikelName}
                onChange={this.listeneintragArtikelNameChange} error={listeneintragArtikelNameValidationFailed}
                helperText={artikelNameValidationFailed ? 'Der Name muss mindestens ein Zeichen enthalten' : ' '} />

 <TextField select autoFocus fullWidth type='text'
                    value={ausgewaehlterArtikelBO}
                    onChange={this.ausgewaehlterArtikelBOChange}>
                    {
                      alleArtikel.map((artikel) => (
                        <MenuItem key={artikel.getID()} value={artikel}>
                          {artikel.getName()}

                        </MenuItem>
                      ))
                    }
              </TextField>


              <Autocomplete
                    id="combo-box-demo"
                    options={artikelCombobox}
                    getOptionLabel={(option) => option.getName()}
                    style={{ width: 400 }}
                   renderInput={(params) =>
                       <TextField {...params} value={listeneintragArtikelName} onChange={this.listeneintragArtikelNameChange}
                                  label="Artikel" variant="outlined" />} />
 */




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