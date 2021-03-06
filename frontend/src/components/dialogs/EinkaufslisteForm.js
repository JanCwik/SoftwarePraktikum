import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Button, IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import  API from "../../api/API";
import  EinkaufslisteBO  from '../../api/EinkaufslisteBO';
import ContextErrorMessage from './ContextErrorMessage';
import LoadingProgress from './LoadingProgress';

/**
 * Zeigt einen modalen Formulardialog für ein EinkaufslisteBO in prop einkaufsliste. Wenn die Einkaufsliste
 * angelegt ist, ist der Dialog als ein Editierdialog konfiguriert. Dabei ist das Formular mit dem gegebenen
 * EinkaufslisteBO Objekt befüllt. Wenn die Einkaufsliste null ist, wird der Dialog als eine neuer Einkaufslisten
 * Dialog konfiguriert und die Textfelder sind leer. In Abhängigkeit des editier/neu Zustands werden die Backend
 * Aufrufe gemacht, um eine Einkaufsliste upzudaten oder anzulegen. Danach wird die Funktion des onClose prop
 * mit dem angelegt/upgedated EinkaufslisteBO Objekt als Parameter aufgerufen. Wenn der Dialog beendet ist,
 * wird onClose mit null aufgerufen.
 */
class EinkaufslisteForm extends Component {

  constructor(props) {
    super(props);
    let en = ''
    if (props.einkaufsliste) {
      en = props.einkaufsliste.getName();
    }

    // Init state
    this.state = {
      einkaufslisteName: en,
      einkaufslisteNameValidationFailed: false,
      einkaufslisteNameEdited: false,
      addingInProgress: false,
      updatingInProgress: false,
      addingError: null,
      updatingError: null
    };
    // Speichere dieses state zum abbrechen
    this.baseState = this.state;
  }

  /** Legt Einkaufsliste an */
  addEinkaufsliste = () => {
    let newEinkaufsliste = new EinkaufslisteBO(this.state.einkaufslisteName);
    newEinkaufsliste.setAnwenderverbundID(this.props.anwenderverbund.getID())      //legt neues Einkaufslisten-Objekt mit name aus dem state an
    API.getAPI().addEinkaufslisteAPI(newEinkaufsliste, this.props.userMail).then(einkaufsliste => {
      // Backend Aufruf erfolgreich
      // reinit den Dialog state für eine neue leere Einkaufsliste
      this.setState(this.baseState);
      this.props.onClose(einkaufsliste); // Aufruf mit Hilfe des Einkaufsliste Objekts aus dem Backend
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

  /** Updated die Einkaufsliste */
  updateEinkaufsliste = () => {
    // Klont die originalen Einkaufliste, wenn der Backend Aufruf fehlschlägt
    let updatedEinkaufsliste = Object.assign(new EinkaufslisteBO(), this.props.einkaufsliste);
    // Setzt die neuen Attribute aus dem Dialog
    updatedEinkaufsliste.setName(this.state.einkaufslisteName);
    API.getAPI().updateEinkaufslisteAPI(updatedEinkaufsliste).then(einkaufsliste => {
      this.setState({
        updatingInProgress: false,              // Ladeanzeige deaktivieren
        updatingError: null                     // Keine Error Nachricht
      });
      // Behalte das neue state als base state
      this.baseState.einkaufslisteName = this.state.einkaufslisteName;
      this.props.onClose(updatedEinkaufsliste);      // Aufruf mit der neuen Einkaufsliste
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
    const { classes, einkaufsliste, show } = this.props;
    const { einkaufslisteName, einkaufslisteNameValidationFailed, einkaufslisteNameEdited, addingInProgress,
      addingError, updatingInProgress, updatingError } = this.state;

    let title = '';
    let header = '';

    if (einkaufsliste) {
      // Erstellt eine neue Einkaufsliste, wenn nicht bereits eine vorhanden ist.
      title = 'Update der Einkaufsliste';
      header = `Einkaufsliste ID: ${einkaufsliste.getID()}`;
    } else {
      title = 'Erstelle eine neue Einkaufsliste';
      header = 'Gebe Einkaufsliste ein';
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
              <TextField autoFocus type='text' required fullWidth margin='normal' id='einkaufslisteName' label='Einkaufslisten Name' value={einkaufslisteName}
                onChange={this.textFieldValueChange} error={einkaufslisteNameValidationFailed}
                helperText={einkaufslisteNameValidationFailed ? 'Der Name muss mindestens ein Zeichen enthalten' : ' '} />
            </form>
            <LoadingProgress show={addingInProgress || updatingInProgress} />
            {
              // Zeigt Error Nachricht in Abhängigkeit des Einkaufsliste prop.
              einkaufsliste ?
                <ContextErrorMessage error={updatingError} contextErrorMsg={`The Einkaufliste ${einkaufsliste.getID()} konnte nicht geupdatet werden.`} onReload={this.updateEinkaufsliste} />
                :
                <ContextErrorMessage error={addingError} contextErrorMsg={`Der Einkaufsliste konnte nicht hinzugefügt werden..`} onReload={this.addEinkaufsliste} />
            }
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color='secondary'>
              Abbrechen
            </Button>
            {
              // Wenn Einkaufsliste vorhanden ist, zeige eine Update Taste, sonst eine Anlegen Taste.
              einkaufsliste ?
                <Button disabled={einkaufslisteNameValidationFailed} variant='contained' onClick={this.updateEinkaufsliste} color='primary'>
                  Update
              </Button>
                : <Button disabled={einkaufslisteNameValidationFailed || !einkaufslisteNameEdited} variant='contained'
                          onClick={this.addEinkaufsliste} color='primary'>
                  Hinzufügen
             </Button>
            }
          </DialogActions>
        </Dialog>
        : null
    );
  }
}

/** Komponentenspezifische Styles */
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
EinkaufslisteForm.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,
  /** Das EinkaufslisteBO wird editiert. */
  einkaufsliste: PropTypes.object,
  /** Wenn true, wird das Formular gerendert. */
  show: PropTypes.bool,
  /**
   * Handler Funktion, die aufgerufen wird wenn der Dialog geschlossen ist.
   * Sendet das editierte oder angelegte EinkaufslisteBO als Parameter oder null,
   * wenn abbrechen gedrückt wurde.
   */
  onClose: PropTypes.func.isRequired,
}

export default withStyles(styles)(EinkaufslisteForm);
