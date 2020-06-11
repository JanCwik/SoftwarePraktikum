import React from 'react';

import { API } from '../src';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state={
            newItem:"",
            list:[],
            artikel:[]
        }
    }

    updateInput(key, value){
        this.setState({
            [key]: value
        })
    }



addItem (){
        const newItem={
            id: 1 + Math.random(),
            value: this.state.newItem.slice()
        };

        const list = [...this.state.list];
        list.push(newItem);

        this.setState({
            list,
            newItem:""
            }
            );
    }

    deleteItem(id) {
        const list = [...this.state.list];
        const updatedList = list.filter(item => item.id !== id);
        this.setState({list: updatedList});
    }


/*
     //Auf diese weise wurde im bank beispiel auf die API zugegriffen aber diese Umsetzteung funktioniert hier noch nicht


     // Ruft die Methode getArtikel der Klasse API auf und speichert die Response des GET Requests in einem Array "artikel" im State
     // Bei einem Error wird nichts in den State geschrieben
     getArtikelAPP = () => {
        API.getAPI().getArtikel()
            .then(artikel =>
                this.setState({
          artikel: artikel

        })).catch(e =>
          this.setState({
          })
        );
       }
    // wenn der Component "durchlaufen" wurde wird die methode getArtikelAPP aufgerufen
    componentDidMount() {
        this.getArtikelAPP();
        }
*/

  //führt die fetch-Funktion aus, fängt dabei mögliche Errors ab und führt anschließend schon die json-Funktion mit der Response aus.
  #fetchAdvanced = (url, init) => fetch(url, init)
        .then(res => {

            if (!res.ok) {
                throw Error(`${res.status} ${res.statusText}`);
            }
            return res.json();
        }
    )

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



    render() {
        const {artikel} = this.state
        return (
            <div className="App">
                <div>
                    {
                        // Wenn etwas im Array "artikel" im State gespeichert ist ( also wenn das Array eine length hat),
                        // dann wird der Name von jedem Array-eintrag in ein div geschireben und somit angezeigt
                        artikel.length ?
                        artikel.map(art => <div key ={art.id}> {art.name} </div>)
                            : null


                    }

                    <br/>
                    <input
                        type="text"
                        placeholder= "Artikel hier angeben..."
                        value={this.state.newItem}
                        onChange={e => this.updateInput("newItem", e.target.value)}
                        />

                        <button
                            onClick={()=> this.addItem()}
                        >
                            Add
                        </button>
                        <br/>
                        <ul>
                            {this.state.list.map(item => {
                                return(
                                    <li key ={item.id}>
                                        {item.value}
                                        <button
                                            onClick={() => this.deleteItem(item.id)}
                                        >
                                        X
                                        </button>
                                    </li>
                                )
                            })}
                        </ul>
                </div>
            </div>
        );
    }
}
export default App;