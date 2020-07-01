import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Typography, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Grid } from '@material-ui/core';
import { Button, ButtonGroup } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AnwenderverbundForm from "./dialogs/AnwenderverbundForm";
import AnwenderverbundLoeschen from "./dialogs/AnwenderverbundLoeschen";



/**
 * Rendert ein EinzelhaendlerBO innerhalb eines erweiterbaren/zusammenklappbaren EinzelhaendlerListenEintrags
 * mit den Einzelhandler manipulations Funktionen. Wenn erweitert, wird eine EinzelhaendlerListe gerendert.
 */

class AnwenderverbundListenEintrag extends Component {

  constructor(props) {
    super(props);

    // Init state
    this.state = {
      anwenderverbund: props.anwenderverbund,
      showAnwenderverbundForm: false,
      showAnwenderverbundDeleteDialog: false,
    };
  }

  /** Behandelt onChange Ereignisse von den zugrunde liegenden Erweiterungsfeldern. */
  expansionPanelStateChanged = () => {
    this.props.onExpandedStateChange(this.props.anwenderverbund);
  }


  /** Behandlet das onClick Ereignis von der Einzelhaendler bearbeiten Taste. */
  editAnwenderverbundButtonClicked = (event) => {
    event.stopPropagation();
    this.setState({
      showAnwenderverbundForm: true
    });
  }

  /** Behandelt das onClose Ereignis vom EinzelhaendlerForm */
  anwenderverbundFormClosed = (anwenderverbund) => {
    // Anwenderverbund ist nicht null und deshalb geändert.
    if (anwenderverbund) {
      this.setState({
        anwenderverbund: anwenderverbund,
        showAnwenderverbundForm: false
      });
    } else {
      this.setState({
        showAnwenderverbundForm: false
      });
    }
  }

  /** Behandelt das onClick Ereignis von der Einzelhaendler löschen Taste. */
  deleteAnwenderverbundButtonClicked = (event) => {
    event.stopPropagation();
    this.setState({
      showAnwenderverbundDeleteDialog: true
    });
  }

  /** Behandelt das onClose Ereignis vom AnwenderverbundLoeschenDialog */
  deleteAnwenderverbundDialogClosed = (anwenderverbund) => {
    // Wenn der Anwenderverbund nicht gleich null ist, lösche ihn
    if (anwenderverbund) {
      this.props.onAnwenderverbundDeleted(anwenderverbund);
    };

    // Zeige nicht den Dialog
    this.setState({
      showAnwenderverbundDeleteDialog: false
    });
  }

  /** Rendert den Komponent */
  render() {
    const { classes, expandedState } = this.props;
    // Benutz den states Einzelhaendler
    const { anwenderverbund, showAnwenderverbundForm, showAnwenderverbundDeleteDialog } = this.state;

    // console.log(this.state);
    return (
      <div>
        <ExpansionPanel defaultExpanded={false} expanded={expandedState} onChange={this.expansionPanelStateChanged}>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            id={`anwenderverbund${anwenderverbund.getID()}accountpanel-header`}
          >
            <Grid container spacing={1} justify='flex-start' alignItems='center'>
              <Grid item>
                <Typography variant='body1' className={classes.heading}>{anwenderverbund.getName()}}
                </Typography>
              </Grid>
              <Grid item>
                <ButtonGroup variant='text' size='small'>
                  <Button color='primary' onClick={this.editAnwenderverbundButtonClicked}>
                    edit
                  </Button>
                  <Button color='secondary' onClick={this.deleteAnwenderverbundButtonClicked}>
                    delete
                  </Button>
                </ButtonGroup>
              </Grid>
              <Grid item xs />
            </Grid>
          </ExpansionPanelSummary>
        </ExpansionPanel>
        <AnwenderverbundForm show={showAnwenderverbundForm} anwenderverbund={anwenderverbund} onClose={this.anwenderverbundFormClosed} />
        <AnwenderverbundLoeschen show={showAnwenderverbundDeleteDialog} anwenderverbund={anwenderverbund} onClose={this.deleteAnwenderverbundDialogClosed} />
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
AnwenderverbundListenEintrag.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,
  /** Das EinzelhaendlerBO gerendert */
  anwenderverbund: PropTypes.object.isRequired,
  /** Das state von diesem AnwenderverbundListenEintrag. Wenn true wird der Einzelhaendler mit seiner Adresse gezeigt */
  expandedState: PropTypes.bool.isRequired,
  /** Der verantwortliche Handler zum behandeln der erweiterten state Änderungen (erweiterbar/zusammenklappbar)
   * von diesem AnwenderverbundListenEintrag.
   */
  onExpandedStateChange: PropTypes.func.isRequired,
  /**
   *  Ereignis Handler Funktion, welche aufgerufen wird, wenn ein Einzelhaendler erfolgreich gelöscht wurde.
   */
  onEinzelhaendlerDeleted: PropTypes.func.isRequired
}

export default withStyles(styles)(AnwenderverbundListenEintrag);
