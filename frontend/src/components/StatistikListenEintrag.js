import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Typography, Grid } from '@material-ui/core';
import { Button, ButtonGroup } from '@material-ui/core';

/**
 * Rendert ein EinzelhaendlerBO innerhalb eines EinzelhaendlerListenEintrags
 * mit den Einzelhändler manipulations Funktionen.
 */

class StatistikListenEintrag extends Component {

  constructor(props) {
    super(props);

    // Init state
    this.state = {
    };
  }

  /** Rendert den Komponent */
  render() {
    const { classes } = this.props;
    const { listeneintrag, showEinzelhaendlerForm, showEinzelhaendlerDeleteDialog } = this.state;

    return (
      <div>
            <Grid container spacing={3} justify='flex-start' alignItems='center'>
              <Grid item>
                <Typography variant='body1' className={classes.heading}>{listeneintrag.getID()}
                </Typography>
              </Grid>
              <Grid item>
              </Grid>
              <Grid item xs />
            </Grid>
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
StatistikListenEintrag.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,
  /** Das EinzelhaendlerBO gerendert */
  einzelhaendler: PropTypes.object.isRequired,
   /**
   *  Ereignis Handler Funktion, welche aufgerufen wird, wenn ein Einzelhaendler erfolgreich gelöscht wurde.
   */
  onEinzelhaendlerDeleted: PropTypes.func.isRequired
}

export default withStyles(styles)(StatistikListenEintrag);
