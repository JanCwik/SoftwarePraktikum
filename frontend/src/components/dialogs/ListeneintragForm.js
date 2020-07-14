
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Button, IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions,MenuItem, FormControl, InputLabel, Select, Grid, InputAdornment} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import  ListeneintragBO  from '../../api/ListeneintragBO';
import  API from '../../api/API';
import ContextErrorMessage from './ContextErrorMessage';
import LoadingProgress from './LoadingProgress';
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

    let lan = '', lam = '', lae = '', len = '', lbn = '';
    if (props.listeneintrag) {
      //lan = props.listeneintrag.getArtikel_name();
      lan = props.listeneintrag.getArtikel_name();
      lam = props.listeneintrag.getMenge();
      lae = props.listeneintrag.getArtikel_einheit();
      len = props.listeneintrag.getEinzelhaendler_name();
      lbn = props.listeneintrag.getBenutzer_name();
    }

    // Init state
    this.state = {
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
      filteredArtikel: [],
      addingInProgress: false,
      updatingInProgress: false,
      addingError: null,
      updatingError: null,
      artikelCombobox:[]
    };
    // Speichere dieses state zum abbrechen
    this.baseState = this.state;
  }

   /** Fetchet alle ArtikelBOs für das Backend */
  getArtikel = () => {
    API.getAPI().getArtikelAPI()
      .then(artikelBOs =>
        this.setState({               // Setzt neues state wenn ArtikelBOs gefetcht wurden
          artikelCombobox: artikelBOs,


        })).catch(e =>
          this.setState({             // Setzt state mit Error vom catch zurück
            artikelCombobox: [],

          })
        );

    // Setzt laden auf true

  }

  /** Lebenszyklus Methode, welche aufgerufen wird, wenn die Komponente in das DOM des Browsers eingefügt wird.*/


  componentDidMount() {
    this.getArtikel();
  }



  /** Legt Artikel an */

  addListeneintrag = () => {
    let newListeneintrag = new ListeneintragBO();
    newListeneintrag.setArtikel_name(this.state.artikel_name);
    newListeneintrag.setMenge(this.state.listeneintragMenge);
    newListeneintrag.setArtikel_einheit(this.state.artikel_einheit);
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

  /** Rendert die Komponente */

  render() {
    const { classes,show,listeneintrag, artikel } = this.props;
    const { listeneintragArtikelName, listeneintragArtikelNameValidationFailed, listeneintragArtikelNameEdited,
            listeneintragArtikelMenge, listeneintragArtikelMengeEdited, listeneintragArtikelEinheit,
            listeneintragArtikelEinheitEdited, listeneintragEinzelhaendlerName, listeneintragEinzelhaendlerNameEdited,
            listeneintragBenutzerName, artikelFilter, addingInProgress, addingError, updatingInProgress, updatingError, artikelCombobox } = this.state;
console.log(artikelCombobox)
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
                 <Autocomplete
                    id="combo-box-demo"
                    options={artikelCombobox}
                    getOptionLabel={(option) => option.getName()}
                    style={{ width: 300 }}
                   renderInput={(params) => <TextField {...params} label="Artikel" variant="outlined" />}/>


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
                : <Button disabled={listeneintragArtikelNameValidationFailed || !listeneintragArtikelNameEdited || !listeneintragArtikelMengeEdited || !listeneintragArtikelEinheitEdited} variant='contained' onClick={this.addArtikel} color='primary'>
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