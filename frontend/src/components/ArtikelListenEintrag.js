import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Typography, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Grid } from '@material-ui/core';
import { Button, ButtonGroup } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ArtikelForm from './dialogs/ArtikelForm';
import ArtikelLoeschen from "./dialogs/ArtikelLoeschen";



/**
 * Rendert ein ArtikelBO innerhalb eines erweiterbaren/zusammenklappbaren ArtikelListenEintrags
 * mit den Artikel manipulations Funktionen. Wenn erweitert, wird eine ArtikelListe gerendert.
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


  /** Behandlet das onClick Ereignis von der Artikel bearbeiten Taste. */
  editArtikelButtonClicked = (event) => {
    event.stopPropagation();
    this.setState({
      showArtikelForm: true
    });
  }

  /** Behandelt das onClose Ereignis vom ArtikelForm */
  artikelFormClosed = (artikel) => {
    // Artikel ist nicht null und deshalb geändert.
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

  /** Behandelt das onClick Ereignis von der Artikel löschen Taste. */
  deleteArtikelButtonClicked = (event) => {
    event.stopPropagation();
    this.setState({
      showArtikelDeleteDialog: true
    });
  }

  /** Behandelt das onClose Ereignis vom ArtikelLoeschenDialog */
  deleteArtikelDialogClosed = (artikel) => {
    // Wenn der Artikel nicht gleich null ist, lösche ihn
    if (artikel) {
      this.props.onArtikelDeleted(artikel);
    };

    // Zeige nicht den Dialog
    this.setState({
      showArtikelDeleteDialog: false
    });
  }
  StandardartikelAusgeben=()=> {
    let  a;
    let ausgabe;
    a = this.state.artikel.getStandardartikel()
        a ?
        ausgabe = "Ja"
        :
        ausgabe = "Nein"
    return ausgabe
  }

  /** Rendert den Komponent */
  render() {
    const { classes, expandedState } = this.props;
    // Benutz den state Artikel
    const { artikel, showArtikelForm, showArtikelDeleteDialog } = this.state;

    return (
      <div>
        <ExpansionPanel defaultExpanded={false} expanded={expandedState} onChange={this.expansionPanelStateChanged}>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            id={`artikel${artikel.getID()}accountpanel-header`}
          >
            <Grid container spacing={1} justify='flex-start' alignItems='center'>
              <Grid item>
                <Typography variant='body1' className={classes.heading}>{artikel.getName()}
                </Typography>
              </Grid>
              <Grid item>
                <ButtonGroup variant='text' size='small'>
                  <Button color='primary' onClick={this.editArtikelButtonClicked}>
                    bearbeiten
                  </Button>
                  <Button color='secondary' onClick={this.deleteArtikelButtonClicked}>
                    löschen
                  </Button>
                </ButtonGroup>
              </Grid>
              <Grid item xs />
            </Grid>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography className={classes.panelDetails}>
              Standardartikel: {`${this.StandardartikelAusgeben()} `}
            </Typography>
            <Typography className>
              Einheit: {`${artikel.getEinheit()}`}
            </Typography>
        </ExpansionPanelDetails>
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
  },
  panelDetails: {
    flexBasis: '15%',
  }
});

/** PropTypes */
ArtikelListenEintrag.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,
  /** Das ArtikelBO gerendert */
  artikel: PropTypes.object.isRequired,
  /** Das state von diesem ArtikelListenEintrag. Wenn true wird der Artikel mit seinen Attributen gezeigt */
  expandedState: PropTypes.bool.isRequired,
  /** Der verantwortliche Handler zum behandeln der erweiterten state Änderungen (erweiterbar/zusammenklappbar)
   * von diesem ArtikelListenEintrag.
   */
  onExpandedStateChange: PropTypes.func.isRequired,
  /**
   *  Ereignis Handler Funktion, welche aufgerufen wird, wenn ein Artikel erfolgreich gelöscht wurde.
   */
  onArtikelDeleted: PropTypes.func.isRequired
}

export default withStyles(styles)(ArtikelListenEintrag);
