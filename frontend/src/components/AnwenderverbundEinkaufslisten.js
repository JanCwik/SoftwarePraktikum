import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, ListItem } from '@material-ui/core';
import { Button, List } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { API } from '../api';
import ContextErrorMessage from './dialogs/ContextErrorMessage';
import LoadingProgress from './dialogs/LoadingProgress';
import AccountListEntry from './AccountListEntry';

/**
 * Renders a list of AccountListEntry objects.
 *
 * @see See [AccountListEntry](#accountlistentry)
 *
 * @author [Christoph Kunz](https://github.com/christophkunz)
 */
class AnwenderverbundEinkaufslisten extends Component {

  constructor(props) {
    super(props);

    // Init the state
    this.state = {
      einkaufslisten: [],
      loadingInProgress: false,
      loadingAccountError: null,
      addingAccountError: null,
    };
  }

  /** Fetches AccountBOs for the current customer */
  getEinkaufslisten= () => {
    API.getAPI().getEinkaufslistenForAnwenderverbund(this.props.anwenderverbund.getID()).then(einkaufslisteBOs =>
      this.setState({  // Set new state when AccountBOs have been fetched
        einkaufslisten: einkaufslisteBOs,
        loadingInProgress: false, // loading indicator
        loadingAccountError: null
      })).catch(e =>
        this.setState({ // Reset state with error from catch
          einkaufslisten: [],
          loadingInProgress: false,
          loadingAccountError: e
        })
      );

    // set loading to true
    this.setState({
      loadingInProgress: true,
      loadingAccountError: null
    });
  }

  /** Lifecycle method, which is called when the component gets inserted into the browsers DOM */
  componentDidMount() {
    this.getEinkaufslisten();
  }

  /** Lifecycle method, which is called when the component was updated */
  componentDidUpdate(prevProps) {
    // reload accounts if shown state changed. Occures if the CustomerListEntrys ExpansionPanel was expanded
    // if ((this.props.show !== prevProps.show)) {
    //   this.getAccounts();
    // }
  }

  /** Adds an account for the current customer */
  addEinkaufsliste = () => {
    API.getAPI().addEinkaufslisteForAnwenderverbund(this.props.anwenderverbund.getID()).then(einkaufslisteBO => {
      // console.log(accountBO)
      this.setState({  // Set new state when AccountBOs have been fetched
        einkaufslisten: [...this.state.einkaufslisten, einkaufslisteBO],
        loadingInProgress: false, // loading indicator
        addingAccountError: null
      })
    }).catch(e =>
      this.setState({ // Reset state with error from catch
        einkaufslisten: [],
        loadingInProgress: false,
        addingAccountError: e
      })
    );

    // set loading to true
    this.setState({
      loadingInProgress: true,
      addingAccountError: null
    });
  }

  /** Handles onAccountDelete events from an AccountListEntry  */
  deleteAccountHandler = (deletedAccount) => {
    // console.log(deletedAccount.getID());
    this.setState({
      accounts: this.state.accounts.filter(account => account.getID() !== deletedAccount.getID())
    })
  }

  /** Renders the component */
  render() {
    const { classes, anwenderverbund } = this.props;
    // Use the states customer
    const { einkaufslisten, loadingInProgress, loadingEinkaufslisteError, addingEinkaufslisteError } = this.state;

    // console.log(this.props);
    return (
      <div className={classes.root}>
        <List className={classes.einkaufslistenList}>
          {
            einkaufslisten.map(einkaufsliste => <EinkaufslistenListEntry key={einkaufsliste.getID()} anwenderverbund={anwenderverbund} einkaufsliste={einkaufsliste} onEinkaufslisteDeleted={this.deleteEinkaufslisteHandler}
              show={this.props.show} />)
          }
          <ListItem>
            <LoadingProgress show={loadingInProgress} />
            <ContextErrorMessage error={loadingEinkaufslisteErrorError} contextErrorMsg={`List of accounts for customer ${anwenderverbund.getID()} could not be loaded.`} onReload={this.getEinkaufslisten} />
            <ContextErrorMessage error={addingEinkaufslisteErrorError} contextErrorMsg={`Account for customer ${anwenderverbund.getID()} could not be added.`} onReload={this.addEinkaufsliste} />
          </ListItem>
        </List>
        <Button className={classes.addEinkaufslisteButton} variant='contained' color='primary' startIcon={<AddIcon />} onClick={this.addEinkaufsliste}>
          Add Einkaufsliste
        </Button>
      </div>
    );
  }
}

/** Component specific styles */
const styles = theme => ({
  root: {
    width: '100%',
  },
  einkaufslistenList: {
    marginBottom: theme.spacing(2),
  },
  addEinkaufslisteButton: {
    position: 'absolute',
    right: theme.spacing(3),
    bottom: theme.spacing(1),
  }
});

/** PropTypes */
AnwenderverbundEinkaufslisten.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,
  /** The CustomerBO of this AccountList */
  anwenderverbund: PropTypes.object.isRequired,
  /** If true, accounts are (re)loaded */
  show: PropTypes.bool.isRequired
}

export default withStyles(styles)(AnwenderverbundEinkaufslisten);
