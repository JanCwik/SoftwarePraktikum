import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, ListItem } from '@material-ui/core';
import { Button, List } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import  API  from '../api/API';
import ContextErrorMessage from './dialogs/ContextErrorMessage';
import LoadingProgress from './dialogs/LoadingProgress';


/**
 * Renders a list of AccountListEntry objects.
 *
 * @see See [AccountListEntry](#accountlistentry)
 *
 * @author [Christoph Kunz](https://github.com/christophkunz)
 */
class Einkaufslisten extends Component {

  constructor(props) {
    super(props);

    // Init the state
    this.state = {
      einkaufslisten: [],
      loadingInProgress: false,
      loadingEinkaufslistenError: null,
      addingEinkaufslistenError: null,
    };
  }

  /** Fetches AccountBOs for the current customer */
  getEinkaufslisten = () => {
    API.getAPI().getEinkaufslistenForAnwenderverbund(this.props.anwenderverbund.getID()).then(einkaufslisteBOs =>
      this.setState({  // Set new state when AccountBOs have been fetched
        einkaufslisten: einkaufslisteBOs,
        loadingInProgress: false, // loading indicator
        loadingEinkaufslistenError: null
      })).catch(e =>
        this.setState({ // Reset state with error from catch
          accounts: [],
          loadingInProgress: false,
          loadingEinkaufslistenError: e
        })
      );

    // set loading to true
    this.setState({
      loadingInProgress: true,
      loadingEinkaufslistenError: null
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
    API.getAPI().addEinkaufslisteForCustomer(this.props.anwenderverbund.getID()).then(einkaufslisteBO => {
      // console.log(accountBO)
      this.setState({  // Set new state when AccountBOs have been fetched
        einkaufslisten: [...this.state.einkaufslisten, einkaufslisteBO],
        loadingInProgress: false, // loading indicator
        addingEinkaufslisteError: null
      })
    }).catch(e =>
      this.setState({ // Reset state with error from catch
        accounts: [],
        loadingInProgress: false,
        addingEinkaufslisteError: e
      })
    );

    // set loading to true
    this.setState({
      loadingInProgress: true,
      addingEInkaufslisteError: null
    });
  }

  /** Handles onAccountDelete events from an AccountListEntry  */
  deleteEinkaufslisteHandler = (deletedEinkaufsliste) => {
    // console.log(deletedAccount.getID());
    this.setState({
      einkaufslisten: this.state.einkaufslisten.filter(einkaufsliste => einkaufsliste.getID() !== deletedEinkaufsliste.getID())
    })
  }

  /** Renders the component */
  render() {
    const { classes, anwenderverbund } = this.props;
    // Use the states customer
    const { einkaufslisten, loadingInProgress, loadingAccountError, addingAccountError } = this.state;

    // console.log(this.props);
    return (
      <div className={classes.root}>
        <List className={classes.accountList}>
          {
            einkaufslisten.map(einkaufslisten => <einzelneEinkaufsListe key={einkaufslisten.getID()} anwenderverbund={anwenderverbund} einkaufslisten={einkaufslisten} onEinkaufslisteDeleted={this.deleteEinkaufslisteHandler}
              show={this.props.show} />)
          }
          <ListItem>
            <LoadingProgress show={loadingInProgress} />
            <ContextErrorMessage error={loadingAccountError} contextErrorMsg={`Einkaufslisten für den Verbund ${anwenderverbund.getID()} konnte nicht geladen werden`} onReload={this.getEinkaufslisten} />
            <ContextErrorMessage error={addingAccountError} contextErrorMsg={`EInkaufslisten ${einkaufslisten.getID()} konnte nicht hinzugefügt werden.`} onReload={this.addEinkaufsliste} />
          </ListItem>
        </List>
        <Button className={classes.addEinkaufslisteButton} variant='contained' color='primary' startIcon={<AddIcon />} onClick={this.addEinkaufsliste}>
          Einkaufsliste hinzufügen
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
  accountList: {
    marginBottom: theme.spacing(2),
  },
  addEinkaufslisteButton: {
    position: 'absolute',
    right: theme.spacing(3),
    bottom: theme.spacing(1),
  }
});

/** PropTypes */
Einkaufslisten.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,
  /** The CustomerBO of this AccountList */
  anwenderverbund: PropTypes.object.isRequired,
  /** If true, accounts are (re)loaded */
  show: PropTypes.bool.isRequired
}

export default withStyles(styles)(Einkaufslisten);
