import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Button, IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField, MenuItem, FormControl, InputLabel, Select } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import  ArtikelBO  from '../../api/ArtikelBO';
import  API from '../../api/API';
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
class ArtikelForm extends Component {

  constructor(props) {
    super(props);

    let an = '', sa = '', ae = '';
    if (props.artikel) {
      an = props.artikel.getName();
      sa = props.artikel.getStandardartikel();
      ae = props.artikel.getEinheit();
    }

    // Init state
    this.state = {
      artikelName: an,
      artikelNameValidationFailed: false,
      artikelNameEdited: false,
      artikelStandardartikel: sa,
      artikelStandardartikelEdited: false,
      artikelEinheit: ae,
      artikelEinheitEdited: false,
      addingInProgress: false,
      updatingInProgress: false,
      addingError: null,
      updatingError: null
    };
    // Speichere dieses state zum abbrechen
    this.baseState = this.state;
  }

  /** Legt Einzelhaendler an */
  addArtikel = () => {
    let newArtikel = new ArtikelBO(this.state.artikelName,
        this.state.artikelStandardartikel, this.state.artikelEinheit);  //legt neues Artikel-objekt mit name aus dem state an
    API.getAPI().addArtikelAPI(newArtikel).then(artikel => {
      // Backend Aufruf erfolgreich
      // reinit den Dialog state für einen neuen leeren Einzelhaendler
      this.setState(this.baseState);
      this.props.onClose(artikel); // Aufruf mit Hilfe des Einzelhaendler Objekts aus dem Backend
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
  updateArtikel = () => {
    // Klont den originalen Einzelhaendler, wenn der Backend Aufruf fehlschlägt
    let updatedArtikel = Object.assign(new ArtikelBO(), this.props.artikel);
    // Setzt die neuen Attribute aus dem Dialog
    updatedArtikel.setName(this.state.artikelName);
    updatedArtikel.setStandardartikel(this.state.artikelStandardartikel);
    updatedArtikel.setEinheit(this.state.artikelEinheit);
    API.getAPI().updateArtikelAPI(updatedArtikel).then(artikel => {
      this.setState({
        updatingInProgress: false,              // Ladeanzeige deaktivieren
        updatingError: null                     // Keine Error Nachricht
      });
      // Behalte das neue state als Grund state
      this.baseState.artikelName = this.state.artikelName;
      this.baseState.artikelStandardartikel = this.state.artikelStandardartikel;
      this.baseState.artikelEinheit = this.state.artikelEinheit;
      this.props.onClose(updatedArtikel);      // Aufruf mit dem neuen Einzelhaendler
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

  inputFieldValueChange = (event) => {
    let Standardartikel = event.target.value;
    this.setState({
      Standardartikel: Standardartikel
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
    const { classes, artikel, show } = this.props;
    const { artikelName, artikelNameValidationFailed, artikelNameEdited, artikelStandardartikel,
        artikelStandardartikelEdited, artikelEinheit, artikelEinheitEdited, addingInProgress,
        addingError, updatingInProgress, updatingError } = this.state;

    let title = '';
    let header = '';

    if (artikel) {
      // customer defindet, so ist an edit dialogmmmmmmmmmmmmmmmmmmmmmmmmmmmm
      title = 'Update des Artikels';
      header = `Artikel ID: ${artikel.getID()}`;
    } else {
      title = 'Erstelle einen neuen Artikel';
      header = 'Gebe Artikeldaten ein';
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
              <TextField autoFocus type='text' required fullWidth margin='normal' id='artikelName' label='Artikel Name:' value={artikelName}
                onChange={this.textFieldValueChange} error={artikelNameValidationFailed}
                helperText={artikelNameValidationFailed ? 'Der Name muss mindestens ein Zeichen enthalten' : ' '} />
          <FormControl className={classes.formControl}>
            <InputLabel id="artikelStandardartikelLabel">Standartartikel?</InputLabel>
              <Select
                labelId="artikelStandardartikelLabel"
                id="artikelStandardartikel"
                value={this.artikelStandardartikel}
                onChange={this.inputFieldValueChange}
              >
                <MenuItem value={true}>Ja</MenuItem>
                <MenuItem value={false}>Nein</MenuItem>
              </Select>
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel id="artikelEinheitLabel">Einheit</InputLabel>
              <Select
                labelId="artikelEinheitLabel"
                id="artikelEinheit"
                value={this.artikelEinheit}
                onChange={this.handleChange}
              >
                <MenuItem value={"Kilogramm"}>Kilogramm</MenuItem>
                <MenuItem value={"Liter"}>Liter</MenuItem>
                <MenuItem value={"Packung"}>Packung</MenuItem>
              </Select>
          </FormControl>
            </form>
            <LoadingProgress show={addingInProgress || updatingInProgress} />
            {
              // Zeigt Error Nachricht in Abhängigkeit des Einzelhaendler prop.
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
              // Wenn Einzelhaendler vorhanden ist, zeige eine Update Taste, sonst eine Anlegen Taste.
              artikel ?
                <Button disabled={artikelNameValidationFailed} variant='contained' onClick={this.updateArtikel} color='primary'>
                  Update
              </Button>
                : <Button disabled={artikelNameValidationFailed || !artikelNameEdited} variant='contained' onClick={this.addArtikel} color='primary'>
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
ArtikelForm.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,
  /** Das EinzelhaendlerBO wird editiert. */
  artikel: PropTypes.object,
  /** Wenn true, wird das Formular gerendert. */
  show: PropTypes.bool.isRequired,
  /**
   * Handler Funktion, die aufgerufen wird wenn der Dialog geschlossen ist.
   * Sendet das editierte oder angelegte EinzelhaendlerBO als Parameter oder null,
   * wenn abbrechen gedrückt wurde.
   */
  onClose: PropTypes.func.isRequired,
}

export default withStyles(styles)(ArtikelForm);
