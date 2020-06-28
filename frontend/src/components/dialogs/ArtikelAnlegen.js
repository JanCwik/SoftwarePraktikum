import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import AnwenderverbundBO from "../../api/AnwenderverbundBO";
import ArtikelBO from "../../api/ArtikelBO";
import API from "../../api/API";
import  {withStyles} from '@material-ui/core';
import PropTypes from 'prop-types';



class ArtikelAnlegen extends React.Component {

  constructor(props) {
    super(props);


//Im state werden die Daten die der Benutzer eingibt zwischengespeichert
// Außerdem werden hier die Artkel aus der Datenbank zwischengespeichert bevor sie ausgegeben werden
    this.state={
      open:false,
      Standardartikel: null,
      Einheit: null,
      name: "",
      artikel:[]

    }

  }






   // Funktion die onChange ausgeführt wird um den State "name" zu aktualisieren
   name_bestimmen= (event)=>{
    this.setState({
      name: event.target.value
    })
  }

 // Funktion die onChange ausgeführt wird um den State "Standardartikel" zu aktualisieren
   standardartikel_bestimmen = (event) => {
    this.setState({
      Standardartikel: event.target.value
    })
  };

// Funktion die onChange ausgeführt wird um den State "Einheit" zu aktualisieren
     einheit_bestimmen = (event) => {
   this.setState({
      Einheit: event.target.value
    })

  };

//Diese Funktionen aktualisieren den State "open", durch den gereelt wird
// wann das Dialogfeld angezeigt wird und wann nicht

   handleClickOpen=() =>{
      this.setState({
      open: true
    })
  }

   handleClose=()=> {
    this.setState({
      open: false
    })
  }



  // addArtikel wird ausgeführt wenn auf den Button "hinzufügen" gedrückt wird
    //erstellt eine Instanz der Klasse ArtikelBO und und weist ihr Attribute zu (Die Werte für die Attribute
    // gibt der Benutzer ein und diese weden dann im State zwischengespeichert)
    // dann wird die Funktion ArtikelHinzufuegen mit der erstellten Instanz als Parameter ausgefürt
    // anschließend wird handleClose ausgefürt um das Artikelanlegen-Fenster zu schließen
 addArtikel =()=>{

     let newArt = new ArtikelBO();
    newArt.setName(this.state.name);
    newArt.setEinheit(this.state.Einheit)
    newArt.setStandardartikel(this.state.Standardartikel)
    API.getAPI().addArtikelAPI(newArt).catch(e => console.log(e))

    this.handleClose()
}




     // wenn der Component "durchlaufen" wurde wird die methode getArtikel aufgerufen
    componentDidMount() {
        this.getArtikel();
        }



     // Ruft die Methode getArtikel der Klasse API auf
    // und speichert die Response des GET Requests in einem Array "artikel" im State
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
const {classes} = this.props;  // dadurch kann auf die unten beschriebenen Styles zugegriffen werden
const {artikel,open,Standardartikel,Einheit,name} = this.state


  return (
      <div>
        <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
          Artikel anlegen
        </Button>
          <div>
                    {
                        // Wenn etwas im Array "artikel" im State gespeichert ist ( also wenn das Array eine length hat),
                        // dann wird der Name von jedem Array-eintrag in ein div geschireben und somit angezeigt
                        artikel.length ?
                        artikel.map(art => <div key ={art.id}> {art.name} </div>)
                            : null

                    }

          </div>
          {//der Dialog wird nur angezeigt wenn der State "open" true ist
          }
        <Dialog open={open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Anlegen</DialogTitle>
          <DialogContent>
            <DialogContentText>
              In diesem Fenster können sie die gewünschten Artikel in der Datenbank anlegen.
            </DialogContentText>
            <TextField
                autoFocus
                margin="dense"hb
                id="name"
                label="Artikelname"
                type="name"
                fullWidth
                value={name}
                onChange={this.name_bestimmen}
                //das was der Benutzer eingibt wird durch "value" in den State "name" gespeichert
                // onChange wird der State "name" duech die Funktion name_bestimmen aktualisiert

            />
            <FormControl className={classes.formControl}>
              <InputLabel id="demo-simple-select-label">Standardartikel?</InputLabel>
              <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={Standardartikel}
                  onChange={this.standardartikel_bestimmen}
                  //das was der Benutzer eingibt wird durch "value" in den State "Standardartikel" gespeichert
                // onChange wird der State "Standardartikel" duech die Funktion standardartikel_bestimmen aktualisiert
              >
                <MenuItem value={true}>Ja</MenuItem>
                <MenuItem value={false}>Nein</MenuItem>
                  {// Derbenutzer kann Ja oder Nein auswählen,
                      // bei Ja wird true in den State "Standardartikel" gespeichert
                      //bei nein false
                  }

              </Select>
            </FormControl>

            <FormControl>
              <InputLabel id="demo-simple-select-label_2">Einheit</InputLabel>
              <Select
                  labelId="demo-simple-select-label_2"
                  id="demo-simple-select"
                  value={Einheit}
                  onChange={this.einheit_bestimmen}
                  //das was der Benutzer eingibt wird durch "value" in den State "Einheit" gespeichert
                // onChange wird der State "Einheit" duech die Funktion einheit_bestimmen aktualisiert


              >
                <MenuItem value={"Kg"}>kg</MenuItem>
                <MenuItem value={"Ltr."}>Ltr.</MenuItem>

              </Select>

            </FormControl>

          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="secondary">
              Abbrechen
            </Button>
            <Button onClick={this.addArtikel} color="primary">
              Hinzufügen
            </Button>
          </DialogActions>
        </Dialog>
      </div>
  );
}


}

const styles = theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
})

//die in Styles werden durch withStyles in den DOM "injiziert"


/*
ArtikelAnlegen.propTypes = {

  classes: PropTypes.object.isRequired,

}
*/
export default withStyles(styles)(ArtikelAnlegen)