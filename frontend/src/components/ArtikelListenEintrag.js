import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Typography, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Grid } from '@material-ui/core';
import { Button, ButtonGroup } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ArtikelForm from './dialogs/ArtikelForm';
import ArtikelLoeschen from "./dialogs/ArtikelLoeschen";



/**
 * Rendert ein EinzelhaendlerBO innerhalb eines erweiterbaren/zusammenklappbaren EinzelhaendlerListenEintrags
 * mit den Einzelhandler manipulations Funktionen. Wenn erweitert, wird eine EinzelhaendlerListe gerendert.
 */

class ArtikelListenEintrag extends Component {

  constructor(props) {
    super(props);

    // Init state
    this.state = {
      artikel: props.artikel,
      showArtikelForm: false,
      showArtikelDeleteDialog: false,
    };
  }

  /** Behandelt onChange Ereignisse von den zugrunde liegenden Erweiterungsfeldern. */
  expansionPanelStateChanged = () => {
    this.props.onExpandedStateChange(this.props.artikel);
  }


  /** Behandlet das onClick Ereignis von der Einzelhaendler bearbeiten Taste. */
  editArtikelButtonClicked = (event) => {
    event.stopPropagation();
    this.setState({
      showArtikelForm: true
    });
  }

  /** Behandelt das onClose Ereignis vom EinzelhaendlerForm */
  artikelFormClosed = (artikel) => {
    // Einzelhaendler ist nicht null und deshalb geändert.
    if (artikel) {
      this.setState({
        artikel: artikel,
        showArtikelForm: false
      });
    } else {
      this.setState({
        showArtikelForm: false
      });
    }
  }

  /** Behandelt das onClick Ereignis von der Einzelhaendler löschen Taste. */
  deleteArtikelButtonClicked = (event) => {
    event.stopPropagation();
    this.setState({
      showArtikelDeleteDialog: true
    });
  }

  /** Behandelt das onClose Ereignis vom EinzelhaendlerLoeschenDialog */
  deleteArtikelDialogClosed = (artikel) => {
    // Wenn der Einzelhaendler nicht gleich null ist, lösche ihn
    if (artikel) {
      this.props.onArtikelDeleted(artikel);
    };

    // Zeige nicht den Dialog
    this.setState({
      showArtikelDeleteDialog: false
    });
  }

  /** Rendert den Komponent */
  render() {
    const { classes, expandedState } = this.props;
    // Benutz den states Einzelhaendler
    const { artikel, showArtikelForm, showArtikelDeleteDialog } = this.state;

    // console.log(this.state);
    return (
      <div>
        <ExpansionPanel defaultExpanded={false} expanded={expandedState} onChange={this.expansionPanelStateChanged}>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            id={`artikel${artikel.getID()}accountpanel-header`}
          >
            <Grid container spacing={1} justify='flex-start' alignItems='center'>
              <Grid item>
                <Typography variant='body1' className={classes.heading}>{artikel.getName()}}
                </Typography>
              </Grid>
              <Grid item>
                <ButtonGroup variant='text' size='small'>
                  <Button color='primary' onClick={this.editArtikelButtonClicked}>
                    edit
                  </Button>
                  <Button color='secondary' onClick={this.deleteArtikelButtonClicked}>
                    delete
                  </Button>
                </ButtonGroup>
              </Grid>
              <Grid item xs />
            </Grid>
          </ExpansionPanelSummary>
        </ExpansionPanel>
        <ArtikelForm show={showArtikelForm} artikel={artikel} onClose={this.artikelFormClosed} />
        <ArtikelLoeschen show={showArtikelDeleteDialog} artikel={artikel} onClose={this.deleteArtikelDialogClosed} />
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
ArtikelListenEintrag.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,
  /** Das EinzelhaendlerBO gerendert */
  artikel: PropTypes.object.isRequired,
  /** Das state von diesem EinzelhaendlerListenEintrag. Wenn true wird der Einzelhaendler mit seiner Adresse gezeigt */
  expandedState: PropTypes.bool.isRequired,
  /** Der verantwortliche Handler zum behandeln der erweiterten state Änderungen (erweiterbar/zusammenklappbar)
   * von diesem EinzelhaendlerListenEintrag.
   */
  onExpandedStateChange: PropTypes.func.isRequired,
  /**
   *  Ereignis Handler Funktion, welche aufgerufen wird, wenn ein Einzelhaendler erfolgreich gelöscht wurde.
   */
  onArtikelDeleted: PropTypes.func.isRequired
}

export default withStyles(styles)(ArtikelListenEintrag);
