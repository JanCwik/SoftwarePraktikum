import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Typography,Tabs, Tab, Paper} from "@material-ui/core";
import {Link as RouterLink} from "react-router-dom"
import FastfoodIcon from "@material-ui/icons/Fastfood";
import ListAltIcon from '@material-ui/icons/ListAlt';
import PeopleIcon from "@material-ui/icons/People";
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import BarChartIcon from '@material-ui/icons/BarChart';
import ProfileDropDown from '../dialogs/ProfileDropDown';

class Header extends Component {

  constructor(props) {
    super(props);

    // Init an empty state
    this.state = {
      tabindex: 0
    };
  }



  /** Renders the component */
  render() {
   const { user } = this.props;

    return (
      //<Router>

        <Paper variant='outlined'>
        <ProfileDropDown user={user} />
        <Typography variant='h3' component='h1' align='center'>
         SharedShoppingList
        </Typography>
        <Typography variant='h4' component='h2' align='center'>
          Meine Einkaufs-Statistik
        </Typography>



        </Paper>
        //</Router>
    )
  }
}

/** PropTypes */
Header.propTypes = {
  /** The logged in firesbase user */
  user: PropTypes.object,
}

export default Header;