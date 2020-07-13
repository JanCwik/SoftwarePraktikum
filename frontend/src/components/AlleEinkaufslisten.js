import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Button, TextField, InputAdornment, IconButton, Grid, Typography } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import ClearIcon from '@material-ui/icons/Clear'
import {withRouter}  from 'react-router-dom';
import  API  from '../api/API';
import ContextErrorMessage from './dialogs/ContextErrorMessage';
import LoadingProgress from './dialogs/LoadingProgress';
import AlleEinkaufslistenAnwenderverbund from "./AlleEinkaufslistenAnwenderverbund";
import EinkaufslisteForm from "./dialogs/EinkaufslisteForm";
import ListeneintragBO from "../api/ListeneintragBO";
import EinkaufslisteBO from "../api/EinkaufslisteBO";


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
      Anwenderverbuende: [],
      error: null,
      loadingInProgress: false

    };
  }


  /** Fetchet alle AnwenderverbundBOs für das Backend */
  getAnwenderverbuende = () => {
    API.getAPI().getAnwenderverbuendeByBenutzerAPI(this.props.userMail)
      .then(anwenderverbundBOs =>
        this.setState({               // Setzt neues state wenn EinzelhaendlerBOs gefetcht wurden
          Anwenderverbuende: anwenderverbundBOs,
          loadingInProgress: false,   // Ladeanzeige deaktivieren
          error: null
        })).catch(e =>
          this.setState({             // Setzt state mit Error vom catch zurück
            Anwenderverbuende: [],
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

    this.getAnwenderverbuende();
  }







  /** Rendert die Komponente */
  render() {
    const { classes } = this.props;
    const { loadingInProgress, error,Anwenderverbuende } = this.state;

    return (
      <div className={classes.root}>

        {
          // Zeigt die Liste der Einkaufslisten-ListenEintrag Komponenten


          Anwenderverbuende.map(anwenderverbund =>
            <AlleEinkaufslistenAnwenderverbund key={anwenderverbund.getID()} anwenderverbund={anwenderverbund}
              onEinkaufslisteDeleted={this.EinkaufslisteDeleted}
            />)
        }
        <LoadingProgress show={loadingInProgress} />
        <ContextErrorMessage error={error} contextErrorMsg={`Anwenderverbünde konnten nicht geladen werden.`} onReload={this.getAnwenderverbund} />

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
AlleEinkaufslisten.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,
  /** @ignore */
  location: PropTypes.object.isRequired,
}

export default withRouter(withStyles(styles)(AlleEinkaufslisten));

