import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Typography, Paper} from "@material-ui/core";
import ProfileDropDown from '../dialogs/ProfileDropDown';

/** Erstellt den Kpfbereich und die Navigation für die SharedShoppingList */

class Header extends Component {

  constructor(props) {
    super(props);

    // Init ein leeres state
    this.state = {
      tabindex: 0
    };
  }

  /** Rendert die Komponente */
  render() {
   const { user } = this.props;
    return (
        <Paper variant='outlined'>
        <ProfileDropDown user={user} />
        <Typography variant='h3' component='h1' align='center'>
         SharedShoppingList
        </Typography>
        <Typography variant='h4' component='h2' align='center'>
          Meine Einkaufs-Statistik
        </Typography>
        <Typography variant='h6' component='h5' align='center'>
          Auf dieser Seite sehen Sie Ihre fünf meistgekauften Artikel.
          Sie können einen Ihrer Einzelhändler und/oder einen Zeitraum angeben um den Report einzuschränken
        </Typography>
        </Paper>
    )
  }
}

/** PropTypes */
Header.propTypes = {
  /** The logged in firesbase user */
  user: PropTypes.object,
}

export default Header;