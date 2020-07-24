import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Button, IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField, InputAdornment } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import  API from "../../api/API";
import ContextErrorMessage from './ContextErrorMessage';
import LoadingProgress from './LoadingProgress';
import SearchIcon from "@material-ui/icons/Search";

/**
 * Zeigt einen modalen Formulardialog für ein BenutzerBO in prop benutzer. Wenn der Einzelhaendler null ist,
 * wird der Dialog als ein neuer Einzelhaendler Dialog konfiguriert und die Textfelder sind leer.
 * Die Backend Aufrufe werden gemacht, um einen Benutzer hinzuzufügen. Danach wird die Funktion des onClose prop
 * mit dem hinzugefügten BenutzerBO Objekt als Parameter aufgerufen. Wenn der Dialog beendet ist,
 * wird onClose mit null aufgerufen.
 */

class BenutzerListeForm extends Component {

  constructor(props) {
    super(props);

    // Init state
    this.state = {
      benutzerEmail: '',
      benutzerObjekt: null,
      benutzerSearchError: null,
      benutzerNotFound: false,
      loadingInProgress: false,
      addingError: null,
    };
    // Speichere dieses state zum abbrechen
    this.baseState = this.state;
  }

  /** Legt die Mitgliedschaft zwischen Anwenderverbund und Benutzer fest. */
  addMitgliedschaft = () => {
    API.getAPI().getBenutzerByEmailAPI(this.state.benutzerEmail).then( BenutzerBO =>{
    API.getAPI().addMitgliedschaftAPI(this.props.anwenderverbund.getID(),BenutzerBO[0])
      this.setState(this.baseState);
      this.props.onClose(BenutzerBO[0]); // Aufruf mit Hilfe des Benutzer Objekts aus dem Backend
    }).catch(e =>

        this.setState({
          loadingInProgress: false,    // Ladeanzeige deaktivieren
          addingError: e              // Zeige Error Nachricht
        })
    )
    this.setState({
      loadingInProgress: true,       // Ladeanzeige anzeigen
      addingError: null             // Fehlermeldung deaktivieren
    }
    )
  }

  /** Behandelt Wertänderungen aus den Textfeldern vom Formular und validiert diese. */
   textFieldValueChange = (event) => {
     let benutzerEmail = event.target.value;
     this.setState({
      benutzerEmail: benutzerEmail,
    });
  }

  /** Behandelt das schließen/abbrechen Tasten klick Ereignis. */
  handleClose = () => {
    // Setzt state zurück
    this.setState(this.baseState);
    this.props.onClose(null);
  }

/** Sucht den Benutzer anhand der Benutzer Email. */
  sucheBenutzer = async () => {
    const { benutzerEmail } = this.state;
    if (benutzerEmail.length > 0) {
      try {
        // Setzt laden auf true
        this.setState({
          benutzerObjekt: null,                 // Der initialisierte Benutzer
          loadingInProgress: true,              // Ladeanzeige anzeigen
          benutzerSearchError: null             // Fehlermeldung deaktivieren
        });

        // Lädt den Benutzer
        const benutzer = await API.getAPI().getBenutzerByEmailAPI(benutzerEmail);

        // Setzt das finale state
        this.setState({
          benutzerObjekt: benutzer[0],
          loadingInProgress: false,           // Ladeanzeige deaktivieren
          benutzerSearchError: null,
          benutzerNotFound: false             // Keine Error Nachricht
        });
        if(!benutzer[0]){
          this.setState({
          benutzerNotFound: true              // Error true
        });
        }

      } catch (e) {
        this.setState({
          benutzerObjekt: null,
          loadingInProgress: false,           // Ladeanzeige deaktivieren
          benutzerSearchError: e              // Zeige Error Nachricht
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
    const {classes, show} = this.props;
    const { loadingInProgress, addingError,benutzerObjekt, benutzerNotFound,benutzerSearchError} = this.state;
    let title = '';
    let header = '';

    title = 'Füge einen neunen Benutzer hinzu';
    header = 'Gebe Benutzerdaten ein';

    return (
        show ?
            <Dialog open={show} onClose={this.handleClose} maxWidth='xs'>
              <DialogTitle id='form-dialog-title'>{title}
                <IconButton className={classes.closeButton} onClick={this.handleClose}>
                  <CloseIcon/>
                </IconButton>
              </DialogTitle>
              <DialogContent>
                <DialogContentText>
                  {header}
                </DialogContentText>
                <form className={classes.root} noValidate autoComplete='off'>
                  <TextField autoFocus type='text' required fullWidth margin='normal' id='benutzerEmail'
                             label='Benutzer E-mail'
                             onChange={this.textFieldValueChange} error={benutzerSearchError}
                             helperText={benutzerNotFound ? 'Es wurde kein Benutzer mit dieser E-Mail Adresse gefunden' : ' '}
                             InputProps={{
                              endAdornment: <InputAdornment position='end'>
                                <IconButton onClick={this.sucheBenutzer}>
                                  <SearchIcon />
                                </IconButton>
                              </InputAdornment>,
                            }} />
                </form>
                <LoadingProgress show={loadingInProgress}/>
                <ContextErrorMessage error={addingError} contextErrorMsg={`Der Benutzer konnte nicht hinzugefügt werden..`} onReload={this.addMitgliedschaft} />
              </DialogContent>
              <DialogActions>
                <Button onClick={this.handleClose} color='secondary'>
                  Abbrechen
                </Button>
                <Button disabled={!benutzerObjekt} variant='contained' onClick={this.addMitgliedschaft} color='primary'>
                  Hinzufügen
                </Button>
              </DialogActions>
            </Dialog> :
            null
    );
  }
}

/** Komponentenspezifisches Styling */
const styles = theme => ({
  root: {
    width: '100%',
  },

  closeButton: {
    position: 'absolute',
    right: theme.spacing(-1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

/** PropTypes */
BenutzerListeForm.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,
  /** Das BenutzerBO wird editiert. */
  benutzer: PropTypes.object,
  /** Wenn true, wird das Formular gerendert. */
  show: PropTypes.bool,
  /**
   * Handler Funktion, die aufgerufen wird wenn der Dialog geschlossen ist.
   * Sendet das angelegte BenutzerBO als Parameter oder null,
   * wenn abbrechen gedrückt wurde.
   */
  onClose: PropTypes.func.isRequired,
}

export default withStyles(styles)(BenutzerListeForm);
