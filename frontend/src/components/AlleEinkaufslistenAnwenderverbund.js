import React, { Component } from 'react';
import AlleEinkaufslistenListenEintrag from "./AlleEinkaufslistenListenEintrag";
import API from "../api/API";
import {Button, Grid, withStyles} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import LoadingProgress from "./dialogs/LoadingProgress";
import ContextErrorMessage from "./dialogs/ContextErrorMessage";
import EinkaufslisteForm from "./dialogs/EinkaufslisteForm";
import PropTypes from "prop-types";

class AlleEinkaufslistenAnwenderverbund extends Component{

     constructor(props) {
         super(props);
         this.state={
             showEinkaufslistenForm: false,
             einkaufslisten:[],
             error: null,
             loadingInProgress: false
         }
     }

    getEinkaufslisten = () => {
    API.getAPI().getEinkaufslistenByAnwenderverbundAPI(this.props.anwenderverbund.getID())
      .then(EinkaufslistenBOs =>
        this.setState({               // Setzt neues state wenn EinkaufslistenBOs gefetcht wurden
          einkaufslisten: EinkaufslistenBOs,
          loadingInProgress: false,   // Ladeanzeige deaktivieren
          error: null
        })).catch(e =>
          this.setState({             // Setzt state mit Error vom catch zurück
            einkaufslisten: [],
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

  componentDidMount() {
    this.getEinkaufslisten();
  }
   /**
   * Behandelt EinkaufslisteDeleted Ereignisse von der Einkaufsliste-ListenEintrag Komponente.
   * @param einkaufsliste
   * EinkaufslisteBO von dem Einkaufsliste-ListenEintrag um gelöscht zu werde
   */
  einkaufslisteDeleted = einkaufsliste => {
    const newEinkaufslisteList = this.state.einkaufslisten.filter(EinkaufslisteFromState => EinkaufslisteFromState.getID() !== einkaufsliste.getID());
    this.setState({
      einkaufslisten: newEinkaufslisteList,
      showEinkaufslisteForm: false
    });
  }

  //Behandelt das onClick Ereignis, der Einkaufsliste anlegen Taste.
  addEinkaufslisteButtonClicked = event => {
    // Nicht das erweiterte state umschalten
    event.stopPropagation();
    //Zeige den EinkaufslisteForm
    this.setState({
      showEinkaufslisteForm: true
    });
  }

  // Behandelt das onClose Ereignis vom EinkaufslisteForm
  einkaufslisteFormClosed = Einkaufsliste => {
    // Einkaufsliste ist nicht null und deshalb erstellt
    if (Einkaufsliste) {
      const newEinkaufslisteList = [...this.state.einkaufslisten, Einkaufsliste];
      this.setState({
        einkaufslisten: newEinkaufslisteList,
        showEinkaufslisteForm: false
      });
    } else {
      this.setState({
        showEinkaufslisteForm: false
      });
    }
  }

render(){
    const { classes,anwenderverbund } = this.props;
      const{showEinkaufslisteForm ,einkaufslisten, error, loadingInProgress} = this.state;
    return(
        <div className={classes.root}>
            <Grid  container spacing={1} justify='flex-start' alignItems='center'>
                  <Grid item>
                      <h2>
                          {anwenderverbund.getName()}
                      </h2>
                  </Grid>
                <Grid item xs />
                <Grid item>
                <Button variant='contained' color='primary' startIcon={<AddIcon />} onClick={this.addEinkaufslisteButtonClicked}>
                  Einkaufsliste zu {anwenderverbund.getName()} hinzufügen
                </Button>
                </Grid>
            </Grid>
            {
              // Zeigt die Liste der Einkaufslisten-ListenEintrag Komponenten
              einkaufslisten.map(einkaufsliste =>
                <AlleEinkaufslistenListenEintrag key={einkaufsliste.getID()} einkaufsliste={einkaufsliste}
                  onEinkaufslisteDeleted={this.einkaufslisteDeleted}
                />)
            }
            <LoadingProgress show={loadingInProgress} />
            <ContextErrorMessage error={error} contextErrorMsg={`Einkaufslisten konnten nicht geladen werden.`} onReload={this.getEinkaufslisten} />
            <EinkaufslisteForm show={showEinkaufslisteForm} anwenderverbund={anwenderverbund} onClose={this.einkaufslisteFormClosed} />
        </div>
    )
  }
}
/** Komponentenspezifisches Styling */
const styles = theme => ({
  root: {
    width: '100%',
  },
});

/** PropTypes */
AlleEinkaufslistenAnwenderverbund.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,
  /** @ignore */
  location: PropTypes.object.isRequired,

  anwenderverbund: PropTypes.object.isRequired,
}

export default withStyles(styles)(AlleEinkaufslistenAnwenderverbund)