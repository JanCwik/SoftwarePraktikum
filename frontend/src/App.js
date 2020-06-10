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
     Auf diese weise wurde es im bank beispiel gemacht aber dabei wirft er ein fehler


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

 componentDidMount() {
    this.getArtikelAPP();
  }
*/


  #fetchAdvanced = (url, init) => fetch(url, init)
        .then(res => {

            if (!res.ok) {
                throw Error(`${res.status} ${res.statusText}`);
            }
            return res.json();
        }
    )

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