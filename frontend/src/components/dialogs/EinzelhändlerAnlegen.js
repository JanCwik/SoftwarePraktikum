import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
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


export default function EinzelhändlerAnlegen() {
  const [open, setOpen] = React.useState(false);
  const [Einzelhändler, setEinzelhändler] = React.useState('');
  const classes = useStyles();


/*
  export default function SimpleSelect() {
  const classes = useStyles();
  const [age, setAge] = React.useState('');
};
*/


  const handleChange = (event) => {
    setEinzelhändler(event.target.value);
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
        Einzelhändler anlegen
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Anlegen</DialogTitle>
        <DialogContent>
          <DialogContentText>
              In diesem Fenster können sie den gewünschten Einzelhändler in der Datenbank anlegen.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Einzelhändlername"
            type="name"
            fullWidth
          />

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
