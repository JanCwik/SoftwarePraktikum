import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Typography, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Grid } from '@material-ui/core';
import { Button, ButtonGroup } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import EinzelhaendlerForm from './dialogs/EinzelhaendlerForm';
import EinzelhaendlerLoeschen from "./dialogs/EinzelhaendlerLoeschen";



/**
 * Renders a CustomerBO object within a expandable/collapsible CustomerListEntry with the customer manipulation
 * functions. If expanded, it renders a AccountList.
 *
 * @see See [AccountList](#accountlist)
 *
 * @author [Christoph Kunz](https://github.com/christophkunz)
 */
class EinzelhaendlerListEntry extends Component {

  constructor(props) {
    super(props);

    // Init the state
    this.state = {
      einzelhaendler: props.einzelhaendler,
      showEinzelhaendlerForm: false,
      showEinzelhaendlerDeleteDialog: false,
    };
  }

  /** Handles onChange events of the underlying ExpansionPanel */
  expansionPanelStateChanged = () => {
    this.props.onExpandedStateChange(this.props.einzelhaendler);
  }


  /** Handles the onClick event of the edit customer button */
  editEinzelhaendlerButtonClicked = (event) => {
    event.stopPropagation();
    this.setState({
      showEinzelhaendlerForm: true
    });
  }

  /** Handles the onClose event of the CustomerForm */
  einzelhaendlerFormClosed = (einzelhaendler) => {
    // customer is not null and therefor changed
    if (einzelhaendler) {
      this.setState({
        einzelhaendler: einzelhaendler,
        showEinzelhaendlerForm: false
      });
    } else {
      this.setState({
        showEinzelhaendlerForm: false
      });
    }
  }

  /** Handles the onClick event of the delete customer button */
  deleteEinzelhaendlerButtonClicked = (event) => {
    event.stopPropagation();
    this.setState({
      showEinzelhaendlerDeleteDialog: true
    });
  }

  /** Handles the onClose event of the CustomerDeleteDialog */
  deleteEinzelhaendlerDialogClosed = (einzelhaendler) => {
    // if customer is not null, delete it
    if (einzelhaendler) {
      this.props.onEinzelhaendlerDeleted(einzelhaendler);
    };

    // Don´t show the dialog
    this.setState({
      showEinzelhaendlereDeleteDialog: false
    });
  }

  /** Renders the component */
  render() {
    const { classes, expandedState } = this.props;
    // Use the states customer
    const { einzelhaendler, showEinzelhaendlerForm, showEinzelhaendlerDeleteDialog } = this.state;

    // console.log(this.state);
    return (
      <div>
        <ExpansionPanel defaultExpanded={false} expanded={expandedState} onChange={this.expansionPanelStateChanged}>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            id={`einzelhaendler${einzelhaendler.getID()}accountpanel-header`}
          >
            <Grid container spacing={1} justify='flex-start' alignItems='center'>
              <Grid item>
                <Typography variant='body1' className={classes.heading}>{einzelhaendler.getName()}}
                </Typography>
              </Grid>
              <Grid item>
                <ButtonGroup variant='text' size='small'>
                  <Button color='primary' onClick={this.editEinzelhaendlerButtonClicked}>
                    edit
                  </Button>
                  <Button color='secondary' onClick={this.deleteEinzelhaendlerButtonClicked}>
                    delete
                  </Button>
                </ButtonGroup>
              </Grid>
              <Grid item xs />
            </Grid>
          </ExpansionPanelSummary>
        </ExpansionPanel>
        <EinzelhaendlerForm show={showEinzelhaendlerForm} einzelhaendler={einzelhaendler} onClose={this.einzelhaendlerFormClosed} />
        <EinzelhaendlerLoeschen show={showEinzelhaendlerDeleteDialog} einzelhaendler={einzelhaendler} onClose={this.deleteEinzelhaendlerDialogClosed} />
      </div>
    );
  }
}

/** Component specific styles */
const styles = theme => ({
  root: {
    width: '100%',
  }
});

/** PropTypes */
EinzelhaendlerListEntry.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,
  /** The CustomerBO to be rendered */
  einzelhaendler: PropTypes.object.isRequired,
  /** The state of this CustomerListEntry. If true the customer is shown with its accounts */
  expandedState: PropTypes.bool.isRequired,
  /** The handler responsible for handle expanded state changes (exanding/collapsing) of this CustomerListEntry
   *
   * Signature: onExpandedStateChange(CustomerBO customer)
   */
  onExpandedStateChange: PropTypes.func.isRequired,
  /**
   *  Event Handler function which is called after a sucessfull delete of this customer.
   *
   * Signature: onCustomerDelete(CustomerBO customer)
   */
  onEinzelhaendlerDeleted: PropTypes.func.isRequired
}

export default withStyles(styles)(EinzelhaendlerListEntry);
