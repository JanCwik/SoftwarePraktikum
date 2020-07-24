import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Typography } from '@material-ui/core';

/** Rendert ein StatistikBO innerhalb eines StatistikListenEintrags */

class StatistikListenEintrag extends Component {

  constructor(props) {
    super(props);

    // Init state
    this.state = {
        statistikeintrag: props.statistikeintrag,
    };
  }

  /** Rendert die Komponente */
  render() {
    const { classes } = this.props;
    const { statistikeintrag } = this.state;
    return (
      <div className={classes.root}  >
        <Typography variant='h5' component='h5' align='center' >
          Der Artikel {statistikeintrag.getArtikelName()} wurde {statistikeintrag.getGesamtAnzahl()} mal gekauft
        </Typography>
      </div>
    );
  }
}

/** Komponentenspezifische Styles */
const styles = theme => ({
  root: {
    width: '100%',
    marginTop : theme.spacing(4)
  },
});

/** PropTypes */
StatistikListenEintrag.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,
  /** Das StatistikBO gerendert */
  statistikeintrag: PropTypes.object.isRequired,

}

export default withStyles(styles)(StatistikListenEintrag);
