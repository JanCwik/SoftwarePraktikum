import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Typography, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Grid } from '@material-ui/core';
import { Button, ButtonGroup } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import EinzelhaendlerForm from './dialogs/EinzelhaendlerForm';
import EinzelhaendlerLoeschen from "./dialogs/EinzelhaendlerLoeschen";



/**
 * Rendert ein EinzelhaendlerBO innerhalb eines erweiterbaren/zusammenklappbaren EinzelhaendlerListenEintrags
 * mit den Einzelhandler manipulations Funktionen. Wenn erweitert, wird eine EinzelhaendlerListe gerendert.
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

  /** Behandelt onChange Ereignisse von den zugrunde liegenden Erweiterungsfeldern. */
  expansionPanelStateChanged = () => {
    this.props.onExpandedStateChange(this.props.einzelhaendler);
  }


  /** Behandlet das onClick Ereignis von der Einzelhaendler bearbeiten Taste. */
  editEinzelhaendlerButtonClicked = (event) => {
    event.stopPropagation();
    this.setState({
      showEinzelhaendlerForm: true
    });
  }

  /** Behandelt das onClose Ereignis vom EinzelhaendlerForm */
  einzelhaendlerFormClosed = (einzelhaendler) => {
    // Einzelhaendler ist nicht null und deshalb geändert.
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

  /** Behandelt das onClick Ereignis von der Einzelhaendler löschen Taste. */
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
    const { classes, expandedState } = this.props;
    // Benutz den states Einzelhaendler
    const { einzelhaendler, showEinzelhaendlerForm, showEinzelhaendlerDeleteDialog } = this.state;

    // console.log(this.state);
    return (
      <div>

            <Grid container spacing={3} justify='flex-start' alignItems='center'>
              <Grid item>
                <Typography variant='body1' className={classes.heading}>{einzelhaendler.getName()}
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

        <EinzelhaendlerForm show={showEinzelhaendlerForm} einzelhaendler={einzelhaendler} onClose={this.einzelhaendlerFormClosed} />
        <EinzelhaendlerLoeschen show={showEinzelhaendlerDeleteDialog} einzelhaendler={einzelhaendler} onClose={this.deleteEinzelhaendlerDialogClosed} />
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
EinzelhaendlerListenEintrag.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,
  /** Das EinzelhaendlerBO gerendert */
  einzelhaendler: PropTypes.object.isRequired,
  /** Das state von diesem EinzelhaendlerListenEintrag. Wenn true wird der Einzelhaendler mit seiner Adresse gezeigt */
  expandedState: PropTypes.bool.isRequired,
  /** Der verantwortliche Handler zum behandeln der erweiterten state Änderungen (erweiterbar/zusammenklappbar)
   * von diesem EinzelhaendlerListenEintrag.
   */
  onExpandedStateChange: PropTypes.func.isRequired,
  /**
   *  Ereignis Handler Funktion, welche aufgerufen wird, wenn ein Einzelhaendler erfolgreich gelöscht wurde.
   */
  onEinzelhaendlerDeleted: PropTypes.func.isRequired
}

export default withStyles(styles)(EinzelhaendlerListenEintrag);
