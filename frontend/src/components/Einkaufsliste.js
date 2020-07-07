import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Button, TextField, InputAdornment, IconButton, Grid, Typography } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import ClearIcon from '@material-ui/icons/Clear'
import { withRouter } from 'react-router-dom';
import  API from "../api/API";
import ContextErrorMessage from './dialogs/ContextErrorMessage';
import LoadingProgress from './dialogs/LoadingProgress';
import EinkaufslisteForm from './dialogs/EinzelhaendlerForm';
import EinkaufslisteListenEintrag from "./EinzelhaendlerListenEintrag";

/**
 * Kontrolliert eine Liste von EinzelhaendlerListenEintraegen um ein Akkordeon für jeden
 * Einzelhaendler zu erstellen.
 */
class Einkaufsliste extends Component {

  constructor(props) {
    super(props);

    // console.log(props);
    let expandedID = null;

    if (this.props.location.expandEinkaufsliste) {
      expandedID = this.props.location.expandEinkaufsliste.getID();
    }

    // Init ein leeres state
    this.state = {
      einkaufsliste: [],
      filteredEinkaufsliste: [],
      einzelhaendlerFilterStr: '',
      error: null,
      loadingInProgress: false,
      expandedEinkaufslisteID: expandedID,
      showEinkaufslisteForm: false
    };
  }

  /** Fetchet alle EinzelhaendlerBOs für das Backend */
  getEinkaufsliste = () => {
    API.getAPI().getEinkaufslisteAPI()
      .then(einkaufslisteBOs =>
        this.setState({               // Setzt neues state wenn EinzelhaendlerBOs gefetcht wurden
          einkaufsliste: einkaufslisteBOs,
          filteredEinkaufsliste: [...einzelhaendlerBOs], // Speichert eine Kopie
          loadingInProgress: false,   // Ladeanzeige deaktivieren
          error: null
        })).catch(e =>
          this.setState({             // Setzt state mit Error vom catch zurück
            einkaufsliste: [],
            loadingInProgress: false, // Ladeanzeige deaktivieren
            error: e
          })
        );

    // Setzt laden auf true
    this.setState({
      loadingInProgress: true,
      error: null
    });
  }

  /** Lebenszyklus Methode, welche aufgerufen wird, wenn die Komponente in das DOM des Browsers eingefügt wird.*/


  componentDidMount() {
    this.getEinzelhaendler();
  }

  /**
   * Behandelt onExpandedStateChange Ereignisse von der EinzelhaendlerListenEintrag Komponente.
   * Schaltet das erweiterte state vom EinzelhaendlerListenEintrag vom gegebenen EinzelhaendlerBO um.
   * @param {Einzelhaendler} EinzelhaendlerBO von dem EinzelhaendlerListenEintrag umgeschaltet werden.
   */
  onExpandedStateChange = einkaufsliste => {
    // console.log(einzelhaendlerID);
    // Setzt erweiterten Einzelhaendler Eintrag standardmäßig auf null
    let newID = null;

    // Wenn der selbe Einzelhaendler Eintrag geklickt wird, klappe ihn zusammen oder erweitere einen Neuen
    if (einkaufsliste.getID() !== this.state.expandedEinkaufslisteID) {
      // Erweitere den Einzelhaendler Eintrag mit einzelhaendlerID
      newID = einkaufsliste.getID();
    }
    // console.log(newID);
    this.setState({
      expandedEinkaufslisteID: newID,
    });
  }

  /**
   * Behandelt einzelhaendlerDeleted Ereignisse von der EinzelhaendlerListenEintrag Komponente.
   *
   * @param {Einzelhaendler} EinzelhaendlerBO von dem EinzelhaendlerListenEintrag um gelöscht zu werde
   */
  einkaufslisteDeleted = einkaufsliste => {
    const newEinkaufslisteList = this.state.einkaufsliste.filter(einkaufslisteFromState => einkaufslisteFromState.getID() !== einkaufsliste.getID());
    this.setState({
      einkaufsliste: newEinkaufslisteList,
      filteredEinkaufsliste: [...newEinkaufslisteList],
      showEinkaufslisteForm: false
    });
  }

