import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Button, TextField, InputAdornment, IconButton, Grid, Typography } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import ClearIcon from '@material-ui/icons/Clear'
import { withRouter } from 'react-router-dom';
import  API from "../api/API";
import ContextErrorMessage from './dialogs/ContextErrorMessage';
import LoadingProgress from './dialogs/LoadingProgress';
import BenutzerBO from "../api/BenutzerBO";

//import BenutzerListeForm from './dialogs/EinzelhaendlerForm';
//import BenutzerListenEintrag from "./EinzelhaendlerListenEintrag";

/**
 * Kontrolliert eine Liste von EinzelhaendlerListenEintraegen um ein Akkordeon für jeden
 * Einzelhaendler zu erstellen.
 */
class BenutzerListe extends Component {

  constructor(props) {
    super(props);

    // console.log(props);


    // Init ein leeres state
    this.state = {
      benutzerliste: [],
      error: null,
      loadingInProgress: false,
      showEinzelhaendlerForm: false
    };
  }

  /** Fetchet alle EinzelhaendlerBOs für das Backend */
  getMitgliederliste = () => {
    API.getAPI().getBenutzerListeAPI()
      .then(BenutzerBOs =>
        this.setState({               // Setzt neues state wenn EinzelhaendlerBOs gefetcht wurden
          benutzerliste: BenutzerBOs,

          loadingInProgress: false,   // Ladeanzeige deaktivieren
          error: null
        })).catch(e =>
          this.setState({             // Setzt state mit Error vom catch zurück
            benutzerliste: [],
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
   * Behandelt einzelhaendlerDeleted Ereignisse von der EinzelhaendlerListenEintrag Komponente.
   *
   * @param {Einzelhaendler} EinzelhaendlerBO von dem EinzelhaendlerListenEintrag um gelöscht zu werde
   */
  benutzerDeleted = benutzer => {
    const newBenutzerList = this.state.benutzerliste.filter(benutzerFromState => benutzerFromState.getID() !== benutzer.getID());
    this.setState({
      benutzerliste: newBenutzerList,

      showEinzelhaendlerForm: false
    });
  }

  /** Behandelt das onClick Ereignis, der Einzelhaendler anlegen Taste. */
  addBenutzerButtonClicked = event => {
    // Nicht das erweiterte state umschalten
    event.stopPropagation();
    //Zeige den BenutzerForm
    this.setState({
      showBenutzerForm: true
    });
  }

  /** Behandelt das onClose Ereignis vom EinzelhaendlerForm */
  benutzerFormClosed = benutzer => {
    // Einzelhaendler ist nicht null und deshalb erstellt
    if (benutzer) {
      const newBenutzerList = [...this.state.benutzerliste, benutzer];
      this.setState({
        benutzerliste: newBenutzerList,

        showBenutzerForm: false
      });
    } else {
      this.setState({
        showBenutzerForm: false
      });
    }
  }





  /** Rendert die Komponente */
  render() {
    const { classes } = this.props;
    const {benutzerListe ,loadingInProgress, error, showEinzelhaendlerForm } = this.state;

    return (
      <div className={classes.root}>

          <Grid item>
            <Button variant='contained' color='primary' startIcon={<AddIcon />} onClick={this.addBenutzerButtonClicked}>
              Benutzer hinzufügen
          </Button>
          </Grid>



        <LoadingProgress show={loadingInProgress} />
        <ContextErrorMessage error={error} contextErrorMsg={`Die Liste der Einzelhändler konnte nicht geladen werden.`} onReload={this.getEinzelhaendler} />

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
BenutzerListe.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,
  /** @ignore */
  location: PropTypes.object.isRequired,
}

export default withRouter(withStyles(styles)(BenutzerListe));