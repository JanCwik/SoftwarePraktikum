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
 * Kontrolliert eine Liste von EinzelhaendlerListenEintraegen um ein ExpansionPanel für jeden
 * Einzelhaendler zu erstellen.
 */
class Statistik extends Component {

  constructor(props) {
    super(props);

    // Init ein leeres state
    this.state = {
      listeneintraege: [],
        error: null,
      loadingInProgress: false,

    };
  }
/*
  /** Fetchet alle EinzelhaendlerBOs für das Backend
  getEinzelhaendler = () => {
    API.getAPI().getEinzelhaendlerAPI()
      .then(einzelhaendlerBOs =>
        this.setState({               // Setzt neues state wenn EinzelhaendlerBOs gefetcht wurden
          einzelhaendler: einzelhaendlerBOs,
          filteredEinzelhaendler: [...einzelhaendlerBOs], // Speichert eine Kopie
          loadingInProgress: false,   // Ladeanzeige deaktivieren
          error: null
        })).catch(e =>
          this.setState({       // Setzt state mit Error vom catch zurück
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
*/
  /** Lebenszyklus Methode, welche aufgerufen wird, wenn die Komponente in das DOM des Browsers eingefügt wird.*/
/*
  componentDidMount() {
    this.getEinzelhaendler();
  }

  /**
   * Behandelt einzelhaendlerDeleted Ereignisse von der EinzelhaendlerListenEintrag Komponente.
   * @param {Einzelhaendler} EinzelhaendlerBO von dem EinzelhaendlerListenEintrag um gelöscht zu werden.
   */






  /** Rendert die Komponente */
  render() {
    const { classes } = this.props;
    const {  einzelhaendlerFilter,zeitraumBisFilter,zeitraumVonFilter, loadingInProgress, error,listeneintraege} = this.state;

    return (
      <div className={classes.root}>
        <Grid className={classes.einzelhaendlerFilter} container spacing={1} justify='flex-start' alignItems='center'>
          <Grid item>
            <Typography>
              Filter nach Einzelhändler:
              </Typography>
          </Grid>
          <Grid item xs={2}>
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
            <Grid item xs={2}>
            <Typography>
              Von:
              </Typography>
            <TextField
              autoFocus
              fullWidth
              id='zeitraumVon'
              type='text'
              value={zeitraumVonFilter}
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
            <Typography>
              Bis:
              </Typography>
            <TextField
              autoFocus
              fullWidth
              id='zeitraumBis'
              type='text'
              value={zeitraumBisFilter}
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

          </Grid>
        </Grid>
        {
          /** Zeigt die Liste der EinzelhaendlerListenEintrag Komponenten*/
          //listeneintraege.map(einzelhaendler =>
            //<StatistikListenEintrag key={einzelhaendler.getID()}

           // />)
        }
        <LoadingProgress show={loadingInProgress} />
        <ContextErrorMessage error={error} contextErrorMsg={`Die Liste der Listeneintraege konnte nicht geladen werden.`} onReload={this.getEinzelhaendler} />

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
Statistik.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,
  /** @ignore */
  location: PropTypes.object.isRequired,
}

export default withRouter(withStyles(styles)(Statistik));