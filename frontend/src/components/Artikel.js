import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Button, TextField, InputAdornment, IconButton, Grid, Typography } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import ClearIcon from '@material-ui/icons/Clear'
import { withRouter } from 'react-router-dom';
import { API } from '../api';
import ContextErrorMessage from './dialogs/ContextErrorMessage';
import LoadingProgress from './dialogs/LoadingProgress';
import ArtikelForm from './dialogs/ArtikelForm';
import ArtikelListenEintrag from "./ArtikelListenEintrag";

/**
 * Kontrolliert eine Liste von EinzelhaendlerListenEintraegen um ein Akkordeon für jeden
 * Einzelhaendler zu erstellen.
 */
class Artikel extends Component {

  constructor(props) {
    super(props);

    // console.log(props);
    let expandedID = null;

    if (this.props.location.expandArtikel) {
      expandedID = this.props.location.expandArtikel.getID();
    }

    // Init ein leeres state
    this.state = {
      artikel: [],
      filteredArtikel: [],
      artikelFilterStr: '',
      error: null,
      loadingInProgress: false,
      expandedArtikelID: expandedID,
      showArtikelForm: false
    };
  }

  /** Fetchet alle EinzelhaendlerBOs für das Backend */
  getArtikel = () => {
    API.getAPI().getArtikel()
      .then(artikelBOs =>
        this.setState({               // Setzt neues state wenn EinzelhaendlerBOs gefetcht wurden
          artikel: artikelBOs,
          filteredArtikel: [...artikelBOs], // Speichert eine Kopie
          loadingInProgress: false,   // Ladeanzeige deaktivieren
          error: null
        })).catch(e =>
          this.setState({             // Setzt state mit Error vom catch zurück
            artikel: [],
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

  /*
  componentDidMount() {
    this.getEinzelhaendler();
  }
*/
  /**
   * Behandelt onExpandedStateChange Ereignisse von der EinzelhaendlerListenEintrag Komponente.
   * Schaltet das erweiterte state vom EinzelhaendlerListenEintrag vom gegebenen EinzelhaendlerBO um.
   * @param {Einzelhaendler} EinzelhaendlerBO von dem EinzelhaendlerListenEintrag umgeschaltet werden.
   */
  onExpandedStateChange = artikel => {
    // console.log(artikelID);
    // Setzt erweiterten Einzelhaendler Eintrag standardmäßig auf null
    let newID = null;

    // Wenn der selbe Einzelhaendler Eintrag geklickt wird, klappe ihn zusammen oder erweitere einen Neuen
    if (artikel.getID() !== this.state.expandedArtikelID) {
      // Erweitere den Einzelhaendler Eintrag mit einzelhaendlerID
      newID = artikel.getID();
    }
    // console.log(newID);
    this.setState({
      expandedArtikelID: newID,
    });
  }

  /**
   * Behandelt onEinzelhaendlerLoeschen Ereignisse von der EinzelhaendlerListenEintrag Komponente.
   *
   * @param {Einzelhaendler} EinzelhaendlerBO von dem EinzelhaendlerListenEintrag um gelöscht zu werde
   */
  artikelDeleted = artikel => {
    const newArtikelList = this.state.artikel.filter(artikelFromState => artikelFromState.getID() !== artikel.getID());
    this.setState({
      artikel: newArtikelList,
      filteredArtikel: [...newArtikelList],
      showArtikelForm: false
    });
  }

  /** Behandelt das onClick Ereignis, der Einzelhaendler anlegen Taste. */
  addArtikelButtonClicked = event => {
    // Nicht das erweiterte state umschalten
    event.stopPropagation();
    //Zeige den EinzelhaendlerForm
    this.setState({
      showArtikelForm: true
    });
  }

  /** Behandelt das onClose Ereignis vom EinzelhaendlerForm */
  artikelFormClosed = artikel => {
    // Einzelhaendler ist nicht null und deshalb erstellt
    if (artikel) {
      const newArtikelList = [...this.state.artikel, artikel];
      this.setState({
        artikel: newArtikelList,
        filteredArtikel: [...newArtikelList],
        showArtikelForm: false
      });
    } else {
      this.setState({
        showArtikelForm: false
      });
    }
  }

  /** Behandelt das onChange Ereignis von dem Einzelhaendler filtern Textfeld */
  filterFieldValueChange = event => {
    const value = event.target.value.toLowerCase();
    this.setState({
      filteredArtikel: this.state.artikel.filter(artikel => {
        let NameContainsValue = artikel.getName().toLowerCase().includes(value);
        return NameContainsValue;
      }),
      artikelFilter: value
    });
  }

  /** Behandelt das onClose Ereignis von der Filter löschen Taste. */
  clearFilterFieldButtonClicked = () => {
    // Setzt den Filter zurück
    this.setState({
      filteredArtikel: [...this.state.artikel],
      artikelFilter: ''
    });
  }

  /** Rendert die Komponente */
  render() {
    const { classes } = this.props;
    const { filteredArtikel, artikelFilter, expandedArtikelID, loadingInProgress, error, showArtikelForm } = this.state;

    return (
      <div className={classes.root}>
        <Grid className={classes.artikelFilter} container spacing={1} justify='flex-start' alignItems='center'>
          <Grid item>
            <Typography>
              Filter Artikelliste nach Name:
              </Typography>
          </Grid>
          <Grid item xs={4}>
            <TextField
              autoFocus
              fullWidth
              id='artikelFilter'
              type='text'
              value={artikelFilter}
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
            <Button variant='contained' color='primary' startIcon={<AddIcon />} onClick={this.addArtikelButtonClicked}>
              Artikel hinzufügen
          </Button>
          </Grid>
        </Grid>
        {
          /** Zeigt die Liste der EinzelhaendlerListenEintrag Komponenten
          // Benutze keinen strengen Vergleich, da expandedEinzelhaendlerID vielleicht ein string ist,
           wenn dies von den URL Parametern gegeben ist. */

          filteredArtikel.map(artikel =>
            <ArtikelListenEintrag key={artikel.getID()} artikel={artikel} expandedState={expandedEinzelhaendlerID === artikel.getID()}
              onExpandedStateChange={this.onExpandedStateChange}
              onArtikelDeleted={this.artikelDeleted}
            />)
        }
        <LoadingProgress show={loadingInProgress} />
        <ContextErrorMessage error={error} contextErrorMsg={`Die Liste der Artikel konnte nicht geladen werden.`} onReload={this.getArtikel} />
        <ArtikelForm show={showArtikelForm} onClose={this.artikelFormClosed} />
      </div>
    );
  }
}

/** Komponentenspezifische Stile */
const styles = theme => ({
  root: {
    width: '100%',
  },
  artikelFilter: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
  }
});

/** PropTypes */
Artikel.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,
  /** @ignore */
  location: PropTypes.object.isRequired,
}

export default withRouter(withStyles(styles)(Artikel));