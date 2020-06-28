import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Button, TextField, InputAdornment, IconButton, Grid, Typography } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import ClearIcon from '@material-ui/icons/Clear'
import { withRouter } from 'react-router-dom';
import { API } from '../api';
import ContextErrorMessage from './dialogs/ContextErrorMessage';
import LoadingProgress from './dialogs/LoadingProgress';
import EinzelhaendlerForm from './dialogs/EinzelhaendlerForm';
import EinzelhaendlerListenEintrag from "./EinzelhaendlerListenEintrag";

/**
 * Controlls a list of CustomerListEntrys to create a accordion for each customer.
 *
 * @see See [CustomerListEntry](#customerlistentry)
 *
 * @author [Christoph Kunz](https://github.com/christophkunz)
 */
class Einzelhaendler extends Component {

  constructor(props) {
    super(props);

    // console.log(props);
    let expandedID = null;

    if (this.props.location.expandEinzelhaendler) {
      expandedID = this.props.location.expandEinzelhaendler.getID();
    }

    // Init an empty state
    this.state = {
      einzelhaendler: [],
      filteredEinzelhaendler: [],
      einzelhaendlerFilterStr: '',
      error: null,
      loadingInProgress: false,
      expandedEinzelhaendlerID: expandedID,
      showEinzelhaendlerForm: false
    };
  }

  /** Fetches all CustomerBOs from the backend */
  getEinzelhaendler = () => {
    API.getAPI().getEinzelhaendler()
      .then(einzelhaendlerBOs =>
        this.setState({               // Set new state when CustomerBOs have been fetched
          einzelhaendler: einzelhaendlerBOs,
          filteredEinzelhaendler: [...einzelhaendlerBOs], // store a copy
          loadingInProgress: false,   // disable loading indicator
          error: null
        })).catch(e =>
          this.setState({             // Reset state with error from catch
            einzelhaendler: [],
            loadingInProgress: false, // disable loading indicator
            error: e
          })
        );

    // set loading to true
    this.setState({
      loadingInProgress: true,
      error: null
    });
  }

  /** Lifecycle method, which is called when the component gets inserted into the browsers DOM */
  /*
  componentDidMount() {
    this.getEinzelhaendler();
  }
*/
  /**
   * Handles onExpandedStateChange events from the CustomerListEntry component. Toggels the expanded state of
   * the CustomerListEntry of the given CustomerBO.
   *
   * @param {customer} CustomerBO of the CustomerListEntry to be toggeled
   */
  onExpandedStateChange = einzelhaendler => {
    // console.log(einzelhaendlerID);
    // Set expandend customer entry to null by default
    let newID = null;

    // If same customer entry is clicked, collapse it else expand a new one
    if (einzelhaendler.getID() !== this.state.expandedEinzelhaendlerID) {
      // Expand the customer entry with customerID
      newID = einzelhaendler.getID();
    }
    // console.log(newID);
    this.setState({
      expandedEinzelhaendlerID: newID,
    });
  }

  //bbasc
  /**
   * Handles onCustomerDeleted events from the CustomerListEntry component
   *
   * @param {customer} CustomerBO of the CustomerListEntry to be deleted
   */
  einzelhaendlerDeleted = einzelhaendler => {
    const newEinzelhaendlerList = this.state.einzelhaendler.filter(einzelhaendlerFromState => einzelhaendlerFromState.getID() !== einzelhaendler.getID());
    this.setState({
      einzelhaendler: newEinzelhaendlerList,
      filteredEinzelhaendler: [...newEinzelhaendlerList],
      showEinzelhaendlerForm: false
    });
  }

  /** Handles the onClick event of the add customer button */
  addEinzelhaendlerButtonClicked = event => {
    // Do not toggle the expanded state
    event.stopPropagation();
    //Show the CustmerForm
    this.setState({
      showEinzelhaendlerForm: true
    });
  }

  /** Handles the onClose event of the CustomerForm */
  einzelhaendlerFormClosed = einzelhaendler => {
    // customer is not null and therefore created
    if (einzelhaendler) {
      const newEinzelhaendlerList = [...this.state.einzelhaendler, einzelhaendler];
      this.setState({
        einzelhaendler: newEinzelhaendlerList,
        filteredEinzelhaendler: [...newEinzelhaendlerList],
        showEinzelhaendlerForm: false
      });
    } else {
      this.setState({
        showEinzelhaendlerForm: false
      });
    }
  }

  /** Handels onChange events of the customer filter text field */
  filterFieldValueChange = event => {
    const value = event.target.value.toLowerCase();
    this.setState({
      filteredEinzelhaendler: this.state.einzelhaendler.filter(einzelhaendler => {
        let NameContainsValue = einzelhaendler.getName().toLowerCase().includes(value);
        return NameContainsValue;
      }),
      einzelhaendlerFilter: value
    });
  }

  /** Handles the onClose event of the clear filter button */
  clearFilterFieldButtonClicked = () => {
    // Reset the filter
    this.setState({
      filteredEinzelhaendler: [...this.state.einzelhaendler],
      einzelhaendlerFilter: ''
    });
  }

  /** Renders the component */
  render() {
    const { classes } = this.props;
    const { filteredEinzelhaendler, einzelhaendlerFilter, expandedEinzelhaendlerID, loadingInProgress, error, showEinzelhaendlerForm } = this.state;

    return (
      <div className={classes.root}>
        <Grid className={classes.einzelhaendlerFilter} container spacing={1} justify='flex-start' alignItems='center'>
          <Grid item>
            <Typography>
              Filter Einzelhändlerliste nach Name:
              </Typography>
          </Grid>
          <Grid item xs={4}>
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
          </Grid>
          <Grid item xs />
          <Grid item>
            <Button variant='contained' color='primary' startIcon={<AddIcon />} onClick={this.addEinzelhaendlerButtonClicked}>
              Add Einzelhaendler
          </Button>
          </Grid>
        </Grid>
        {
          // Show the list of CustomerListEntry components
          // Do not use strict comparison, since expandedCustomerID maybe a string if given from the URL parameters
          filteredEinzelhaendler.map(einzelhaendler =>
            <EinzelhaendlerListenEintrag key={einzelhaendler.getID()} einzelhaendler={einzelhaendler} expandedState={expandedEinzelhaendlerID === einzelhaendler.getID()}
              onExpandedStateChange={this.onExpandedStateChange}
              onEinzelhaendlerDeleted={this.einzelhaendlerDeleted}
            />)
        }
        <LoadingProgress show={loadingInProgress} />
        <ContextErrorMessage error={error} contextErrorMsg={`Die Liste der Einzelhändler konnte nicht geladen werden.`} onReload={this.getEinzelhaendler} />
        <EinzelhaendlerForm show={showEinzelhaendlerForm} onClose={this.einzelhaendlerFormClosed} />
      </div>
    );
  }
}

/** Component specific styles */
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
Einzelhaendler.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,
  /** @ignore */
  location: PropTypes.object.isRequired,
}

export default withRouter(withStyles(styles)(Einzelhaendler));