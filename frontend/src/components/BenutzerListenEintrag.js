import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Typography, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Grid } from '@material-ui/core';
import { Button, ButtonGroup } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import BenutzerListeFormForm from './dialogs/EinzelhaendlerForm';
import EinzelhaendlerLoeschen from "./dialogs/EinzelhaendlerLoeschen";
import BenutzerListeForm from "./dialogs/BenutzerListeForm";
import DeleteIcon from '@material-ui/icons/Delete';


/**
 * Rendert ein EinzelhaendlerBO innerhalb eines  EinzelhaendlerListenEintrags
 * mit den Einzelhandler manipulations Funktionen.
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
    // Einzelhaendler ist nicht null und deshalb geändert.
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

  /** Behandelt das onClick Ereignis von der Einzelhaendler löschen Taste. */
  deleteBenutzerButtonClicked = (event) => {
    event.stopPropagation();
    this.setState({
      showBenutzerDeleteDialog: true
    });
  }

  /** Behandelt das onClose Ereignis vom EinzelhaendlerLoeschenDialog */
  deleteBenutzerDialogClosed = (benutzer) => {
    // Wenn der Einzelhaendler nicht gleich null ist, lösche ihn
    if (benutzer) {
      this.props.onBenutzerDeleted(benutzer);
    };

    // Zeige nicht den Dialog
    this.setState({
      showBenutzerDeleteDialog: false
    });
  }

  /** Rendert den Komponent */
  render() {
    const { classes } = this.props;
    // Benutz den states Einzelhaendler
    const { benutzer, showBenutzerForm, showBenutzerDeleteDialog } = this.state;

    // console.log(this.state);
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

        <BenutzerListeForm show={showBenutzerForm} einzelhaendler={benutzer} onClose={this.benutzerFormClosed} />

      </div>
    );
  }
}

/** Komponentenspezifische Stile */
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
   /**
   *  Ereignis Handler Funktion, welche aufgerufen wird, wenn ein Einzelhaendler erfolgreich gelöscht wurde.
   */
  onBenutzerDeleted: PropTypes.func.isRequired
}

export default withStyles(styles)(BenutzerListenEintrag);
