import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Button, TextField, InputAdornment, IconButton, Grid, Typography } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import ClearIcon from '@material-ui/icons/Clear'
import { withRouter } from 'react-router-dom';
import  API from "../api/API";
import ContextErrorMessage from './dialogs/ContextErrorMessage';
import LoadingProgress from './dialogs/LoadingProgress';
import StatistikListenEintrag from "./StatistikListenEintrag";

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
      zeitraumBisFilter: null

    };
  }

    /** Behandelt das onChange Ereignis von dem Einzelhaendler filtern Textfeld */
  einzelhaendlerFieldChange = event => {
    const value = event.target.value.toLowerCase();
    this.setState({
      filteredEinzelhaendler: this.state.einzelhaendler.filter(einzelhaendler => {
        let NameContainsValue = einzelhaendler.getName().toLowerCase().includes(value);
        return NameContainsValue;
      }),
      einzelhaendlerFilter: value
    });
  }

    /** Behandelt das onChange Ereignis von dem Einzelhaendler filtern Textfeld */
  vonFieldChange = event => {
    const value = event.target.value.toLowerCase();
    this.setState({
      filteredEinzelhaendler: this.state.einzelhaendler.filter(einzelhaendler => {
        let NameContainsValue = einzelhaendler.getName().toLowerCase().includes(value);
        return NameContainsValue;
      }),
      zeitraumVonFilter: value
    });
  }

    /** Behandelt das onChange Ereignis von dem Einzelhaendler filtern Textfeld */
  bisFieldChange = event => {
    const value = event.target.value.toLowerCase();
    this.setState({
      filteredEinzelhaendler: this.state.einzelhaendler.filter(einzelhaendler => {
        let NameContainsValue = einzelhaendler.getName().toLowerCase().includes(value);
        return NameContainsValue;
      }),
      zeitraumBisFilter: value
    });
  }


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
              onChange={this.einzelhaendlerFieldChange}
              InputProps={{
                endAdornment: <InputAdornment position='end'>
                  <IconButton onClick={this.clearFilterFieldButtonClicked}>
                    <ClearIcon />
                  </IconButton>
                </InputAdornment>,
              }}
            />
          </Grid>
          <Grid item xs={4} />
          <Grid item>
            <Typography>
              Von:
            </Typography>
            <TextField
              autoFocus
              fullWidth
              id='zeitraumBis'
              type='text'
              value={zeitraumVonFilter}
              onChange={this.vonFieldChange}
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
            <Typography>
              Bis:
            </Typography>
            <TextField
              autoFocus
              fullWidth
              id='zeitraumBis'
              type='text'
              value={zeitraumBisFilter}
              onChange={this.bisFieldChange}
              InputProps={{
                endAdornment: <InputAdornment position='end'>
                  <IconButton onClick={this.clearFilterFieldButtonClicked}>
                    <ClearIcon />
                  </IconButton>
                </InputAdornment>,
              }}
            />
          </Grid>
          </Grid>
        {
          /** Zeigt die Liste der EinzelhaendlerListenEintrag Komponenten*/
          listeneintraege.map(listeneintrag =>
            <StatistikListenEintrag listeneintrag = {listeneintrag} key={listeneintrag.getID()}

           />)
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
  },

});

/** PropTypes */
Statistik.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,
  /** @ignore */
  location: PropTypes.object.isRequired,
}

export default withStyles(styles)(Statistik);