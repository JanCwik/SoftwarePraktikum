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



     getArtikelAPP = () => {
        API.getAPI().getArtikel()
            .then(artikel =>
                this.setState({               // Set new state when CustomerBOs have been fetched
          artikel: artikel,

        })).catch(e =>
          this.setState({             // Reset state with error from catch
            artikel: [],

          })
        );


  }

 componentDidMount() {
    this.getArtikelAPP();
  }




   /* componentDidMount() {
        let url= "http://127.0.0.1:5000/shopping/artikel"

        fetch(url).then((response)=>{
             console.log(response)
            this.setState({artikel: response })
            })
        }


*/
    render() {
        //const {newItem, list, customers} = this.state
        return (
            <div className="App">
                <div>
                    {
                        this.state.artikel.map(art => <div key ={art.id}> {art.name} </div>)
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