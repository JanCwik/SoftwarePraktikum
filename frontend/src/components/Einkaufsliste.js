import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Button, TextField, InputAdornment, IconButton, Grid, Typography,Link} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import ClearIcon from '@material-ui/icons/Clear'
import { withRouter } from 'react-router-dom';
import  API from "../api/API";
import { Link as RouterLink } from 'react-router-dom';
import ContextErrorMessage from './dialogs/ContextErrorMessage';
import LoadingProgress from './dialogs/LoadingProgress';
import ListeneintragForm from "./dialogs/ListeneintragForm";
import ListenEintrag from "./ListenEintrag";
import ArtikelForm from "./dialogs/ArtikelForm";

/**
 * Kontrolliert eine Liste von EinzelhaendlerListenEintraegen um ein Akkordeon für jeden
 * Einzelhaendler zu erstellen.
 */
class Einkaufsliste extends Component {

  constructor(props) {
    super(props);

    // console.log(props);


    // Init ein leeres state
    this.state = {
      listeneintraege: [],
      error: null,
      loadingInProgress: false,
      showListeneintragForm: false
    };
  }

  /** Fetchet alle EinzelhaendlerBOs für das Backend */
  getListeneintraege = () => {
 const { einkaufsliste } = this.props.location

    API.getAPI().getListeneintraegeByEinkaufslisteAPI(einkaufsliste.getID())
      .then(ListeneintragBOs =>

       this.setState({               // Setzt neues state wenn EinzelhaendlerBOs gefetcht wurden
          listeneintraege: ListeneintragBOs,

          loadingInProgress: false,   // Ladeanzeige deaktivieren
          error: null
        })).catch(e =>
          this.setState({             // Setzt state mit Error vom catch zurück
            listeneintraege: [],
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
    this.getListeneintraege();
  }




  /**
   * Behandelt einzelhaendlerDeleted Ereignisse von der EinzelhaendlerListenEintrag Komponente.
   *
   * @param {Einzelhaendler} EinzelhaendlerBO von dem EinzelhaendlerListenEintrag um gelöscht zu werde
   */
  listeneintragDeleted = listeneintrag => {
    const newListeneintragList = this.state.listeneintraege.filter(listeneintragFromState => listeneintragFromState.getID() !== listeneintrag.getID());
    this.setState({
      listeneintraege: newListeneintragList,
      showListeneintragForm: false
    });
  }

  /** Behandelt das onClick Ereignis, der Einzelhaendler anlegen Taste. */

  addListeneintragButtonClicked = event => {
    // Nicht das erweiterte state umschalten
    event.stopPropagation();
    //Zeige den EinzelhaendlerForm
    this.setState({
      showListeneintragForm: true
    });
  }


  /** Behandelt das onClose Ereignis vom EinzelhaendlerForm */

  listeneintragFormClosed = listeneintrag => {
    // Einzelhaendler ist nicht null und deshalb erstellt
    if (listeneintrag) {
      const newListeneintragList = [...this.state.listeneintraege, listeneintrag];
      this.setState({
        listeneintraege: newListeneintragList,
        filteredListeneintraege: [...newListeneintragList],
        showListeneintragForm: false
      });
    } else {
      this.setState({
        showListeneintragForm: false
      });
    }
  }

  /** Behandelt das onChange Ereignis von dem Einzelhaendler filtern Textfeld */


  /** Rendert die Komponente */
  render() {
    const { classes } = this.props;
    const { listeneintraege, ListeneintraegeFilter, loadingInProgress, error, showListeneintragForm } = this.state;

    return (
      <div className={classes.root}>

          <Grid item>
            <Button variant='contained' color='primary' startIcon={<AddIcon />} onClick={this.addListeneintragButtonClicked}>
                Listeneintrag hinzufügen
          </Button>
          </Grid>

        {
          /** Zeigt die Liste der EinzelhaendlerListenEintrag Komponenten
         */

          listeneintraege.map(listeneintrag =>
            <ListenEintrag key={listeneintrag.getID()} listeneintrag={listeneintrag}
              onListeneintragDeleted={this.listeneintragDeleted}
            />)
        }
        <LoadingProgress show={loadingInProgress} />
        <ContextErrorMessage error={error} contextErrorMsg={`Die Liste der Einzelhändler konnte nicht geladen werden.`} onReload={this.getEinzelhaendler} />
        <ListeneintragForm show={showListeneintragForm} onClose={this.listeneintragFormClosed} />
      </div>
    );
  }
}

/** Komponentenspezifisches Styling */
const styles = theme => ({
  root: {
    width: '100%',
  },

});

/** PropTypes */
Einkaufsliste.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,
  /** @ignore */
  location: PropTypes.object.isRequired,
}

export default withRouter(withStyles(styles)(Einkaufsliste));