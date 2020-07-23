import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {withStyles, Button, Grid} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { withRouter } from 'react-router-dom';
import  API from "../api/API";
import ContextErrorMessage from './dialogs/ContextErrorMessage';
import LoadingProgress from './dialogs/LoadingProgress';
import ListeneintragForm from "./dialogs/ListeneintragForm";
import ListenEintrag from "./ListenEintrag";

/** Kontrolliert eine Liste von Liste von Listeneinträgen */

class Einkaufsliste extends Component {

  constructor(props) {
    super(props);

    // Init ein leeres state
    this.state = {
      listeneintraege: [],
      error: null,
      loadingInProgress: false,
      showListeneintragForm: false,
      artikel: props.artikel,
    };
  }

  /** Fetchet alle ListeneinträgeBOs für das Backend */
  getListeneintraege = () => {

    API.getAPI().getListeneintraegeByEinkaufslisteAPI(this.props.location.einkaufsliste.getID())
      .then(ListeneintragBOs =>
       this.setState({                  // Setzt neues state wenn ListeneintragsBOs gefetcht wurden
          listeneintraege: ListeneintragBOs,
          loadingInProgress: false,           // Ladeanzeige deaktivieren
          error: null
        })).catch(e =>
          this.setState({               // Setzt state mit Error vom catch zurück
            listeneintraege: [],
            loadingInProgress: false,         // Ladeanzeige deaktivieren
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

  reload=()=>{
      this.getListeneintraege();

  }

  /**
   * Behandelt listeneintragDeleted Ereignisse von der ListenEintrag Komponente.
   * @param {Listeneintrag} ListeneintragBO von dem ListenEintrag um gelöscht zu werde
   */
  listeneintragDeleted = listeneintrag => {
    const newListeneintragList = this.state.listeneintraege.filter(listeneintragFromState => listeneintragFromState.getID() !== listeneintrag.getID());
    this.setState({
      listeneintraege: newListeneintragList,
      showListeneintragForm: false
    });
  }

  /** Behandelt das onClick Ereignis, der Listeneintrag anlegen Taste. */
  addListeneintragButtonClicked = event => {
    // Nicht das erweiterte state umschalten
    event.stopPropagation();
    //Zeige den ListeneintragForm
    this.setState({
      showListeneintragForm: true
    });
  }

  /** Behandelt das onClose Ereignis vom ListeneintragForm */
  listeneintragFormClosed = listeneintrag => {
    // Listeneintrag ist nicht null und deshalb erstellt
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

  /** Rendert die Komponente */
  render() {
    const { classes} = this.props;
    const { listeneintraege, loadingInProgress, error, showListeneintragForm } = this.state;
    return (
      <div className={classes.root}>
          <Grid container spacing={1} justify='flex-start' alignItems='center' >
                <Grid item >
                     <h2>
                        {this.props.location.einkaufsliste.getName()}
                    </h2>
                </Grid>
              <Grid item xs />
              <Grid item>
            <Button  variant='contained' color='primary' startIcon={<AddIcon />} onClick={this.addListeneintragButtonClicked}>
                Listeneintrag hinzufügen
          </Button>
              </Grid>
          </Grid>
        {
          /** Zeigt die Liste der ListenEintrag Komponenten */
          listeneintraege.map(listeneintrag =>
            <ListenEintrag key={listeneintrag.getID()} listeneintrag={listeneintrag} einkaufsliste={this.props.location.einkaufsliste} reload={this.reload}
              onListeneintragDeleted={this.listeneintragDeleted}
            />)
        }
        <LoadingProgress show={loadingInProgress} />
        <ContextErrorMessage error={error} contextErrorMsg={`Die Einkaufsliste konnte nicht geladen werden.`} onReload={this.getListeneintraege} />
        <ListeneintragForm reload={this.reload}  show={showListeneintragForm} onClose={this.listeneintragFormClosed} einkaufsliste={this.props.location.einkaufsliste}/>
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