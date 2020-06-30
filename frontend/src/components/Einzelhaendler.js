import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Button, TextField, InputAdornment, IconButton, Grid, Typography } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import ClearIcon from '@material-ui/icons/Clear'
import { withRouter } from 'react-router-dom';
import  API from "../api/API";
import ContextErrorMessage from './dialogs/ContextErrorMessage';
import LoadingProgress from './dialogs/LoadingProgress';
import EinzelhaendlerForm from './dialogs/EinzelhaendlerForm';
import EinzelhaendlerListenEintrag from "./EinzelhaendlerListenEintrag";

/**
 * Kontrolliert eine Liste von EinzelhaendlerListenEintraegen um ein Akkordeon für jeden
 * Einzelhaendler zu erstellen.
 */
class Einzelhaendler extends Component {

  constructor(props) {
    super(props);

    // console.log(props);
    let expandedID = null;

    if (this.props.location.expandEinzelhaendler) {
      expandedID = this.props.location.expandEinzelhaendler.getID();
    }

    // Init ein leeres state
    this.state = {
      einzelhaendler: [],
      filteredEinzelhaendler: [],
      einzelhaendlerFilterStr: '',
      error: null,
      loadingInProgress: false,
      expandedEinzelhaendlerID: expandedID,
      showEinzelhaendlerForm: false
    };
  }

  /** Fetchet alle EinzelhaendlerBOs für das Backend */
  getEinzelhaendler = () => {
    API.getAPI().getEinzelhaendlerAPI()
      .then(einzelhaendlerBOs =>
        this.setState({               // Setzt neues state wenn EinzelhaendlerBOs gefetcht wurden
          einzelhaendler: einzelhaendlerBOs,
          filteredEinzelhaendler: [...einzelhaendlerBOs], // Speichert eine Kopie
          loadingInProgress: false,   // Ladeanzeige deaktivieren
          error: null
        })).catch(e =>
          this.setState({             // Setzt state mit Error vom catch zurück
            einzelhaendler: [],
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
  onExpandedStateChange = einzelhaendler => {
    // console.log(einzelhaendlerID);
    // Setzt erweiterten Einzelhaendler Eintrag standardmäßig auf null
    let newID = null;

    // Wenn der selbe Einzelhaendler Eintrag geklickt wird, klappe ihn zusammen oder erweitere einen Neuen
    if (einzelhaendler.getID() !== this.state.expandedEinzelhaendlerID) {
      // Erweitere den Einzelhaendler Eintrag mit einzelhaendlerID
      newID = einzelhaendler.getID();
    }
    // console.log(newID);
    this.setState({
      expandedEinzelhaendlerID: newID,
    });
  }

  /**
   * Behandelt onEinzelhaendlerLoeschen Ereignisse von der EinzelhaendlerListenEintrag Komponente.
   *
   * @param {Einzelhaendler} EinzelhaendlerBO von dem EinzelhaendlerListenEintrag um gelöscht zu werde
   */
  einzelhaendlerDeleted = einzelhaendler => {
    const newEinzelhaendlerList = this.state.einzelhaendler.filter(einzelhaendlerFromState => einzelhaendlerFromState.getID() !== einzelhaendler.getID());
    this.setState({
      einzelhaendler: newEinzelhaendlerList,
      filteredEinzelhaendler: [...newEinzelhaendlerList],
      showEinzelhaendlerForm: false
    });
  }

  /** Behandelt das onClick Ereignis, der Einzelhaendler anlegen Taste. */
  addEinzelhaendlerButtonClicked = event => {
    // Nicht das erweiterte state umschalten
    event.stopPropagation();
    //Zeige den EinzelhaendlerForm
    this.setState({
      showEinzelhaendlerForm: true
    });
  }

  /** Behandelt das onClose Ereignis vom EinzelhaendlerForm */
  einzelhaendlerFormClosed = einzelhaendler => {
    // Einzelhaendler ist nicht null und deshalb erstellt
    if (einzelhaendler) {
      const newEinzelhaendlerList = [...this.state.einzelhaendler, einzelhaendler];
      this.setState({
        einzelhaendler: newEinzelhaendlerList,
        filteredEinzelhaendler: [...newEinzelhaendlerList],
        showEinzelhaendlerForm: false
      });
    } else {
      this.setState({
        showEinzelhaendlerForm: false
      });
    }
  }

  /** Behandelt das onChange Ereignis von dem Einzelhaendler filtern Textfeld */
  filterFieldValueChange = event => {
    const value = event.target.value.toLowerCase();
    this.setState({
      filteredEinzelhaendler: this.state.einzelhaendler.filter(einzelhaendler => {
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

/** Komponentenspezifische Stile */
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