  /** Behandelt das onClick Ereignis, der Einzelhaendler anlegen Taste. */
  addEinkaufslisteButtonClicked = event => {
    // Nicht das erweiterte state umschalten
    event.stopPropagation();
    //Zeige den EinzelhaendlerForm
    this.setState({
      showEinkaufslisteForm: true
    });
  }

  /** Behandelt das onClose Ereignis vom EinzelhaendlerForm */
  einkaufslisteFormClosed = einkaufsliste => {
    // Einzelhaendler ist nicht null und deshalb erstellt
    if (einkaufsliste) {
      const newEinkaufslisteList = [...this.state.einkaufsliste, einkaufsliste];
      this.setState({
        einkaufsliste: newEinkaufslisteList,
        filteredEinkaufsliste: [...newEinzelhaendlerList],
        showEinzelhaendlerForm: false
      });
    } else {
      this.setState({
        showEinkaufslisteForm: false
      });
    }
  }

  /** Behandelt das onChange Ereignis von dem Einzelhaendler filtern Textfeld */
  filterFieldValueChange = event => {
    const value = event.target.value.toLowerCase();
    this.setState({
      filteredEin: this.state.einzelhaendler.filter(einzelhaendler => {
        let NameContainsValue = einzelhaendler.getName().toLowerCase().includes(value);
        return NameContainsValue;
      }),
      einzelhaendlerFilter: value
    });
  }

  /** Behandelt das onClose Ereignis von der Filter löschen Taste. */
  clearFilterFieldButtonClicked = () => {
    // Setzt den Filter zurück
    this.setState({
      filteredEinzelhaendler: [...this.state.einzelhaendler],
      einzelhaendlerFilter: ''
    });
  }

  /** Rendert die Komponente */
  render() {
    const { classes } = this.props;
    const { filteredEinzelhaendler, einzelhaendlerFilter, expandedEinzelhaendlerID, loadingInProgress, error, showEinzelhaendlerForm } = this.state;

    return (
      <div className={classes.root}>
        <Grid className={classes.einzelhaendlerFilter} container spacing={1} justify='flex-start' alignItems='center'>
          <Grid item>
            <Typography>
              Filter Einzelhändlerliste nach Name:
              </Typography>
          </Grid>
          <Grid item xs={4}>
            <TextField
              autoFocus
              fullWidth
              id='einzelhaendlerFilter'
              type='text'
              value={einzelhaendlerFilter}
              onChange={this.filterFieldValueChange}
              InputProps={{
                endAdornment: <InputAdornment position='end'>
                  <IconButton onClick={this.clearFilterFieldButtonClicked}>
                    <ClearIcon />
                  </IconButton>
                </InputAdornment>,
              }}
            />
          </Grid>
          <Grid item xs />
          <Grid item>
            <Button variant='contained' color='primary' startIcon={<AddIcon />} onClick={this.addEinzelhaendlerButtonClicked}>
              Einzelhändler hinzufügen
          </Button>
          </Grid>
        </Grid>
        {
          /** Zeigt die Liste der EinzelhaendlerListenEintrag Komponenten
          // Benutze keinen strengen Vergleich, da expandedEinzelhaendlerID vielleicht ein string ist,
           wenn dies von den URL Parametern gegeben ist. */

          filteredEinzelhaendler.map(einzelhaendler =>
            <EinzelhaendlerListenEintrag key={einzelhaendler.getID()} einzelhaendler={einzelhaendler} expandedState={expandedEinzelhaendlerID === einzelhaendler.getID()}
              onExpandedStateChange={this.onExpandedStateChange}
              onEinzelhaendlerDeleted={this.einzelhaendlerDeleted}
            />)
        }
        <LoadingProgress show={loadingInProgress} />
        <ContextErrorMessage error={error} contextErrorMsg={`Die Liste der Einzelhändler konnte nicht geladen werden.`} onReload={this.getEinzelhaendler} />
        <EinzelhaendlerForm show={showEinzelhaendlerForm} onClose={this.einzelhaendlerFormClosed} />
      </div>
    );
  }
}

/** Komponentenspezifisches Styling */
const styles = theme => ({
  root: {
    width: '100%',
  },
  einzelhaendlerFilter: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
  }
});

/** PropTypes */
Einzelhaendler.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,
  /** @ignore */
  location: PropTypes.object.isRequired,
}

export default withRouter(withStyles(styles)(Einzelhaendler));