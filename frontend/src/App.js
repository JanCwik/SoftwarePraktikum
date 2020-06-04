import React from 'react';


class App extends React.Component {
    constructor(props) {
        super(props);

        this.state={
            newItem:"",
            list:[]
        }
    }

    render() {
        return (
            <div className="App">
                <div>
                    Artikel hinzufügen...
                    <br/>
                    <input
                        type="text"
                        placeholder= "Artikel hier angeben..."
                        value={this.state.newItem}
                        onChange={e => this.updateInput("newItem", e.target.value)}
                        />


                </div>
            </div>
        );
    }
}
export default App;