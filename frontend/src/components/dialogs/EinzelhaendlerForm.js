import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Button, IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import  API from "../../api/API";
import  EinzelhaendlerBO  from '../../api/EinzelhaendlerBO';
import ContextErrorMessage from './ContextErrorMessage';
import LoadingProgress from './LoadingProgress';

/**
 * Zeigt einen modalen Formulardialog für einen EinzelhaendlerBO in prop einzelhaendler. Wenn der Einzelhändler
 * angelegt ist, ist der Dialog als ein Editierdialog konfiguriert. Dabei ist das Formular mit dem gegebenen
 * EinzelhaendlerBO Objekt befüllt. Wenn der Einzelhändler null ist, wird der Dialog als ein neuer Einzelhändler
 * Dialog konfiguriert und die Textfelder sind leer. In Abhängigkeit des editier/neu Zustands werden die Backend
 * Aufrufe gemacht, um einen Einzelhaendler upzudaten oder anzulegen. Danach wird die Funktion des onClose prop
 * mit dem angelegt/upgedated EinzelhaendlerBO Objekt als Parameter aufgerufen. Wenn der Dialog beendet ist,
 * wird onClose mit null aufgerufen.
 */

class EinzelhaendlerForm extends Component {

  constructor(props) {
    super(props);

    let en = ''
    if (props.einzelhaendler) {
      en = props.einzelhaendler.getName();
    }

    // Init state
    this.state = {
      einzelhaendlerName: en,
      einzelhaendlerNameValidationFailed: false,
      einzelhaendlerNameEdited: false,
      addingInProgress: false,
      updatingInProgress: false,
      addingError: null,
      updatingError: null
    };
    // Speichere dieses state zum abbrechen
    this.baseState = this.state;
  }

  /** Legt Einzelhaendler an */
  addEinzelhaendler =async () => {
    let newEinzelhaendler = new EinzelhaendlerBO(this.state.einzelhaendlerName);              //legt neues Einzelhändlerobjekt mit name aus dem state an

    let user= await API.getAPI().getBenutzerByEmailAPI(this.props.userMail)              // Das BO des Benutzers wird anhand seiner Email abgerufen und in user gespeichert

    newEinzelhaendler.setBenutzerID(user[0].getID())                                     //Dem Einzelhändler wird die BenutzerId des Benutzers mitgegeben

    API.getAPI().addEinzelhaendlerAPI(newEinzelhaendler).then(einzelhaendler => {
      // Backend Aufruf erfolgreich
      // reinit den Dialog state für einen neuen leeren Einzelhändler
      this.setState(this.baseState);
      this.props.onClose(einzelhaendler); // Aufruf mit Hilfe des Einzelhändler Objekts aus dem Backend
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

  /** Updated den Einzelhändler */
  updateEinzelhaendler = () => {
    // Klont den originalen Einzelhändler, wenn der Backend Aufruf fehlschlägt
    let updatedEinzelhaendler = Object.assign(new EinzelhaendlerBO(), this.props.einzelhaendler);
    // Setzt die neuen Attribute aus dem Dialog
    updatedEinzelhaendler.setName(this.state.einzelhaendlerName);
    API.getAPI().updateEinzelhaendlerAPI(updatedEinzelhaendler).then(einzelhaendler => {
      this.setState({
        updatingInProgress: false,              // Ladeanzeige deaktivieren
        updatingError: null                     // Keine Error Nachricht
      });
      // Behalte das neue state als base state
      this.baseState.einzelhaendlerName = this.state.einzelhaendlerName;
      this.props.onClose(updatedEinzelhaendler);      // Aufruf mit dem neuen Einzelhändler
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
  }

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
    const { classes, einzelhaendler, show } = this.props;
    const { einzelhaendlerName, einzelhaendlerNameValidationFailed, einzelhaendlerNameEdited, addingInProgress,
      addingError, updatingInProgress, updatingError } = this.state;

    let title = '';
    let header = '';

    if (einzelhaendler) {
      // Erstellt einen neuen Einzelhändler, wenn nicht bereits einer vorhanden ist.
      title = 'Update des Einzelhändlers';
      header = `Einzelhändler ID: ${einzelhaendler.getID()}`;
    } else {
      title = 'Erstelle einen neuen Einzelhändler';
      header = 'Gebe Einzelhändlerdaten ein';
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
              <TextField autoFocus type='text' required fullWidth margin='normal' id='einzelhaendlerName' label='Einzelhändler Name' value={einzelhaendlerName}
                onChange={this.textFieldValueChange} error={einzelhaendlerNameValidationFailed}
                helperText={einzelhaendlerNameValidationFailed ? 'Der Name muss mindestens ein Zeichen enthalten' : ' '} />
            </form>
            <LoadingProgress show={addingInProgress || updatingInProgress} />
            {
              // Zeigt Error Nachricht in Abhängigkeit des Einzelhaendler prop.
              einzelhaendler ?
                <ContextErrorMessage error={updatingError} contextErrorMsg={`The Einzelhändler ${einzelhaendler.getID()} konnte nicht geupdatet werden.`} onReload={this.updateEinzelhaendler} />
                :
                <ContextErrorMessage error={addingError} contextErrorMsg={`Der Einzelhändler konnte nicht hinzugefügt werden..`} onReload={this.addEinzelhaendler} />
            }
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color='secondary'>
              Abbrechen
            </Button>
            {
              // Wenn ein Einzelhändler vorhanden ist, zeige eine Update Taste, sonst eine Anlegen Taste.
              einzelhaendler ?
                <Button disabled={einzelhaendlerNameValidationFailed} variant='contained' onClick={this.updateEinzelhaendler} color='primary'>
                  Update
              </Button>
                : <Button disabled={einzelhaendlerNameValidationFailed || !einzelhaendlerNameEdited} variant='contained'
                          onClick={this.addEinzelhaendler} color='primary'>
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
    right: theme.spacing(-1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

/** PropTypes */
EinzelhaendlerForm.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,
  /** Das EinzelhaendlerBO wird editiert. */
  einzelhaendler: PropTypes.object,
  /** Wenn true, wird das Formular gerendert. */
  show: PropTypes.bool.isRequired,
  /**
   * Handler Funktion, die aufgerufen wird wenn der Dialog geschlossen ist.
   * Sendet das bearbeitete oder angelegte EinzelhaendlerBO als Parameter, oder null,
   * wenn abbrechen gedrückt wurde.
   */
  onClose: PropTypes.func.isRequired,
}

export default withStyles(styles)(EinzelhaendlerForm);
