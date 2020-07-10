import React, { Component } from 'react';
import {PropTypes} from 'prop-types';
import { withStyles, Button, TextField, InputAdornment, IconButton, Grid, Typography } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import ClearIcon from '@material-ui/icons/Clear'
import {withRouter}  from 'react-router-dom';
import  API  from '../api/API';
import ContextErrorMessage from './dialogs/ContextErrorMessage';
import LoadingProgress from './dialogs/LoadingProgress';
import AlleEinkaufslistenListenEintrag from "./AlleEinkaufslistenListenEintrag";
import EinkaufslisteForm from "./dialogs/EinkaufslisteForm";


/**
 * Kontrolliert eine Liste von Einkaufslisten-ListenEintraegen um ein Akkordeon für jede
 * Einkaufsliste zu erstellen.
 */

class AlleEinkaufslisten extends Component{

    constructor(props) {
    super(props);

     // console.log(props);


    // Init ein leeres state
    this.state = {
      alle_einkaufslisten: [],
      filteredEinkaufslisten: [],
      einkaufslistenFilter: '',
      error: null,
      loadingInProgress: false,
      showEinkaufslistenForm: false
    };
  }


  /** Fetchet alle Einkaufslisten für das Backend */

  getEinkaufslisten = () => {
    API.getAPI().getEinkaufslistenAPI()
      .then(EinkaufslistenBOs =>

        this.setState({               // Setzt neues state wenn EinkaufslistenBOs gefetcht wurden
          alle_einkaufslisten: EinkaufslistenBOs,
          filteredEinkaufslisten: [...EinkaufslistenBOs], // Speichert eine Kopie
          loadingInProgress: false,   // Ladeanzeige deaktivieren
          error: null
        })).catch(e =>
          this.setState({             // Setzt state mit Error vom catch zurück
            alle_einkaufslisten: [],
            loadingInProgress: false, // Ladeanzeige deaktivieren
            error: e
          })
        );

    // Setzt laden auf true
    this.setState({
      loadingInProgress: true,
      error: null
    }


    );

  }



 /** Lebenszyklus Methode, welche aufgerufen wird, wenn die Komponente in das DOM des Browsers eingefügt wird.*/

  componentDidMount() {
    this.getEinkaufslisten();
  }


  /**
   * Behandelt EinkaufslisteDeleted Ereignisse von der Einkaufsliste-ListenEintrag Komponente.
   *
   * @param einkaufsliste
   * EinkaufslisteBO von dem Einkaufsliste-ListenEintrag um gelöscht zu werde
   */

  EinkaufslisteDeleted = einkaufsliste => {
    const newEinkaufslisteList = this.state.alle_einkaufslisten.filter(EinkaufslisteFromState => EinkaufslisteFromState.getID() !== einkaufsliste.getID());
    this.setState({
      alle_einkaufslisten: newEinkaufslisteList,
      filteredEinkaufslisten: [...newEinkaufslisteList],
      showEinkaufslistenForm: false
    });
  }

  /** Behandelt das onClick Ereignis, der Einkaufsliste anlegen Taste. */

  addEinkaufslisteButtonClicked = event => {
    // Nicht das erweiterte state umschalten
    event.stopPropagation();
    //Zeige den EinkaufslisteForm
    this.setState({
      showEinkaufslistenForm: true
    });
  }


  /** Behandelt das onClose Ereignis vom EinkaufslisteForm */

  einkaufslisteFormClosed = Einkaufsliste => {
    // Einkaufsliste ist nicht null und deshalb erstellt
    if (Einkaufsliste) {
      const newEinkaufslisteList = [...this.state.alle_einkaufslisten, Einkaufsliste];
      this.setState({
        alle_einkaufslisten: newEinkaufslisteList,
        filteredEinkaufslisten: [...newEinkaufslisteList],
        showEinkaufslistenForm: false
      });
    } else {
      this.setState({
        showEinkaufslistenForm: false
      });
    }
  }


   /** Behandelt das onChange Ereignis von dem Einkaufslisten filtern Textfeld */

  filterFieldValueChange = event => {
    const value = event.target.value.toLowerCase();
    this.setState({
      filteredEinkaufslisten: this.state.alle_einkaufslisten.filter(Einkaufslisten => {
        let NameContainsValue = Einkaufslisten.getName().toLowerCase().includes(value);
        return NameContainsValue;
      }),
      einkaufslistenFilter: value
    });
  }

  /** Behandelt das onClose Ereignis von der Filter löschen Taste. */

  clearFilterFieldButtonClicked = () => {
    // Setzt den Filter zurück
    this.setState({
      filteredEinkaufslisten: [...this.state.alle_einkaufslisten],
      einkaufslistenFilter: ''
    });
  }


  /** Rendert die Komponente */
  render() {
    const { classes } = this.props;
    const { filteredEinkaufslisten, einkaufslistenFilter, loadingInProgress, error, showEinkaufslistenForm } = this.state;

    return (
      <div className={classes.root}>
        <Grid className={classes.einkaufslisteFilter} container spacing={1} justify='flex-start' alignItems='center'>
          <Grid item>
            <Typography>
              Suchen:
              </Typography>
          </Grid>
          <Grid item xs={4}>
            <TextField
              autoFocus
              fullWidth
              id='einkaufslisteFilter'
              type='text'
              value={einkaufslistenFilter}
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
            <Button variant='contained' color='primary' startIcon={<AddIcon />} onClick={this.addEinkaufslisteButtonClicked}>
              Einkaufsliste hinzufügen
          </Button>
          </Grid>
        </Grid>
        {
          // Zeigt die Liste der Einkaufslisten-ListenEintrag Komponenten


          filteredEinkaufslisten.map(einkaufsliste =>
            <AlleEinkaufslistenListenEintrag key={einkaufsliste.getID()} einkaufsliste={einkaufsliste}
              onEinkaufslisteDeleted={this.EinkaufslisteDeleted}
            />)
        }
        <LoadingProgress show={loadingInProgress} />
        <ContextErrorMessage error={error} contextErrorMsg={`Einkaufslisten konnten nicht geladen werden.`} onReload={this.getEinkaufslisten} />


      </div>

    );
  }
}


/** Komponentenspezifisches Styling */
const styles = theme => ({
  root: {
    width: '100%',
  },
  einkaufslisteFilter: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
  }
});

/** PropTypes */
AlleEinkaufslisten.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,
  /** @ignore */
  location: PropTypes.object.isRequired,
}

export default withRouter(withStyles(styles)(AlleEinkaufslisten));

