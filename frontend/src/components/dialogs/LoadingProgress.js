import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, LinearProgress } from '@material-ui/core';

/** Zeigt einen Ladefortschritt, wenn show prop true ist.*/

class LoadingProgress extends Component {

  /** Rendert die Komponentene */
  render() {
    const { classes, show } = this.props;
    return (
      show ?
        <div className={classes.root}>
          <LinearProgress color='secondary' />
        </div>
        : null
    );
  }
}

/** Komponentenspezifische Styles */
const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(2),
  }
});

/** PropTypes */
LoadingProgress.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,
  /** Der Ladefortschritt ist gerendert, wenn true*/
  show: PropTypes.bool.isRequired,
}

export default withStyles(styles)(LoadingProgress);
