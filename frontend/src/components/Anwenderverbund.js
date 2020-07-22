import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Button, TextField, InputAdornment, IconButton, Grid, Typography } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import ClearIcon from '@material-ui/icons/Clear'
import { withRouter } from 'react-router-dom';
import  API  from '../api/API';
import ContextErrorMessage from './dialogs/ContextErrorMessage';
import LoadingProgress from './dialogs/LoadingProgress';
import AnwenderverbundForm from "./dialogs/AnwenderverbundForm";
import AnwenderverbundListenEintrag from "./AnwenderverbundListenEintrag";

/**
 * Kontrolliert eine Liste von AnwenderverbundListenEintraegen um ein ExpansionPanel für jeden
 * Anwenderverbund zu erstellen.
 */

class Anwenderverbund extends Component {

  constructor(props) {
    super(props);

    let expandedID = null;

    if (this.props.location.expandAnwenderverbund) {
      expandedID = this.props.location.expandAnwenderverbund.getID();
    }

    // Init ein leeres state
    this.state = {
      anwenderverbund: [],
      filteredAnwenderverbund: [],
      anwenderverbundFilterStr: '',
      error: null,
      loadingInProgress: false,
      expandedAnwenderverbundID: expandedID,
      showAnwenderverbundForm: false,
      newBenutzerFromNewAnwenderverbund: null
    };
  }

