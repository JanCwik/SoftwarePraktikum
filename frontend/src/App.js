import  API  from '../src/api/API';
import React, {Component} from 'react';
import Header from "./components/layout/Header";
import {BrowserRouter as Router, Route, Redirect} from "react-router-dom";
import Artikel from "./components/Artikel";
import Anwenderverbund from "./components/Anwenderverbund";
import Einzelhaendler from "./components/Einzelhaendler";
import { Grid, Typography } from '@material-ui/core';
import AnwenderverbundBO from "./api/AnwenderverbundBO";
import ArtikelBO from "./api/ArtikelBO";
import Listeneintrag from "./components/ListenEintrag";


//import {Route} from 'react-router-dom'


class App extends React.Component {
    constructor(props) {
        super(props);

    }





    render() {

        return (
            <div className="App">


                <Router basename={'/'}>
                    <div className="App">
                        <Header/>
                            <Redirect from='/' to='/artikel'/>
                            <Route exact path='/artikel'>
                                <Artikel/>
                            </Route>

                            <Route path='/anwenderverbund'>
                                <Anwenderverbund/>
                                <Listeneintrag/>
                            </Route>

                            <Route path='/einzelhaendler'>
                                <Einzelhaendler/>

                            </Route>
                    </div>
                </Router>



            </div>
        );
    }
}
export default App;

