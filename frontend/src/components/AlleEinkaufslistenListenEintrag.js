import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Typography, Grid ,Link} from '@material-ui/core';
import { Button, ButtonGroup } from '@material-ui/core';
import EinkaufslisteForm from "./dialogs/EinkaufslisteForm";
import EinkaufslisteLoeschen from "./dialogs/EinkaufslisteLoeschen";
import { Link as RouterLink } from 'react-router-dom';

/** Rendert die einzelnen EinkaufslistenListenEinträge, die in den einzelnen Anwenderverbünden enthalten sind. */

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

    /** Behandlet das onClick Ereignis von der Einkaufsliste bearbeiten Taste. */
    editEinkaufslisteButtonClicked = (event) => {
        event.stopPropagation();
        this.setState({
            showEinkaufslisteForm: true
        });
    }

    /** Behandelt das onClose Ereignis vom EinkaufslistenForm */
    einkaufslisteFormClosed = (einkaufsliste) => {
        // Einkaufsliste ist nicht null und deshalb geändert.
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

    /** Behandelt das onClick Ereignis von der Einkaufsliste löschen Taste. */
    deleteEinkaufslisteButtonClicked = (event) => {
        event.stopPropagation();
        this.setState({
            showEinkaufslisteDeleteDialog: true
        });
    }

    /** Behandelt das onClose Ereignis vom Einkaufsliste löschen Dialog */
    deleteEinkaufslisteDialogClosed = (einkaufsliste) => {
        // Wenn die Einkaufsliste nicht gleich null ist, lösche sie
        if (einkaufsliste) {
            this.props.onEinkaufslisteDeleted(einkaufsliste);
        }
        // Zeige nicht den Dialog
        this.setState({
          showEinkaufslisteDeleteDialog: false
        });
      }

  /** Rendert diw Komponente */
  render() {
    const { classes } = this.props;
    const { einkaufsliste, showEinkaufslisteForm, showEinkaufslisteDeleteDialog } = this.state;
    return (
      <div>
        <Grid container spacing={3} justify='flex-start' alignItems='center'>
          <Grid item>
            <Typography variant='body1' className={classes.heading}>
                <Link component={RouterLink} to={{
                      pathname: '/einkaufsliste',
                      einkaufsliste: einkaufsliste
                    }} >
                      {einkaufsliste.getName()}
                </Link>
            </Typography>
          </Grid>
           <Grid item xs={'auto'} />
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
        </Grid>
      <EinkaufslisteForm show={showEinkaufslisteForm} einkaufsliste={einkaufsliste} onClose={this.einkaufslisteFormClosed} />
      <EinkaufslisteLoeschen show={showEinkaufslisteDeleteDialog} einkaufsliste={einkaufsliste} onClose={this.deleteEinkaufslisteDialogClosed} />
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
AlleEinkaufslistenListenEintrag.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,
  /** Das EinkaufslisteBO gerendert */
  einkaufsliste: PropTypes.object.isRequired,
   /** Ereignis Handler Funktion, welche aufgerufen wird, wenn ein EinkaufslisteBO erfolgreich gelöscht wurde. */
  onEinkaufslisteDeleted: PropTypes.func.isRequired
}

export default withStyles(styles)(AlleEinkaufslistenListenEintrag);

