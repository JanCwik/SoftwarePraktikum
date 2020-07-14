import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Button, IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import  API from "../../api/API";
import  MitgliedschaftBO  from '../../api/EinzelhaendlerBO';
import ContextErrorMessage from './ContextErrorMessage';
import LoadingProgress from './LoadingProgress';


/**
 * Zeigt einen modalen Formulardialog für einen EinzelhaendlerBO in prop einzelhaendler. Wenn der Einzelhaendler
 * angelegt ist, ist der Dialog als ein Editierdialog konfiguriert. Dabei ist das Formular mit dem gegebenen
 * EinzelhaendlerBO Objekt befüllt. Wenn der Einzelhaendler null ist, wird der Dialog als ein neuer Einzelhaendler
 * Dialog konfiguriert und die Textfelder sind leer. In Abhängigkeit des editier/neu Zustands werden die Backend
 * Aufrufe gemacht, um einen Einzelhaendler upzudaten oder anzulegen. Danach wird die Funktion des onClose prop
 * mit dem angelegt/upgedated EinzelhaendlerBO Objekt als Parameter aufgerufen. Wenn der Dialog beendet ist,
 * wird onClose mit null aufgerufen.
 */
class BenutzerListeForm extends Component {

  constructor(props) {
    super(props);


    // Init state
    this.state = {
      benutzerEmail: '',
      benutzerEmailValidationFailed: false,

      addingInProgress: false,
      updatingInProgress: false,
      addingError: null,

    };
    // Speichere dieses state zum abbrechen
    this.baseState = this.state;
  }
/*
  /** Legt Einzelhaendler an
  addMitgliedschaft = () => {
    let newMitgliedschaft = new MitgliedschaftBO()(this.state.benutzerEmail); //legt neues Einzelhändler-objekt mit name aus dem state an
    API.getAPI().addMitgliedschaftAPI(newMitgliedschaft).then(mitgliedschaft => {
      // Backend Aufruf erfolgreich
      // reinit den Dialog state für einen neuen leeren Einzelhaendler
      this.setState(this.baseState);
      this.props.onClose(mitgliedschaft); // Aufruf mit Hilfe des Einzelhaendler Objekts aus dem Backend
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
  }
*/

  /** Behandelt Wertänderungen aus den Textfeldern vom Formular und validiert diese. */
  textFieldValueChange = (event) => {
    const value = event.target.value;

    let error = false;
    if (value.trim().length === 0) {
      error = true;
    }

    this.setState({
      [event.target.id]: event.target.value,
      [event.target.id + 'ValidationFailed']: error,
      [event.target.id + 'Edited']: true
    });
  }

  /** Behandelt das schließen/abbrechen Tasten klick Ereignis. */
  handleClose = () => {
    // Setzt state zurück
    this.setState(this.baseState);
    this.props.onClose(null);
  }

  /** Rendert die Komponente */
  render() {
    const {classes, show} = this.props;
    const {
      benutzerEmail, benutzerEmailValidationFailed, addingInProgress,
      addingError
    } = this.state;

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
                             label='Benutzer Email' value={benutzerEmail}
                             onChange={this.textFieldValueChange} error={benutzerEmailValidationFailed}
                             helperText={benutzerEmailValidationFailed ? 'Die EMail muss mindestens ein Zeichen enthalten' : ' '}/>
                </form>
                <LoadingProgress show={addingInProgress}/>

              </DialogContent>
              <DialogActions>
                <Button onClick={this.handleClose} color='secondary'>
                  Abbrechen
                </Button>
                <Button disabled={benutzerEmailValidationFailed} variant='contained'
                         color='primary'>
                  Hinzufügen
                </Button>

              </DialogActions>
            </Dialog> :
            null

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
    right: theme.spacing(-1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

/** PropTypes */
BenutzerListeForm.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,
  /** Das EinzelhaendlerBO wird editiert. */
  benutzer: PropTypes.object,
  /** Wenn true, wird das Formular gerendert. */
  show: PropTypes.bool.isRequired,
  /**
   * Handler Funktion, die aufgerufen wird wenn der Dialog geschlossen ist.
   * Sendet das editierte oder angelegte EinzelhaendlerBO als Parameter oder null,
   * wenn abbrechen gedrückt wurde.
   */
  onClose: PropTypes.func.isRequired,
}

export default withStyles(styles)(BenutzerListeForm);
