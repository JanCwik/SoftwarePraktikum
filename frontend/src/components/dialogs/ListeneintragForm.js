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
 * Zeigt einen Formulardialog für ein ListeneintragBO. Wenn der Component über einen Listeneintrag aufgerufen wird und dadurch
 * der entwprchende Listeneintrag als prop übergeben wird, ist der Dialog als ein Editierdialog konfiguriert. Dabei ist das Formular mit dem gegebenen
 * ListeneintragBO Objekt ausgefüllt. Wenn der Listeneintrag-Prop null ist, sind die Textfelder leer.
 * In Abhängigkeit des editier/neu-anlegen Zustands werden die Backend-Aufrufe gemacht, um einen Listeneintrag upzudaten oder anzulegen.
 * Mit den Eingaben des Benutzers wird jeweils ein "GetByName" request gemacht, das dadurch erhaltene Objekt wird im State zwischengespeichert
 * und zum anlegen/updaten der Listeneinträge verwendet. Danach wird die Funktion des onClose prop  mit dem angelegt/upgedated Listeneintrag Objekt
 * als Parameter aufgerufen. Wenn der Benutzer den Vorgang abbricht, wird onClose mit null aufgerufen.
 */

class ListeneintragForm extends Component {

  constructor(props) {
    super(props);

    let lan = '', lam = '', lae = '', len = '', lbn = '', le = '';
    if (props.listeneintrag) {                                            // wenn ein Listeneintrag editiert werden soll wird dieser als prop übergeben
      lan = props.listeneintrag.getArtikel_name();                          // und der State wird mit den entsprechenden Daten gefüllt
      lam = props.listeneintrag.getMenge();
      len = props.listeneintrag.getEinzelhaendler_name();
      lbn = props.listeneintrag.getBenutzer_name();
      le  = props.listeneintrag.getErledigt();
    }

    // Init state
    this.state = {
      benutzerObjekt: null,
      benutzerNotFound: false,
      einzelhaendlerObjekt: null,
      einzelhaendlerNotFound: false,
      artikelObjekt: null,
      artikelNotFound: false,
      listeneintragArtikelName: lan,
      listeneintragArtikelMenge: lam,
      listeneintragArtikelMengeError: false,
      listeneintragEinzelhaendlerName: len,
      listeneintragBenutzerName: lbn,
      listeneintragErledigt: le,
      addingInProgress: false,
      updatingInProgress: false,
      addingError: null,
      updatingError: null,
    };


    // der default state wird in baseState gespeichert damit der daufault State
    // wieder hergestellt werden kann wenn der Benutzer Saten eingibt und dann abbrechen drückt
    this.baseState = this.state;
  }

  /** Legt ListeneintragBO an */
  addListeneintrag = async() => {
    let newListeneintrag = new ListeneintragBO();
    if(this.state.listeneintragArtikelMenge){
      newListeneintrag.setMenge(this.state.listeneintragArtikelMenge)}                          //übernimmt die benutzereingabe für "Menge"
    newListeneintrag.setEinkaufsliste_id(this.props.einkaufsliste.getID());                      // die restlichen Daten werden über die BO's geholt, welche von den
    if(this.state.einzelhaendlerObjekt){
      newListeneintrag.setEinzelhaendler_id(this.state.einzelhaendlerObjekt.getID())                   // jeweiligen Suchfuniktionen zurückgegeben werden
      newListeneintrag.setEinzelhaendler_name(this.state.einzelhaendlerObjekt.getName())}
    if(this.state.artikelObjekt){
      newListeneintrag.setArtikel_name(this.state.artikelObjekt.getName());
      newListeneintrag.setArtikel_id(this.state.artikelObjekt.getID())
      newListeneintrag.setArtikel_einheit(this.state.artikelObjekt.getEinheit())}
    if(this.state.benutzerObjekt){
      newListeneintrag.setBenutzer_id(this.state.benutzerObjekt.getID())
      newListeneintrag.setBenutzer_name(this.state.benutzerObjekt.getName())}

    await API.getAPI().addListeneintragAPI(newListeneintrag).then(listeneintrag => {              // aufruf der API Funktion

      this.setState(this.baseState);       // State wieder zurücksetzten
      this.props.onClose(listeneintrag);   // Aufruf der onClose fúnktion von Einkaufsliste.js -> dadurch wird der neue Listeneintrag direkt angezeigt
    }).catch(e =>
      this.setState({
        updatingInProgress: false,    // Ladeanzeige deaktivieren
        updatingError: e              // Error Nachricht zwischenspeichern
      })
    );

    this.setState({
      updatingInProgress: true,       // Ladeanzeige anzeigen
      updatingError: null             // keine Fehlermeldung anzeigen
    });

    this.props.reload()            // Seite wird neugeladen damit die neue letzte Änderung kenntlich gemacht werden kann
  }

