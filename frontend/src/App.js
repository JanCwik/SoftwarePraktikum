import { API } from '../src';
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
        this.getArtikelAPP();
        }


     //Auf diese weise wurde im bank beispiel auf die API zugegriffen aber diese Umsetzteung funktioniert hier noch nicht


     // Ruft die Methode getArtikel der Klasse API auf und speichert die Response des GET Requests in einem Array "artikel" im State
     // Bei einem Error wird nichts in den State geschrieben
     getArtikelAPP = () => {
        //API.getAPI()
        this
            .getArtikel()
            .then(artikel =>
                this.setState({
          artikel: artikel

        })).catch(e =>
          this.setState({
              artikel: []
          })
        );
       }




    //diese zwei funktionen stehen genau so nochmal in der API Klasse

    //methode die den GET request ausführt und alle in der Datenbank gespeicherten Artikel ausgibt
    getArtikel() {
        return this.#fetchAdvanced("http://127.0.0.1:5000/shopping/artikel").then((responseJSON) => {

            let artikel = ArtikelBO.fromJSON(responseJSON);


            return new Promise(function (resolve) {
                resolve(artikel);

            })
        })
    }

  //führt die fetch-Funktion aus, fängt dabei mögliche Errors ab und führt anschließend schon die json-Funktion mit der Response aus.
  #fetchAdvanced = (url, init) => fetch(url, init)
        .then(res => {

            if (!res.ok) {
                throw Error(`${res.status} ${res.statusText}`);
            }
            return res.json();
        }
    )
/*
    // vereinfachte umsetztung. funktioniert aber ist unsauber
    //führt einen GET Request aus und fetcht die Response (alle Artikel aus der Datenbank), schreibt sie in die Console
    // und speichert sie in einem Array "artikel" im State
    componentDidMount() {
        let url= "http://127.0.0.1:5000/shopping/artikel"

        this.#fetchAdvanced(url)
            .then((response)=>{
             console.log(response)
            this.setState({artikel: response })
            })
        }

*/

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

