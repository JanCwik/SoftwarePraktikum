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




    this.state={
      open:false,
      Standardartikel: null,
      Einheit: null,
      name: null

    }

  }





/*
  export default function SimpleSelect() {
  const classes = useStyles();
  const [age, setAge] = React.useState('');
};
*/

   // Funktion die onChange ausgeführt wird um die UseState-Hook "name" zu aktualisieren
   name_bestimmen= (event)=>{
    this.setState({
      name: event.target.value
    })
  }

// Funktion die onChange ausgeführt wird um die UseState-Hook "Standartartikel" zu aktualisieren
   standardartikel_bestimmen = (event) => {
    this.setState({
      Standardartikel: event.target.value
    })
  };

// Funktion die onChange ausgeführt wird um die UseState-Hook "Einheit" zu aktualisieren
     einheit_bestimmen = (event) => {
   this.setState({
      Einheit: event.target.value
    })
   // setEinheit(event.target.value);
  };


   handleClickOpen=(event) =>{
    //setOpen(true);
     event.stopPropagation();
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
    // gibt der Benutzer ein und diese weden dann in UseState-Hooks zwischengespeichert)
    // dann wird die Funktion ArtikelHinzufuegen mit der erstellten Instanz als Parameter ausgefürt
    // anschließend wird handleClose ausgefürt um das Artikelanlegen-Fenster zu schließen
 addArtikel =()=>{

     let newArt = new ArtikelBO();
    newArt.setName(this.name);
    newArt.setEinheit(this.Einheit)
    newArt.setStandardartikel(this.Standardartikel)
    API.getAPI().addArtikelAPI(newArt).catch(e => console.log(e))

    this.handleClose()
}



render() {
const { classes, open} = this.props;
  return (
      <div>
        <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
          Artikel anlegen
        </Button>
        <Dialog open={this.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Anlegen</DialogTitle>
          <DialogContent>
            <DialogContentText>
              In diesem Fenster können sie die gewünschten Artikel in der Datenbank anlegen.
            </DialogContentText>
            <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Artikelname"
                type="name"
                fullWidth
                value={this.name}
                onChange={this.name_bestimmen}
            />
            <FormControl className={classes.formControl}>
              <InputLabel id="demo-simple-select-label">Standardartikel?</InputLabel>
              <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={this.Standardartikel}
                  onChange={this.standardartikel_bestimmen}
              >
                <MenuItem value={true}>Ja</MenuItem>
                <MenuItem value={false}>Nein</MenuItem>

              </Select>
            </FormControl>

            <FormControl>
              <InputLabel id="demo-simple-select-label_2">Einheit</InputLabel>
              <Select
                  labelId="demo-simple-select-label_2"
                  id="demo-simple-select"
                  value={this.Einheit}
                  onChange={this.einheit_bestimmen}

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

ArtikelAnlegen.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired
}
export default withStyles(styles)(ArtikelAnlegen)