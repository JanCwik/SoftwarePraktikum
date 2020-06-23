import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Typography,Tabs, Tab} from "@material-ui/core";
import {Link as RouterLink} from "react-router-dom"
import FastfoodIcon from "@material-ui/icons/Fastfood";
import PeopleIcon from "@material-ui/icons/People";
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import BarChartIcon from '@material-ui/icons/BarChart';


class Header extends Component {

  constructor(props) {
    super(props);

    // Init an empty state
    this.state = {
      tabindex: 0
    };
  }

  /** Handles onChange events of the Tabs component */
  handleTabChange = (e, newIndex) => {
    // console.log(newValue)
    this.setState({
      tabindex: newIndex
    })
  };

  /** Renders the component */
  render() {
   //const { user } = this.props;

    return (
      //<Router>

        <div>

        <Typography variant='h3' component='h1' align='center'>
         Einkaufsliste
        </Typography>
        <Typography variant='h4' component='h2' align='center'>
          Meine Einkäufe
        </Typography>


            <Tabs indicatorColor='primary' textColor='primary' centered value={this.state.tabindex} onChange={this.handleTabChange} >
              <Tab icon ={<FastfoodIcon/>} label='Artikel' component={RouterLink} to={`/artikel`} />
              <Tab icon ={<PeopleIcon/>} label='Anwenderverbund' component={RouterLink} to={`/anwenderverbund`}/>
              <Tab icon ={<ShoppingCartIcon/>} label='Einzelhändler' component={RouterLink} to={`/einzelhändler`}/>
              <Tab icon ={<BarChartIcon/>} label='Statistik' component={RouterLink} to={`/statistik`}/>
            </Tabs>
        </div>
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