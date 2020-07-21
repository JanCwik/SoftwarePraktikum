import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Typography, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Grid } from '@material-ui/core';
import { Button, ButtonGroup } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AnwenderverbundForm from "./dialogs/AnwenderverbundForm";
import AnwenderverbundLoeschen from "./dialogs/AnwenderverbundLoeschen";
import BenutzerListe from "./BenutzerListe";

/**
 * Rendert ein AnwenderverbundBO innerhalb eines erweiterbaren/zusammenklappbaren AnwenderverbundListenEintrags
 * mit den Anwenderverbund manipulations Funktionen. Wenn erweitert, werden zugehörige Benutzer angezeigt.
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

  /** Behandlet das onClick Ereignis von der Anwenderverbund bearbeiten Taste. */
  editAnwenderverbundButtonClicked = (event) => {
    event.stopPropagation();
    this.setState({
      showAnwenderverbundForm: true
    });
  }

  /** Behandelt das onClose Ereignis vom AnwenderverbundForm */
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

  /** Behandelt das onClick Ereignis von der Anwenderverbund löschen Taste. */
  deleteAnwenderverbundButtonClicked = (event) => {
    event.stopPropagation();
    this.setState({
      showAnwenderverbundDeleteDialog: true
    });
  }

  /** Behandelt das onClose Ereignis vom AnwenderverbundLoeschen Dialog */
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
    const { anwenderverbund, showAnwenderverbundForm, showAnwenderverbundDeleteDialog } = this.state;

    return (
      <div>
        <ExpansionPanel defaultExpanded={false} expanded={expandedState} onChange={this.expansionPanelStateChanged}>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            id={`anwenderverbund${anwenderverbund.getID()}einkaufslistenpanel-header`}
          >
            <Grid container spacing={1} justify='flex-start' alignItems='center'>
              <Grid item>
                <Typography variant='body1' className={classes.heading}>{anwenderverbund.getName()}
                </Typography>
              </Grid>
              <Grid item>
                <ButtonGroup variant='text' size='small'>
                  <Button color='primary' onClick={this.editAnwenderverbundButtonClicked}>
                    bearbeiten
                  </Button>
                  <Button color='secondary' onClick={this.deleteAnwenderverbundButtonClicked}>
                    löschen
                  </Button>
                </ButtonGroup>
              </Grid>
              <Grid item xs />
              <Grid item >
                  <Typography variant='body2' color={'textSecondary'}>Mitglieder</Typography>
              </Grid>
            </Grid>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <BenutzerListe anwenderverbund={anwenderverbund} newBenutzerFromNewAnwenderverbund={this.props.newBenutzerFromNewAnwenderverbund}/>
        </ExpansionPanelDetails>
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
  /** Das AnwenderverbundBO gerendert */
  anwenderverbund: PropTypes.object.isRequired,
  /** Das state von diesem AnwenderverbundListenEintrag. Wenn true wird der Anwenderverbund mit seinen Benutzern gezeigt */
  expandedState: PropTypes.bool.isRequired,
  /** Der verantwortliche Handler zum behandeln der erweiterten state Änderungen (erweiterbar/zusammenklappbar)
   * von diesem AnwenderverbundListenEintrag.
   */
  onExpandedStateChange: PropTypes.func.isRequired,
  /**
   *  Ereignis Handler Funktion, welche aufgerufen wird, wenn ein Anwenderverbund erfolgreich gelöscht wurde.
   */
  onAnwenderverbundDeleted: PropTypes.func.isRequired
}

export default withStyles(styles)(AnwenderverbundListenEintrag);