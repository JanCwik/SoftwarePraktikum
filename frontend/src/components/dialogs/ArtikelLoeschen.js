import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Button, IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import  API  from '../../api/API';
import ContextErrorMessage from './ContextErrorMessage';
import LoadingProgress from './LoadingProgress';

/**
 * Zeigt einen modalen loeschen/abbrechen Dialog, der nach dem löschen eines Artikels fragt. Um den ArtikelBO
 * zu loeschen muss er in prop Artikel gegeben sein. In Abhängigkeit der Benutzerinteraktion (loeschen/abbrechen)
 * wird jeweils der Backendaufruf gemacht. Danch wird die Funktion onClose prop mit dem ArtikelBO loeschen
 * Objekt als Parameter aufgerufen. Wenn der Dialog abgebrochen wird, wird onClose mit null aufgerufen.
 */
class ArtikelLoeschen extends Component {

  constructor(props) {
    super(props);

    // Init state
    this.state = {
      deletingInProgress: false,
      deletingError: null
    };
  }

  /** Löschen des Artikels */
  deleteArtikel = () => {
    API.getAPI().deleteArtikelAPI(this.props.artikel.getID()).then(artikel => {
      this.setState({
        deletingInProgress: false,              // Ladeanzeige deaktivieren
        deletingError: null                     // Keine Error Nachricht
      });
      this.props.onClose(this.props.artikel);  // Aufruf des Urhebers mit dem geloeschten Artikel
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
    const { classes, artikel, show } = this.props;
    const { deletingInProgress, deletingError } = this.state;

    return (
      show ?
        <Dialog open={show} onClose={this.handleClose}>
          <DialogTitle id='delete-dialog-title'>Delete artikel
            <IconButton className={classes.closeButton} onClick={this.handleClose}>
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Wirklich den Artikel '{artikel.getName()}' (ID: {artikel.getID()}) löschen?
            </DialogContentText>
            <LoadingProgress show={deletingInProgress} />
            <ContextErrorMessage error={deletingError} contextErrorMsg={`Der Artikel '${artikel.getName()}' (ID: ${artikel.getID()}) konnte nicht gelöscht werden.`}
              onReload={this.deleteArtikel} />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color='secondary'>
              Abbrechen
            </Button>
            <Button variant='contained' onClick={this.deleteArtikel} color='primary'>
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
ArtikelLoeschen.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,
  /** Um das ArtikelBO zu loeschen */
  artikel: PropTypes.object.isRequired,
  /** Wenn true, wird der Dialog gerendert */
  show: PropTypes.bool.isRequired,
  /**
   * Handler Funktion, die aufgerufen wird, wenn der Dialog geschlossen wurde.
   * Sendet das geloeschte ArtikelBO als Parameter oder null, wenn abbrechen gedrückt wurde.
   */
  onClose: PropTypes.func.isRequired,
}

export default withStyles(styles)(ArtikelLoeschen);
