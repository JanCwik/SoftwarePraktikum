import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Button, IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import API from '../../api/API';
import AnwenderverbundBO from "../../api/AnwenderverbundBO";
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
class AnwenderverbundForm extends Component {

  constructor(props) {
    super(props);

    let en = ''
    if (props.anwenderverbund) {
      en = props.anwenderverbund.getName();
    }

    // Init state
    this.state = {
      anwenderverbundName: en,
      anwenderverbundNameValidationFailed: false,
      anwenderverbundNameEdited: false,
      addingInProgress: false,
      updatingInProgress: false,
      addingError: null,
      updatingError: null
    };
    // Speichere dieses state zum abbrechen
    this.baseState = this.state;
  }

  /** Legt Einzelhaendler an */
  addAnwenderverbund = () => {
    let newAnwenderverbund = new AnwenderverbundBO(this.state.anwenderverbundName);
    API.getAPI().addAnwenderverbundAPI(newAnwenderverbund).then(anwenderverbund => {
      // Backend Aufruf erfolgreich
      // reinit den Dialog state für einen neuen leeren Anwenderverbunds
      this.setState(this.baseState);
      this.props.onClose(anwenderverbund); // Aufruf mit Hilfe des Anwenderverbund Objekts aus dem Backend
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
  updateAnwenderverbund = () => {
    // Klont den originalen Einzelhaendler, wenn der Backend Aufruf fehlschlägt
    let updatedAnwenderverbund = Object.assign(new AnwenderverbundBO(), this.props.anwenderverbund);
    // Setzt die neuen Attribute aus dem Dialog
    updatedAnwenderverbund.setName(this.state.anwenderverbundName);
    API.getAPI().updateAnwenderverbundAPI(updatedAnwenderverbund).then(anwenderverbund => {
      this.setState({
        updatingInProgress: false,              // Ladeanzeige deaktivieren
        updatingError: null                     // Keine Error Nachricht
      });
      // Behalte das neue state als Grund state
      this.baseState.anwenderverbundName = this.state.anwenderverbundName;
      this.props.onClose(updatedAnwenderverbund);      // Aufruf mit dem neuen Anwenderverbund
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
    const { classes, anwenderverbund, show } = this.props;
    const { anwenderverbundName, anwenderverbundNameValidationFailed, anwenderverbundNameEdited, addingInProgress,
      addingError, updatingInProgress, updatingError } = this.state;

    let title = '';
    let header = '';

    if (anwenderverbund) {
      // customer defindet, so ist an edit dialogmmmmmmmmmmmmmmmmmmmmmmmmmmmm
      title = 'Update des Anwenderverbund';
      header = `Anwenderverbund ID: ${anwenderverbund.getID()}`;
    } else {
      title = 'Erstelle einen neuen Anwenderverbund';
      header = 'Suche einen Namen für den Anwenderverbund aus';
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
              <TextField autoFocus type='text' required fullWidth margin='normal' id='anwenderverbundName' label='Anwenderverbund Name:' value={anwenderverbundName}
                onChange={this.textFieldValueChange} error={anwenderverbundNameValidationFailed}
                helperText={anwenderverbundNameValidationFailed ? 'Der Name muss mindestens ein Zeichen enthalten' : ' '} />
            </form>
            <LoadingProgress show={addingInProgress || updatingInProgress} />
            {
              // Zeigt Error Nachricht in Abhängigkeit des Anwenderverbund prop.
              anwenderverbund ?
                <ContextErrorMessage error={updatingError} contextErrorMsg={`Der Anwenderverbund ${anwenderverbund.getID()} konnte nicht geupdatet werden.`} onReload={this.updateAnwenderverbund} />
                :
                <ContextErrorMessage error={addingError} contextErrorMsg={`Der Anwenderverbund konnte nicht hinzugefügt werden..`} onReload={this.addAnwenderverbund} />
            }
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color='secondary'>
              Abbrechen
            </Button>
            {
              // Wenn Einzelhaendler vorhanden ist, zeige eine Update Taste, sonst eine Anlegen Taste.
              anwenderverbund ?
                <Button disabled={anwenderverbundNameValidationFailed} variant='contained' onClick={this.updateAnwenderverbund} color='primary'>
                  Update
              </Button>
                : <Button disabled={anwenderverbundNameValidationFailed || !anwenderverbundNameEdited} variant='contained' onClick={this.addAnwenderverbund} color='primary'>
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
AnwenderverbundForm.propTypes = {
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

export default withStyles(styles)(AnwenderverbundForm);
