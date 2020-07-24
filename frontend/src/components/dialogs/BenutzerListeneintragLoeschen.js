import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Button, IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import  API from '../../api/API';
import ContextErrorMessage from './ContextErrorMessage';
import LoadingProgress from './LoadingProgress';

/**
 * Zeigt einen modalen löschen/abbrechen Dialog, der nach dem entfernen eines Benutzers
 * aus dem Anwenderverbund fragt. In Abhängigkeit der Benutzerinteraktion (loeschen/abbrechen)
 * wird jeweils der Backendaufruf gemacht. Wenn der Dialog abgebrochen wird, wird onClose mit null aufgerufen.
 */

class BenutzerListeneintragLoeschen extends Component {

  constructor(props) {
    super(props);

    // Init state
    this.state = {
      deletingInProgress: false,
      deletingError: null
    };
  }

  /** Entfernen des Benutzers aus dem Anwenderverbund */
  deleteBenutzer = () => {
    API.getAPI().deleteMitgliedschaftAPI(this.props.anwenderverbund.getID(), this.props.benutzer)

      this.setState({
        deletingInProgress: false,              // Ladeanzeige deaktivieren
        deletingError: null                     // Keine Error Nachricht
      });

      this.props.onClose(this.props.benutzer);  // Aufruf des Urhebers mit dem geloeschten Einzelhaendler


    // Setzt laden auf true
    this.setState({
      deletingInProgress: true,                 // Ladeanzeige zeigen
      deletingError: null                       // Error deaktivieren
    });
  }

  /** Behandelt das schließen/abbrechen Tasten Klickereignis */
  handleClose = () => {
    this.props.onClose(null);
  }

  /** Rendert die Komponente */
  render() {
    const { classes, benutzer, show } = this.props;
    const { deletingInProgress, deletingError } = this.state;

    return (
      show ?
        <Dialog open={show} onClose={this.handleClose}>
          <DialogTitle id='delete-dialog-title'>Benutzer löschen
            <IconButton className={classes.closeButton} onClick={this.handleClose}>
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Benutzer wirklich löschen? '{benutzer.getName()}' (ID: {benutzer.getID()})?
            </DialogContentText>
            <LoadingProgress show={deletingInProgress} />
            <ContextErrorMessage error={deletingError} contextErrorMsg={`Der Benutzer '${benutzer.getName()}' (ID: ${benutzer.getID()}) konnte nicht gelöscht werden.`}
              onReload={this.deleteBenutzer} />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color='secondary'>
              Abbrechen
            </Button>
            <Button variant='contained' onClick={this.deleteBenutzer} color='primary'>
              Löschen
            </Button>
          </DialogActions>
        </Dialog>
        : null
    );
  }
}

/** Komponentenspezifische Stile */
const styles = theme => ({
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  }
});

/** PropTypes */
BenutzerListeneintragLoeschen.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,
  /** Um das BenutzerBO zu loeschen */
  benutzerlisteneintrag: PropTypes.object.isRequired,
  /** Wenn true, wird der Dialog gerendert */
  show: PropTypes.bool.isRequired,
  /**
   * Handler Funktion, die aufgerufen wird, wenn der Dialog geschlossen wurde.
   * Sendet das gelöschte BenutzerBO als Parameter oder null, wenn abbrechen gedrückt wurde.
   */
  onClose: PropTypes.func.isRequired,
}

export default withStyles(styles)(BenutzerListeneintragLoeschen);
