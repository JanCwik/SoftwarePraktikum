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

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));


export default function Artikel_anlegen() {
  const [open, setOpen] = React.useState(false);
  const [Standartartikel, setArtikel] = React.useState('');
  const [Einheit, setEinheit] = React.useState('');
  const classes = useStyles();


/*
  export default function SimpleSelect() {
  const classes = useStyles();
  const [age, setAge] = React.useState('');
};
*/


  const handleChange = (event) => {
    setArtikel(event.target.value);
  };

    const einheit_bestimmen = (event) => {
    setEinheit(event.target.value);
  };


  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
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
          />
          <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">Standardartikel?</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={Standartartikel}
          onChange={handleChange}
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
          <MenuItem value={"Ja"}>kg</MenuItem>
          <MenuItem value={"Nein"}>Ltr.</MenuItem>

        </Select>

         </FormControl>

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Abbrechen
          </Button>
          <Button onClick={handleClose} color="primary">
            Hinzufügen
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

//export default Form;