  /** Updated den Listeneintrag */
  updateListeneintrag = async() => {

    let updatedListeneintrag = Object.assign(new ListeneintragBO(), this.props.listeneintrag);   // Klont den aktuellen Listeneintrag
    if(this.state.listeneintragArtikelMenge){
      updatedListeneintrag.setMenge(this.state.listeneintragArtikelMenge)}                     //übernimmt die benutzereingabe für "Menge"
    updatedListeneintrag.setEinkaufsliste_id(this.props.einkaufsliste.getID());                // die restlichen Daten werden über die BO's geholt, welche von den
    if(this.state.artikelObjekt){
      updatedListeneintrag.setArtikel_name(this.state.artikelObjekt.getName());                   // jeweiligen Suchfuniktionen zurückgegeben werden
      updatedListeneintrag.setArtikel_id(this.state.artikelObjekt.getID())
      updatedListeneintrag.setArtikel_einheit(this.state.artikelObjekt.getEinheit())}
    if(this.state.einzelhaendlerObjekt){
      updatedListeneintrag.setEinzelhaendler_id(this.state.einzelhaendlerObjekt.getID())
      updatedListeneintrag.setEinzelhaendler_name(this.state.einzelhaendlerObjekt.getName())}
    if(this.state.benutzerObjekt){
      updatedListeneintrag.setBenutzer_id(this.state.benutzerObjekt.getID())
      updatedListeneintrag.setBenutzer_name(this.state.benutzerObjekt.getName())}

    await API.getAPI().updateListeneintragAPI(updatedListeneintrag).then(listeneintrag => {         // aufruf der API Funktion
      this.setState({
        updatingInProgress: false,              // Ladeanzeige deaktivieren
        updatingError: null                     // keine Fehlermeldung anzeigen
      });

      this.baseState.listeneintragArtikelName = this.state.listeneintragArtikelName;                      // der aktuelle state wird als Base state gesetzt
      this.baseState.listeneintragArtikelMenge = this.state.listeneintragArtikelMenge;
      this.baseState.listeneintragEinzelhaendlerName = this.state.listeneintragEinzelhaendlerName;
      this.baseState.listeneintragBenutzerName = this.state.listeneintragBenutzerName;
      this.baseState.listeneintragErledigt = this.state.listeneintragErledigt;
      this.props.onClose(updatedListeneintrag);               // Aufruf der onClose fúnktion von Listeneintrag.js -> dadurch wird der aktualisierte Listeneintrag direkt angezeigt
    }).catch(e =>
      this.setState({
        updatingInProgress: false,              // Ladeanzeige deaktivieren
        updatingError: e                       // Error Nachricht zwischenspeichern
      })
    );

    // Setzt laden auf true
    this.setState({
      updatingInProgress: true,                 // Ladeanzeige anzeigen
      updatingError: null                       // keine Fehlermeldung anzeigen
    });
    this.props.reload()                      // Seite wird neugeladen damit die neue letzte Änderung kenntlich gemacht werden kann
  }


listeneintragArtikelNameChange = (event) => {
    let artikelName = event.target.value;
    this.setState({
      listeneintragArtikelName: artikelName,
    });
  }

