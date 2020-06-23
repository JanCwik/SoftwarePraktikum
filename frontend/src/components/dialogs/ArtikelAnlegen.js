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

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));


export default function ArtikelAnlegen() {
  const [open, setOpen] = React.useState(false);
  const [Standartartikel, setStandardartikel] = React.useState('');
  const [Einheit, setEinheit] = React.useState('');
  const classes = useStyles();
  const [name, setName]=React.useState('');

  //Durch diese UseState-Hooks ist es möglich daten in einem State zwischenzuspeichern, obwohl wir uns
    // in einem Funktion-Component befinden


/*
  export default function SimpleSelect() {
  const classes = useStyles();
  const [age, setAge] = React.useState('');
};
*/

   // Funktion die onChange ausgeführt wird um die UseState-Hook "name" zu aktualisieren
  const name_bestimmen= (event)=>{
    setName(event.target.value)
  }

// Funktion die onChange ausgeführt wird um die UseState-Hook "Standartartikel" zu aktualisieren
  const standardartikel_bestimmen = (event) => {
    setStandardartikel(event.target.value);
  };

// Funktion die onChange ausgeführt wird um die UseState-Hook "Einheit" zu aktualisieren
    const einheit_bestimmen = (event) => {
    setEinheit(event.target.value);
  };


  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }



  // addArtikel wird ausgeführt wenn auf den Button "hinzufügen" gedrückt wird
    //erstellt eine Instanz der Klasse ArtikelBO und und weist ihr Attribute zu (Die Werte für die Attribute
    // gibt der Benutzer ein und diese weden dann in UseState-Hooks zwischengespeichert)
    // dann wird die Funktion ArtikelHinzufuegen mit der erstellten Instanz als Parameter ausgefürt
    // anschließend wird handleClose ausgefürt um das Artikelanlegen-Fenster zu schließen
const addArtikel =()=>{

     let newArt = new ArtikelBO();
    newArt.setName(name);
    newArt.setEinheit(Einheit)
    newArt.setStandardartikel(Standartartikel)
    ArtikelHinzufuegen(newArt)


    handleClose()
}




//führt die fetch-Funktion aus, fängt dabei mögliche Errors ab und führt anschließend schon die json-Funktion mit der Response aus.
  const fetchAdvanced = (url, init) => fetch(url, init)
        .then(res => {

            if (!res.ok) {
                throw Error(`${res.status} ${res.statusText}`);
            }
            return res.json();
        }
    )



//führt einen POST Request aus und schreibt dabei das als Parameter übergebene Artikelobjekt in den Body des Json

  const ArtikelHinzufuegen=(newArt) => {
    let url = "http://127.0.0.1:5000/shopping/artikel"
    return fetchAdvanced(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain',
        'Content-type': 'application/json',
      },
      body: JSON.stringify(newArt)
    }).then((responseJSON) => {
            // We always get an array of CustomerBOs.fromJSON, but only need one object
            let responseArtikelBO = ArtikelBO.fromJSON(responseJSON)[0];
            // console.info(accountBOs);
            return new Promise(function (resolve) {
                resolve(responseArtikelBO);
            })
        })
    }





  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Artikel anlegen
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
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
            value={name}
            onChange={name_bestimmen}
          />
          <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">Standardartikel?</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={Standartartikel}
          onChange={standardartikel_bestimmen}
        >
          <MenuItem value={"Ja"}>Ja</MenuItem>
          <MenuItem value={"Nein"}>Nein</MenuItem>

        </Select>
          </FormControl>

          <FormControl>
                <InputLabel id="demo-simple-select-label_2">Einheit</InputLabel>
        <Select
          labelId="demo-simple-select-label_2"
          id="demo-simple-select"
          value={Einheit}
          onChange={einheit_bestimmen}

        >
          <MenuItem value={"Kg"}>kg</MenuItem>
          <MenuItem value={"Ltr."}>Ltr.</MenuItem>

        </Select>

         </FormControl>

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Abbrechen
          </Button>
          <Button onClick={addArtikel} color="primary">
            Hinzufügen
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}


