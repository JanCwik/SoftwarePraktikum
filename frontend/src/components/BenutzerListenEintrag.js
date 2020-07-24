import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Typography, Grid } from '@material-ui/core';
import { Button, ButtonGroup } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import BenutzerListeneintragLoeschen from "./dialogs/BenutzerListeneintragLoeschen";

/**
 * Rendert ein BenutzerBO innerhalb eines BenutzerListenEintrags
 * mit den Benutzer manipulations Funktionen.
 */

class BenutzerListenEintrag extends Component {

  constructor(props) {
    super(props);

    // Init state
    this.state = {
      benutzer: props.benutzer,
      showBenutzerForm: false,
      showBenutzerDeleteDialog: false,
    };
  }

  /** Behandelt das onClose Ereignis vom BenutzerForm */
  benutzerFormClosed = (benutzer) => {
    // Benutzer ist nicht null und deshalb geändert.
    if (benutzer) {
      this.setState({
        benutzer: benutzer,
        showBenutzerForm: false
      });
    } else {
      this.setState({
        showBenutzerForm: false
      });
    }
  }

  /** Behandelt das onClick Ereignis von der Benutzer löschen Taste. */
  deleteBenutzerButtonClicked = (event) => {
    event.stopPropagation();
    this.setState({
      showBenutzerDeleteDialog: true
    });
  }

  /** Behandelt das onClose Ereignis vom BenutzerLoeschenDialog */
  deleteBenutzerDialogClosed = (benutzer) => {
    // Wenn der Benutzer nicht gleich null ist, lösche ihn
    if (benutzer) {
      this.props.onBenutzerDeleted(benutzer);
    };
    // Zeige nicht den Dialog
    this.setState({
      showBenutzerDeleteDialog: false
    });
  }

  /** Rendert die Komponente */
  render() {
    const { classes, anwenderverbund } = this.props;
    const { benutzer, showBenutzerDeleteDialog } = this.state;
    return (
      <div>
        <Grid container spacing={3} justify='flex-start' alignItems='center'>
          <Grid item>
            <Typography variant='body1' className={classes.heading}>{benutzer.getName()}
            </Typography>
          </Grid>
          <Grid item>
            <ButtonGroup variant='text' size='small'>
              <Button color='secondary' startIcon={<DeleteIcon />} onClick={this.deleteBenutzerButtonClicked}>
                löschen
              </Button>
            </ButtonGroup>
          </Grid>
          <Grid item xs />
        </Grid>
        <BenutzerListeneintragLoeschen anwenderverbund={anwenderverbund} show={showBenutzerDeleteDialog} benutzer={benutzer} onClose={this.deleteBenutzerDialogClosed} />
      </div>
    );
  }
}

/** Komponentenspezifische Styles */
const styles = theme => ({
  root: {
    width: '100%',
  }
});

/** PropTypes */
BenutzerListenEintrag.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,
  /** Das EinzelhaendlerBO gerendert */
  benutzer: PropTypes.object.isRequired,
   /** Ereignis Handler Funktion, welche aufgerufen wird, wenn ein Einzelhaendler erfolgreich gelöscht wurde. */
  onBenutzerDeleted: PropTypes.func.isRequired
}

export default withStyles(styles)(BenutzerListenEintrag);
