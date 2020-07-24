import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Typography, Grid } from '@material-ui/core';
import { Button, ButtonGroup } from '@material-ui/core';
import EinzelhaendlerForm from './dialogs/EinzelhaendlerForm';
import EinzelhaendlerLoeschen from "./dialogs/EinzelhaendlerLoeschen";

/**
 * Rendert ein EinzelhaendlerBO innerhalb eines EinzelhaendlerListenEintrags
 * mit den Einzelhändler manipulations Funktionen.
 */

class EinzelhaendlerListenEintrag extends Component {

  constructor(props) {
    super(props);

    // Init state
    this.state = {
      einzelhaendler: props.einzelhaendler,
      showEinzelhaendlerForm: false,
      showEinzelhaendlerDeleteDialog: false,
    };
  }

  /** Behandlet das onClick Ereignis von der Einzelhändler bearbeiten Taste. */
  editEinzelhaendlerButtonClicked = (event) => {
    event.stopPropagation();
    this.setState({
      showEinzelhaendlerForm: true
    });
  }

  /** Behandelt das onClose Ereignis vom EinzelhaendlerForm */
  einzelhaendlerFormClosed = (einzelhaendler) => {
    // Einzelhaendler ist nicht null und deshalb bereits geändert.
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

  /** Behandelt das onClick Ereignis von der Einzelhändler löschen Taste. */
  deleteEinzelhaendlerButtonClicked = (event) => {
    event.stopPropagation();
    this.setState({
      showEinzelhaendlerDeleteDialog: true
    });
  }

  /** Behandelt das onClose Ereignis vom EinzelhaendlerLoeschenDialog */
  deleteEinzelhaendlerDialogClosed = (einzelhaendler) => {
    // Wenn der Einzelhaendler nicht gleich null ist, lösche ihn
    if (einzelhaendler) {
      this.props.onEinzelhaendlerDeleted(einzelhaendler);
    };

    // Zeige nicht den Dialog
    this.setState({
      showEinzelhaendlerDeleteDialog: false
    });
  }

  /** Rendert den Komponent */
  render() {
    const { classes } = this.props;
    const { einzelhaendler, showEinzelhaendlerForm, showEinzelhaendlerDeleteDialog } = this.state;
    return (
      <div className={classes.root} >
        <Grid  container spacing={3} justify='flex-start' alignItems='center'>
          <Grid item>
            <Typography variant='body1' className={classes.heading}>{einzelhaendler.getName()}
            </Typography>
          </Grid>
          <Grid item>
            <ButtonGroup variant='text' size='small'>
              <Button color='primary' onClick={this.editEinzelhaendlerButtonClicked}>
                bearbeiten
              </Button>
              <Button color='secondary' onClick={this.deleteEinzelhaendlerButtonClicked}>
                löschen
              </Button>
            </ButtonGroup>
          </Grid>
          <Grid item xs />
        </Grid>
        <hr/>
        <EinzelhaendlerForm show={showEinzelhaendlerForm} einzelhaendler={einzelhaendler} onClose={this.einzelhaendlerFormClosed} />
        <EinzelhaendlerLoeschen show={showEinzelhaendlerDeleteDialog} einzelhaendler={einzelhaendler} onClose={this.deleteEinzelhaendlerDialogClosed} />
      </div>
    );
  }
}

/** Komponentenspezifische Styles */
const styles = theme => ({
  root: {
    width: '100%',
  marginLeft : theme.spacing(2),
    marginTop : theme.spacing(0.5)
  }
});

/** PropTypes */
EinzelhaendlerListenEintrag.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,
  /** Das EinzelhaendlerBO gerendert */
  einzelhaendler: PropTypes.object.isRequired,
   /**
   *  Ereignis Handler Funktion, welche aufgerufen wird, wenn ein Einzelhaendler erfolgreich gelöscht wurde.
   */
  onEinzelhaendlerDeleted: PropTypes.func.isRequired
}

export default withStyles(styles)(EinzelhaendlerListenEintrag);
