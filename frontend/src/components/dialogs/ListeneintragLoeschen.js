import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Button, IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import  API  from '../../api/API';
import ContextErrorMessage from './ContextErrorMessage';
import LoadingProgress from './LoadingProgress';

/**
 * Zeigt einen modalen löschen/abbrechen Dialog, der nach dem löschen eines Listeneintrags fragt. Um das ListeneintragBO
 * zu löschen muss er in prop Listeneintrag gegeben sein. In Abhängigkeit der Benutzerinteraktion (löschen/abbrechen)
 * wird jeweils der Backendaufruf gemacht. Danch wird die Funktion onClose prop mit dem ListeneintragBO löschen
 * Objekt als Parameter aufgerufen. Wenn der Dialog abgebrochen wird, wird onClose mit null aufgerufen.
 */

class ListeneintragLoeschen extends Component {

  constructor(props) {
    super(props);

    // Init state
    this.state = {
      deletingInProgress: false,
      deletingError: null
    };
  }

  /** Löschen des Listeneintrags */
  deleteListeneintrag = () => {
    API.getAPI().deleteListeneintragAPI(this.props.listeneintrag.getID()).then(listeneintrag => {
      this.setState({
        deletingInProgress: false,              // Ladeanzeige deaktivieren
        deletingError: null                     // Keine Error Nachricht
      });
      this.props.onClose(this.props.listeneintrag);  // Aufruf des Urhebers mit dem gelöschten Listeneintrag
    }).catch(e =>
      this.setState({
        deletingInProgress: false,              // Ladeanzeige deaktivieren
        deletingError: e                        // Zeigt Error Nachricht
      })
    );

    // Setzt laden auf true
    this.setState({
      deletingInProgress: true,                 // Ladeanzeige zeigen
      deletingError: null                       // Error deaktivieren
    });
  }

  /** Behandelt das schließen/abbrechen Tasten Klickereignis */
  handleClose = () => {
    // console.log(event);
    this.props.onClose(null);
  }

  /** Rendert die Komponente */
  render() {
    const { classes, artikel, listeneintrag, show } = this.props;
    const { deletingInProgress, deletingError } = this.state;
    return (
      show ?
        <Dialog open={show} onClose={this.handleClose}>
          <DialogTitle id='delete-dialog-title'>Delete listeneintrag
            <IconButton className={classes.closeButton} onClick={this.handleClose}>
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Wirklich den Listeneintrag '{artikel}' (ID: {listeneintrag.getID()}) löschen?
            </DialogContentText>
            <LoadingProgress show={deletingInProgress} />
            <ContextErrorMessage error={deletingError} contextErrorMsg={`Der Listeneintrag '${artikel}' (ID: ${listeneintrag.getID()}) konnte nicht gelöscht werden.`}
              onReload={this.deleteListeneintrag} />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color='secondary'>
              Abbrechen
            </Button>
            <Button variant='contained' onClick={this.deleteListeneintrag} color='primary'>
              Löschen
            </Button>
          </DialogActions>
        </Dialog>
        : null
    );
  }
}

/** Komponentenspezifische Styles */
const styles = theme => ({
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  }
});

/** PropTypes */
ListeneintragLoeschen.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,
  /** Um das ListeneintragBO zu löschen */
  listeneintrag: PropTypes.object.isRequired,
  /** Wenn true, wird der Dialog gerendert */
  show: PropTypes.bool.isRequired,
  /**
   * Handler Funktion, die aufgerufen wird, wenn der Dialog geschlossen wurde.
   * Sendet das gelöschte ListeneintragBO als Parameter oder null, wenn abbrechen gedrückt wurde.
   */
  onClose: PropTypes.func.isRequired,
}

export default withStyles(styles)(ListeneintragLoeschen);