  /** Fetchet alle AnwenderverbundBOs für das Backend */
  getAnwenderverbund = () => {
    API.getAPI().getAnwenderverbuendeByBenutzerAPI(this.props.userMail)
      .then(anwenderverbundBOs =>
        this.setState({               // Setzt neues state wenn AnwenderverbundBOs gefetcht wurden
          anwenderverbund: anwenderverbundBOs,
          filteredAnwenderverbund: [...anwenderverbundBOs], // Speichert eine Kopie
          loadingInProgress: false,   // Ladeanzeige deaktivieren
          error: null
        })).catch(e =>
          this.setState({             // Setzt state mit Error vom catch zurück
            anwenderverbund: [],
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
    this.getAnwenderverbund();
  }

  /**
   * Behandelt onExpandedStateChange Ereignisse von der AnwenderverbundListenEintrag Komponente.
   * Schaltet das erweiterte state vom AnwenderverbundListenEintrag vom gegebenen AnwenderverbundBO um.
   * @param {Anwenderverbund} AnwenderverbundBO von dem AnwenderverbundListenEintrag umgeschaltet werden.
   */

  onExpandedStateChange = anwenderverbund => {
    // Setzt erweiterten Anwenderverbund Eintrag standardmäßig auf null
    let newID = null;

    // Wenn der selbe Anwenderverbund Eintrag geklickt wird, klappe ihn zusammen oder erweitere einen Neuen
    if (anwenderverbund.getID() !== this.state.expandedAnwenderverbundID) {
      // Erweitere den Anwenderverbund Eintrag mit anwenderverbundID
      newID = anwenderverbund.getID();
    }

    this.setState({
      expandedAnwenderverbundID: newID,
    });
  }

  /**
   * Behandelt onAnwenderverbundLoeschen Ereignisse von der AnwenderverbundListenEintrag Komponente.
   * @param {Anwenderverbund} AnwenderverbundBO von dem AnwenderverbundListenEintrag um gelöscht zu werden.
   */
  anwenderverbundDeleted = anwenderverbund => {
    const newAnwenderverbundList = this.state.anwenderverbund.filter(anwenderverbundFromState => anwenderverbundFromState.getID() !== anwenderverbund.getID());
    this.setState({
      anwenderverbund: newAnwenderverbundList,
      filteredAnwenderverbund: [...newAnwenderverbundList],
      showAnwenderverbundForm: false
    });
  }

  /** Behandelt das onClick Ereignis, der Anwenderverbund anlegen Taste. */
  addAnwenderverbundButtonClicked = event => {
    // Nicht das erweiterte state umschalten
    event.stopPropagation();
    //Zeige den AnwenderverbundForm
    this.setState({
      showAnwenderverbundForm: true
    });
  }

  /** Behandelt das onClose Ereignis vom AnwenderverbundForm */
  anwenderverbundFormClosed = (anwenderverbund, benutzer) => {

    if (anwenderverbund) {
      const newAnwenderverbundList = [...this.state.anwenderverbund, anwenderverbund];      // Wenn Anwenderverbund übergeben wird, wird er
      this.setState({                                                                   // zum Sate hinzugefügt und direkt angezeigt
        anwenderverbund: newAnwenderverbundList,
        filteredAnwenderverbund: [...newAnwenderverbundList],
        showAnwenderverbundForm: false
      });
    }
    if(benutzer){                                                                   // Wenn benutzer übergeben wird (wenn ein neuer Anwenderverbund erstellt wird)
      this.setState({                                                           // dann wird der Benutzer in den State geschrieben, welcher als prop weitergegeben wird
        newBenutzerFromNewAnwenderverbund:benutzer})

    }

    else {
      this.setState({
        showAnwenderverbundForm: false
      });
    }
  }

  /** Behandelt das onChange Ereignis von dem Anwenderverbund filtern Textfeld */
  filterFieldValueChange = event => {
    const value = event.target.value.toLowerCase();
    this.setState({
      filteredAnwenderverbund: this.state.anwenderverbund.filter(anwenderverbund => {
        let NameContainsValue = anwenderverbund.getName().toLowerCase().includes(value);
        return NameContainsValue;
      }),
      anwenderverbundFilter: value
    });
  }

  /** Behandelt das onClose Ereignis von der Filter löschen Taste. */
  clearFilterFieldButtonClicked = () => {
    // Setzt den Filter zurück
    this.setState({
      filteredAnwenderverbund: [...this.state.anwenderverbund],
      anwenderverbundFilter: ''
    });
  }

  /** Rendert die Komponente */
  render() {
    const { classes } = this.props;
    const { filteredAnwenderverbund, anwenderverbundFilter, expandedAnwenderverbundID, loadingInProgress, error, showAnwenderverbundForm ,newBenutzerFromNewAnwenderverbund} = this.state;
    return (
      <div className={classes.root}>
        <Grid className={classes.anwenderverbundFilter} container spacing={1} justify='flex-start' alignItems='center'>
          <Grid item>
            <Typography>
              Filter Anwenderverbund nach Name:
              </Typography>
          </Grid>
          <Grid item xs={4}>
            <TextField
              autoFocus
              fullWidth
              id='einzelhaendlerFilter'
              type='text'
              value={anwenderverbundFilter}
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
            <Button variant='contained' color='primary' startIcon={<AddIcon />} onClick={this.addAnwenderverbundButtonClicked}>
              Anwenderverbund hinzufügen
          </Button>
          </Grid>
        </Grid>
        {
          /** Zeigt die Liste der AnwenderverbundListenEintrag Komponenten
              Benutze keinen strengen Vergleich, da expandedAnwenderverbundID vielleicht ein string ist,
              wenn dies von den URL Parametern gegeben ist. */

          filteredAnwenderverbund.map(anwenderverbund =>
            <AnwenderverbundListenEintrag key={anwenderverbund.getID()} anwenderverbund={anwenderverbund} expandedState={expandedAnwenderverbundID === anwenderverbund.getID()}
              onExpandedStateChange={this.onExpandedStateChange}  newBenutzerFromNewAnwenderverbund={newBenutzerFromNewAnwenderverbund}
              onAnwenderverbundDeleted={this.anwenderverbundDeleted}
            />)
        }
        <LoadingProgress show={loadingInProgress} />
        <ContextErrorMessage error={error} contextErrorMsg={`Die Liste der Anwenderverbünde konnte nicht geladen werden.`} onReload={this.getAnwenderverbund} />
        <AnwenderverbundForm show={showAnwenderverbundForm} userMail={this.props.userMail} onClose={this.anwenderverbundFormClosed} />
      </div>
    );
  }
}

/** Komponentenspezifische Stile */
const styles = theme => ({
  root: {
    width: '100%',
  },
  anwenderverbundFilter: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
  }
});

/** PropTypes */
Anwenderverbund.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,
  /** @ignore */
  location: PropTypes.object.isRequired,
}

export default withRouter(withStyles(styles)(Anwenderverbund));