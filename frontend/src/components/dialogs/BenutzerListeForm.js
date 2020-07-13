import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Button, IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import API from '../../api/API';
import ContextErrorMessage from './ContextErrorMessage';
import LoadingProgress from './LoadingProgress';
import BenutzerBO from "../../api/BenutzerBO";


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

    let en = ''
    if (props.benutzer) {
      en = props.benutzer.getName();
    }

    // Init state
    this.state = {
      benutzerName: en,
      benutzerNameValidationFailed: false,
      benutzerNameEdited: false,
      addingInProgress: false,
      updatingInProgress: false,
      addingError: null,
      updatingError: null
    };
    // Speichere dieses state zum abbrechen
    this.baseState = this.state;
  }

  /** Legt Anwenderverbund an */
  addBenutzer = () => {
    let newBenutzer = new BenutzerBO(this.state.benutzerName);
    API.getAPI().addBenutzerAPI(newBenutzer).then(benutzer => {
      // Backend Aufruf erfolgreich
      // reinit den Dialog state für einen neuen leeren Anwenderverbunds
      this.setState(this.baseState);
      this.props.onClose(benutzer); // Aufruf mit Hilfe des Anwenderverbund Objekts aus dem Backend
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


  /** Updates the customer */
  updateBenutzer = () => {
    // Klont den originalen Einzelhaendler, wenn der Backend Aufruf fehlschlägt
    let updatedBenutzer = Object.assign(new BenutzerBO(), this.props.benutzer);
    // Setzt die neuen Attribute aus dem Dialog
    updatedBenutzer.setName(this.state.benutzerName);
    API.getAPI().updateBenutzerAPI(updatedBenutzer).then(benutzer => {
      this.setState({
        updatingInProgress: false,              // Ladeanzeige deaktivieren
        updatingError: null                     // Keine Error Nachricht
      });
      // Behalte das neue state als Grund state
      this.baseState.benutzerName = this.state.benutzerName;
      this.props.onClose(updatedBenutzer);      // Aufruf mit dem neuen Anwenderverbund
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
    const { classes, benutzer, show } = this.props;
    const { benutzerName, benutzerNameValidationFailed, benutzerNameEdited, addingInProgress,
      addingError, updatingInProgress, updatingError } = this.state;

    let title = '';
    let header = '';

    if (benutzer) {
      // customer defindet, so ist an edit dialogmmmmmmmmmmmmmmmmmmmmmmmmmmmm
      title = 'Update des Benutzers';
      header = `Benutzer ID: ${benutzer.getID()}`;
    } else {
      title = 'Füge einen neuen Benutzer hinzu';
      header = 'Gebe den Namen des Benutzers ein';
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
              <TextField autoFocus type='text' required fullWidth margin='normal' id='benutzerName' label='Benutzer Name:' value={benutzerName}
                onChange={this.textFieldValueChange} error={benutzerNameValidationFailed}
                helperText={benutzerNameValidationFailed ? 'Der Name muss mindestens ein Zeichen enthalten' : ' '} />
            </form>
            <LoadingProgress show={addingInProgress || updatingInProgress} />
            {
              // Zeigt Error Nachricht in Abhängigkeit des Anwenderverbund prop.
              benutzer ?
                <ContextErrorMessage error={updatingError} contextErrorMsg={`Der Benutzer ${benutzer.getID()} konnte nicht geupdatet werden.`} onReload={this.updateBenutzer} />
                :
                <ContextErrorMessage error={addingError} contextErrorMsg={`Der Benutzer konnte nicht hinzugefügt werden..`} onReload={this.addBenutzer} />
            }
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color='secondary'>
              Abbrechen
            </Button>
            {
              // Wenn Einzelhaendler vorhanden ist, zeige eine Update Taste, sonst eine Anlegen Taste.
              benutzer ?
                <Button disabled={benutzerNameValidationFailed} variant='contained' onClick={this.updateBenutzer} color='primary'>
                  Update
              </Button>
                : <Button disabled={benutzerNameValidationFailed || !benutzerNameEdited} variant='contained' onClick={this.addBenutzer} color='primary'>
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
});

/** PropTypes */
BenutzerListeForm.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,
  /** Das AnwenderverbundFormBO wird editiert. */
  anwenderverbund: PropTypes.object,
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
