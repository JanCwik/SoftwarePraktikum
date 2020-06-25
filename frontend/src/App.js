import  API  from '../src/api/API';
import React, {Component} from 'react';
import Header from "./components/layout/Header";
import {BrowserRouter as Router, Route, Redirect} from "react-router-dom";
import ArtikelAnlegen from "./components/dialogs/ArtikelAnlegen";
import Anwenderverbund from "./components/Anwenderverbund";
import Einzelhaendler from "./components/Einzelhaendler";
import { Grid, Typography } from '@material-ui/core';
import AnwenderverbundBO from "./api/AnwenderverbundBO";
import ArtikelBO from "./api/ArtikelBO";

//import {Route} from 'react-router-dom'


class App extends React.Component {
    constructor(props) {
        super(props);

        this.state={

            artikel:[]
        }
    }



     // wenn der Component "durchlaufen" wurde wird die methode getArtikelAPP aufgerufen
    componentDidMount() {
        this.getArtikel();
        }



     // Ruft die Methode getArtikel der Klasse API auf und speichert die Response des GET Requests in einem Array "artikel" im State
     // Bei einem Error wird nichts in den State geschrieben
     getArtikel = () => {
        API.getAPI().getArtikelAPI()
            .then(artikel =>
                this.setState({
          artikel: artikel

        })).catch(e =>
          this.setState({
              artikel: []
          })
        );
       }



    render() {
        const {artikel} = this.state
        return (
            <div className="App">


                <Router basename={'/'}>
                    <div className="App">
                        <Header/>
                            <Redirect from='/' to='/artikel'/>
                            <Route exact path='/artikel'>
                                <ArtikelAnlegen/>
                            </Route>

                            <Route path='/anwenderverbund'>
                                <Anwenderverbund/>
                            </Route>

                            <Route path='/einzelhaendler'>
                                <Einzelhaendler/>
                            </Route>
                    </div>
                </Router>


                <div>
                    {
                        // Wenn etwas im Array "artikel" im State gespeichert ist ( also wenn das Array eine length hat),
                        // dann wird der Name von jedem Array-eintrag in ein div geschireben und somit angezeigt
                        artikel.length ?
                        artikel.map(art => <div key ={art.id}> {art.name} </div>)
                            : null

                    }

                </div>
            </div>
        );
    }
}
export default App;