  listeneintragArtikelMengeChange = (event) => {
    let menge = event.target.value;
    this.setState({
      listeneintragArtikelMenge: menge,
    });
    if(isNaN(menge)){                  // wenn der Benutzer keine Zahl eingegeben hat wird ein entsprechender Error angezeigt
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


  listeneintragEinzelhaendlerNameChange = (event) => {
    let einzelhaendlerName = event.target.value;
    this.setState({
      listeneintragEinzelhaendlerName: einzelhaendlerName,
    });
  }

  listeneintragBenutzerNameChange = (event) => {
    let benutzerName = event.target.value;
    this.setState({
      listeneintragBenutzerName: benutzerName,
    });
  }

  // wenn der Benutzer das Fenster schließt oder "abbrechen" drückt
  handleClose = () => {
                                                // Setzt state zurück
    this.setState(this.baseState);
    this.props.onClose(null);
  }



/** Sucht nach einem ArtikelBO anhand des Namen, den der Benutzer eingibt */
sucheArtikel = async () => {
    const {listeneintragArtikelName} = this.state;
    if (listeneintragArtikelName.length > 0) {
      try {
        this.setState({
          artikelObjekt: null,
          loadingInProgress: true,              // Ladebalken anzeigen
        });

        const artikel = await API.getAPI().getArtikelByNameAPI(listeneintragArtikelName);   // Aufruf der API Funktion


        this.setState({
          artikelObjekt: artikel[0],         // Artikel aus dem Array holen und in den State speichern
          loadingInProgress: false,           // Ladeanzeige deaktivieren
          artikelNotFound: false,
        });
        if (!artikel[0]) {
          this.setState({
            artikelNotFound: true           // Wenn kein Artikel gefunden wurde und ein leeres Array zurückgegeben wurde, wird eine Error Nachricht angezeigt
          });
        }
      } catch (e) {
        this.setState({
          artikelObjekt: null,
          loadingInProgress: false,
        });
      }
    } else {
      this.setState({
        artikelNotFound: true
      });
    }
  }


/** Sucht nach einem EinzelhändlerBO anhand des Namen, den der Benutzer eingibt */
  sucheEinzelhaendler = async () => {
    const { listeneintragEinzelhaendlerName } = this.state;
    if (listeneintragEinzelhaendlerName.length > 0) {
      try {
        this.setState({
          einzelhaendlerObjekt: null,
          loadingInProgress: true,              // Ladebalken anzeigen
        });

        const einzelhaendler = await API.getAPI().getEinzelhaendlerByNameAPI(listeneintragEinzelhaendlerName);         // Aufruf der API Funktion

        this.setState({
          einzelhaendlerObjekt: einzelhaendler[0],      // Einzelhändler aus dem Array holen und in den State speichern
          loadingInProgress: false,                         // Ladeanzeige deaktivieren
          einzelhaendlerNotFound: false
        });
        if(!einzelhaendler[0]){
          this.setState({
          einzelhaendlerNotFound: true               // Wenn kein Einzelhändler gefunden wurde und ein leeres Array zurückgegeben wurde, wird eine Error Nachricht angezeigt
        });
        }

      } catch (e) {
        this.setState({
          einzelhaendlerObjekt: null,
          loadingInProgress: false,
        });
      }
    } else {
      this.setState({
        einzelhaendlerNotFound: true
      });
    }
  }

/** Sucht nach einem BenutzerBO anhand des Namen, den der Benutzer eingibt */
  sucheBenutzer = async () => {
    const { listeneintragBenutzerName } = this.state;
    if (listeneintragBenutzerName.length > 0) {
      try {
        this.setState({
          benutzerObjekt: null,
          loadingInProgress: true,               // Ladebalken anzeigen
        });

        // Load customers first
        const benutzer = await API.getAPI().getBenutzerByNameAPI(listeneintragBenutzerName);       // Aufruf der API Funktion

        this.setState({
          benutzerObjekt: benutzer[0],        // Einzelhändler aus dem Array holen und in den State speichern
          loadingInProgress: false,          // Ladeanzeige deaktivieren
          benutzerNotFound: false
        });
        if(!benutzer[0]){
          this.setState({
          benutzerNotFound: true          // Wenn kein Einzelhändler gefunden wurde und ein leeres Array zurückgegeben wurde, wird eine Error Nachricht angezeigt
        });
        }

      } catch (e) {
        this.setState({
          benutzerObjekt: null,
          loadingInProgress: false,
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
    const { classes,show,listeneintrag } = this.props;
    const { listeneintragArtikelName,  listeneintragArtikelMenge, listeneintragEinzelhaendlerName,
      listeneintragBenutzerName, addingInProgress, addingError, updatingInProgress, updatingError, artikelNotFound, artikelObjekt,
      einzelhaendlerNotFound,  benutzerNotFound ,listeneintragArtikelMengeError, einzelhaendlerObjekt, benutzerObjekt} = this.state;

    let title = '';
    let header = '';

    if (listeneintrag) {
      title = 'Update des Listeneintrags';                                      //Header nachricht je nach editier/neu-anlegen Zustand
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
                         value={listeneintragArtikelName}
                         error={artikelNotFound}
                         onBlur={listeneintragArtikelName? this.sucheArtikel:''}             //Wenn dr Benutzer etwas eingegeben hat und das Textfeld verlässt wird automatisch gesucht
                         helperText={artikelNotFound ? 'Es wurde kein Artikel mit diesem Namen gefunden. Erstelle den Artikel im "Artikel" Tab.' : ' '}
                         InputProps={{
                           endAdornment:
                               <InputAdornment position='end'>
                                  <IconButton onClick={this.sucheArtikel}>
                                    <SearchIcon />
                                  </IconButton>
                               </InputAdornment>,
                         }}
                  />
                  <div>
                      {artikelObjekt ?                 //Wenn ein Artikel gefunden wurde wird automatisch die Einheit dazu angezeig
                          <Typography>Einheit: {artikelObjekt.getEinheit()}</Typography>
                              :null
                      }
                  </div>

                  <TextField autoFocus type='text' required fullWidth margin='normal' id='menge' label='Menge'
                             value={listeneintragArtikelMenge}
                             onChange={this.listeneintragArtikelMengeChange}
                             helperText={listeneintragArtikelMengeError ? 'ACHTUNG: Geben Sie eine Zahl ein' : ' '}
                  />

                  <TextField autoFocus fullWidth margin='normal' type='text' required id='EinzelhaendlerName' label='Einzelhändler Name:'
                             onChange={this.listeneintragEinzelhaendlerNameChange}
                             value={listeneintragEinzelhaendlerName}
                             error={einzelhaendlerNotFound}
                             onBlur={listeneintragEinzelhaendlerName? this.sucheEinzelhaendler:""}
                             helperText={einzelhaendlerNotFound ? 'Es wurde kein Einzelhändler mit diesem Namen gefunden. Erstelle den Einzelhändler im "Einzelhändler" Tab.' : ' '}
                             InputProps={{
                               endAdornment:
                                   <InputAdornment position='end'>
                                      <IconButton onClick={this.sucheEinzelhaendler}>
                                        <SearchIcon />
                                      </IconButton>
                                   </InputAdornment>,
                             }}
                  />

                  <TextField autoFocus fullWidth margin='normal' type='text' required id='BenutzerName' label='Benutzer Name:'
                             onChange={this.listeneintragBenutzerNameChange}
                             value={listeneintragBenutzerName}
                             error={benutzerNotFound}
                             onBlur={listeneintragBenutzerName? this.sucheBenutzer:""}
                             helperText={benutzerNotFound ? 'Es wurden keine Benutzer mit diesem Namen gefunden' : ' '}
                             InputProps={{
                               endAdornment:
                                   <InputAdornment position='end'>
                                      <IconButton onClick={this.sucheBenutzer}>
                                        <SearchIcon />
                                      </IconButton>
                                   </InputAdornment>,
                             }}
                  />

            </form>
            <LoadingProgress show={addingInProgress || updatingInProgress} />
              {
              // Zeigt Error Nachricht in Abhängigkeit des Listeneintrag-prop.
                listeneintrag ?
                  <ContextErrorMessage error={updatingError} contextErrorMsg={`Der Listeneintrag ${listeneintrag.getID()} konnte nicht geupdatet werden.`} onReload={this.updateListeneintrag} />
                  :
                  <ContextErrorMessage error={addingError} contextErrorMsg={`Der Listeneintrag konnte nicht hinzugefügt werden..`} onReload={this.addListeneintrag} />
              }
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color='secondary'>
              Abbrechen
            </Button>
              {
                // Wenn ein Listeineintrag-Prop vorhanden ist, zeige eine Update Taste, sonst eine Anlegen Taste.
                listeneintrag ?
                  <Button disabled={!artikelObjekt } variant='contained' onClick={this.updateListeneintrag} color='primary'>
                    Update
                  </Button>
                  :
                    <Button disabled={!artikelObjekt } variant='contained' onClick={this.addListeneintrag} color='primary'>
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

  classes: PropTypes.object.isRequired,
  /** Das ListeneintragBO das editiert wird. */
  listeneintrag: PropTypes.object,
  /** Wenn true, wird das Formular gerendert. */
  show: PropTypes.bool.isRequired,
  /**
   * Funktion, die aufgerufen wird wenn der Dialog geschlossen wird.
   * Sendet das editierte oder angelegte ArtikelBO als Parameter.
   * wenn abbrechen gedrückt wurde, ist der parameter null
   */
  onClose: PropTypes.func.isRequired,

}

export default withStyles(styles)(ListeneintragForm);