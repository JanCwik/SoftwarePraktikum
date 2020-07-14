import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Button, IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import  API from '../../api/API';
import EinkaufslisteBO from "../../api/EinkaufslisteBO";
import ContextErrorMessage from './ContextErrorMessage';
import LoadingProgress from './LoadingProgress';

/**
 * Zeigt einen modalen loeschen/abbrechen Dialog, der nach dem löschen eines Einzelhaendlers fragt. Um den EinzelhaendlerBO
 * zu loeschen muss er in prop Einzelhaendler gegeben sein. In Abhängigkeit der Benutzerinteraktion (loeschen/abbrechen)
 * wird jeweils der Backendaufruf gemacht. Danch wird die Funktion onClose prop mit dem EinzelhaendlerBO loeschen
 * Objekt als Parameter aufgerufen. Wenn der Dialog abgebrochen wird, wird onClose mit null aufgerufen.
 *  When the dialog is canceled, onClose is called with null.
 */
class EinkaufslisteLoeschen extends Component {

  constructor(props) {
    super(props);

    // Init state
    this.state = {
      deletingInProgress: false,
      deletingError: null
    };
  }

  /** Löschen des Einzelhaendlers */
  deleteEinkaufsliste = () => {
    API.getAPI().deleteEinkaufslisteAPI(this.props.einkaufsliste.getID()).then(einkaufsliste => {
      this.setState({
        deletingInProgress: false,              // Ladeanzeige deaktivieren
        deletingError: null                     // Keine Error Nachricht
      });
      this.props.onClose(this.props.einkaufsliste);  // Aufruf des Urhebers mit dem geloeschten Einzelhaendler
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
    const { classes, einkaufsliste, show } = this.props;
    const { deletingInProgress, deletingError } = this.state;

    return (
      show ?
        <Dialog open={show} onClose={this.handleClose}>
          <DialogTitle id='delete-dialog-title'>Einkaufsliste löschen
            <IconButton className={classes.closeButton} onClick={this.handleClose}>
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Einkaufsliste wirklich löschen? '{einkaufsliste.getName()}' (ID: {einkaufsliste.getID()})?
            </DialogContentText>
            <LoadingProgress show={deletingInProgress} />
            <ContextErrorMessage error={deletingError} contextErrorMsg={`Die Einkaufsliste '${einkaufsliste.getName()}' (ID: ${einkaufsliste.getID()}) konnte nicht gelöscht werden.`}
              onReload={this.deleteEinkaufsliste} />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color='secondary'>
              Abbrechen
            </Button>
            <Button variant='contained' onClick={this.deleteEinkaufsliste()} color='primary'>
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
EinkaufslisteLoeschen.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,
  /** Um das EinzelhaendlerBO zu loeschen */
  einkaufsliste: PropTypes.object.isRequired,
  /** Wenn true, wird der Dialog gerendert */
  show: PropTypes.bool.isRequired,
  /**
   * Handler Funktion, die aufgerufen wird, wenn der Dialog geschlossen wurde.
   * Sendet das geloeschte EinzelhaendlerBO als Parameter oder null, wenn abbrechen gedrückt wurde.
   */
  onClose: PropTypes.func.isRequired,
}

export default withStyles(styles)(EinkaufslisteLoeschen);
