import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles,Typography } from '@material-ui/core';
import { withRouter }  from 'react-router-dom';
import  API  from '../api/API';
import ContextErrorMessage from './dialogs/ContextErrorMessage';
import LoadingProgress from './dialogs/LoadingProgress';
import AlleEinkaufslistenAnwenderverbund from "./AlleEinkaufslistenAnwenderverbund";

/** Kontrolliert eine Liste von Anwenderverbünden und den darin enthaltenen Einkaufslisten */

class AlleEinkaufslisten extends Component{

    constructor(props) {
    super(props);

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
        this.setState({               // Setzt neues state wenn AnwendervebundBOs gefetcht wurden
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
          // Zeigt die Liste der Anwenderverrbunds Komponenten
          Anwenderverbuende.map(anwenderverbund =>
            <AlleEinkaufslistenAnwenderverbund key={anwenderverbund.getID()} anwenderverbund={anwenderverbund} userMail={this.props.userMail}
              onEinkaufslisteDeleted={this.EinkaufslisteDeleted}
            />)
        }
        <LoadingProgress show={loadingInProgress} />
        <ContextErrorMessage error={error} contextErrorMsg={`Einkaufslisten konnten nicht geladen werden.`} onReload={this.getAnwenderverbund} />
          <Typography className={classes.margins}>
              {!loadingInProgress?
                  Anwenderverbuende.length===0? "Legen sie einen Anwenderverbund an um Einkaufslisten zu erstellen"
                      :null
              :null
              }
          </Typography>
      </div>
    );
  }
}

/** Komponentenspezifisches Styling */
const styles = theme => ({
  root: {
    width: '100%',
    marginLeft: theme.spacing(2)
  },
    margins: {
    marginTop: theme.spacing(5),

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

