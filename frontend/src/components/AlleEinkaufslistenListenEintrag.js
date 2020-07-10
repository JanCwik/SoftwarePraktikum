import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Typography, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Grid } from '@material-ui/core';
import { Button, ButtonGroup } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import EinkaufslisteForm from "./dialogs/EinkaufslisteForm";
import EinkaufslisteLoeschen from "./dialogs/EinkaufslisteLoeschen";
import EinzelhaendlerLoeschen from "./dialogs/EinzelhaendlerLoeschen";



/**
 * Rendert ein EinkaufslisteBO innerhalb eines Einkaufsliste-ListenEintrags
 * mit den Einkaufsliste manipulations Funktionen.
 */

 class AlleEinkaufslistenListenEintrag extends Component {

    constructor(props) {
        super(props);


        // Init state
        this.state = {
            einkaufsliste: props.einkaufsliste,
            showEinkaufslisteForm: false,
            showEinkaufslisteDeleteDialog: false,
        };

    }

    /** Behandlet das onClick Ereignis von der einkaufsliste bearbeiten Taste. */
    editEinkaufslisteButtonClicked = (event) => {
        event.stopPropagation();
        this.setState({
            showEinkaufslisteForm: true
        });
    }

    /** Behandelt das onClose Ereignis vom EinkaufslistenForm */
    einkaufslisteFormClosed = (einkaufsliste) => {
        // einkaufsliste ist nicht null und deshalb geändert.
        if (einkaufsliste) {
            this.setState({
                einkaufsliste: einkaufsliste,
                showEinkaufslisteForm: false
            });
        } else {
            this.setState({
                showEinkaufslisteForm: false
            });
        }
    }


    /** Behandelt das onClick Ereignis von der einkaufsliste löschen Taste. */
    deleteEinkaufslisteButtonClicked = (event) => {
        event.stopPropagation();
        this.setState({
            showEinkaufslisteDeleteDialog: true
        });
    }


    /** Behandelt das onClose Ereignis vom einkaufslisteLoeschenDialog */
    deleteEinkaufslisteDialogClosed = (einkaufsliste) => {
        // Wenn die einkaufsliste nicht gleich null ist, lösche sie
        if (einkaufsliste) {
            this.props.onEinkaufslisteDeleted(einkaufsliste);
        }
        // Zeige nicht den Dialog
        this.setState({
          showEinkaufslisteDeleteDialog: false
        });
      }



  /** Rendert den Komponent */
  render() {
    const { classes } = this.props;
    // Benutz den state
    const { einkaufsliste, showEinkaufslisteForm, showEinkaufslisteDeleteDialog } = this.state;

    // console.log(this.state);
    return (
      <div>

            <Grid container spacing={3} justify='flex-start' alignItems='center'>
              <Grid item>
                <Typography variant='body1' className={classes.heading}>{einkaufsliste.getName()}
                </Typography>
              </Grid>
              <Grid item>
                <ButtonGroup variant='text' size='small'>
                  <Button color='primary' onClick={this.editEinkaufslisteButtonClicked}>
                    bearbeiten
                  </Button>
                  <Button color='secondary' onClick={this.deleteEinkaufslisteButtonClicked}>
                    löschen
                  </Button>
                </ButtonGroup>
              </Grid>
              <Grid item xs />
            </Grid>
          <EinkaufslisteForm show={showEinkaufslisteForm} einkaufsliste={einkaufsliste} onClose={this.einkaufslisteFormClosed} />
          <EinkaufslisteLoeschen show={showEinkaufslisteDeleteDialog} einkaufsliste={einkaufsliste} onClose={this.deleteEinkaufslisteDialogClosed} />
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
AlleEinkaufslistenListenEintrag.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,
  /** Das EinkaufslisteBO gerendert */
  einkaufsliste: PropTypes.object.isRequired,
   /**
   *  Ereignis Handler Funktion, welche aufgerufen wird, wenn ein EinkaufslisteBO erfolgreich gelöscht wurde.
   */
  onEinkaufslisteDeleted: PropTypes.func.isRequired
}

export default withStyles(styles)(AlleEinkaufslistenListenEintrag);

