import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {withStyles, Button, ListItem, ListItemSecondaryAction, Link, Typography, ButtonGroup} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import UpdateIcon from '@material-ui/icons/Update';
import  API  from '../api/API';
import List from '@material-ui/core/List';
import Checkbox from '@material-ui/core/Checkbox';
import ListeneintragLoeschen from "./dialogs/ListeneintragLoeschen";
import ListeneintragForm from "./dialogs/ListeneintragForm";
import ListeneintragBO from "../api/ListeneintragBO";


/**
 * Rendert einen Listeneintrag mit einem Delete Button, der auch das Löschen erlaubt.
 *
 * @see See Material-UIs [ListItem](https://material-ui.com/api/list-item/)
 * @see See Material-UIs [Link](https://material-ui.com/components/links/)
 * @see See Material-UIs React Router integration [Composition](https://material-ui.com/guides/composition/#link)
 * @see See React Router [ReactRouter](https://reacttraining.com/react-router/web/guides/quick-start)
 * @see See React Router [Link](https://reacttraining.com/react-router/web/api/Link)
 *


 */
class ListenEintrag extends Component {
    latest() {
      alert("Dies ist der zuletzt geänderte Listeneintrag");
  }

  constructor(props) {
    super(props);

    // Initialisiert ein leeres state
    this.state = {
      listeneintrag: this.props.listeneintrag,
      balance: '',
      loadingInProgress: false,
      deletingInProgress: false,
      loadingError: null,
      deletingError: null,
      showForm: false
    };
  }

  eintragAbhaken = () => {
    let updatedListeneintrag = Object.assign(new ListeneintragBO(), this.state.listeneintrag);
    // Setzt die neuen Attribute aus dem Dialog
    updatedListeneintrag.setErledigt(true)
    API.getAPI().updateListeneintragAPI(updatedListeneintrag)
      this.deleteListeneintragDialogClosed(updatedListeneintrag);
    };



  deleteListeneintragButtonClicked = (event) => {
    event.stopPropagation();
    this.setState({
      showListeneintragDeleteDialog: true
    });
  }

  deleteListeneintragDialogClosed = (listeneintrag) => {
    // Wenn der Artikel nicht gleich null ist, lösche ihn
    if (listeneintrag) {
      this.props.onListeneintragDeleted(listeneintrag);
    }
    if (listeneintrag) {
      if (listeneintrag.getAenderungs_zeitpunkt() === "latest") {
        this.props.reload()
      }
    }
      this.setState({
      showListeneintragDeleteDialog: false
    });
  }

  editButtonClicked=()=>{
    this.setState({
      showForm: true
    })
  }

  /** Behandelt das onClose Ereignis vom ArtikelForm */
  formClosed = (eintrag) => {
    // Artikel ist nicht null und deshalb geändert.
    if (eintrag) {
      this.setState({
        listeneintrag: eintrag,
        showForm: false
      });
    } else {
      this.setState({
        showForm: false
      });
    }
  }


  /** Rendert die Komponente */
  render() {
    const { classes } = this.props;
    const { showListeneintragDeleteDialog, listeneintrag ,loadingInProgress, deletingInProgress, loadingError, deletingError, listeneintragErledigt, showForm } = this.state;

    return (
      <div >
        <List  className={classes.Liste} >
        <ListItem>
          <Checkbox
              onChange={this.eintragAbhaken}
              inputProps={{ 'aria-label': 'primary checkbox' }}
          />

          <Typography color='textPrimary' className={classes.Artikel} >
            {listeneintrag.getArtikel_name()}

          </Typography>
          <Typography className={classes.Menge} color='textPrimary'>
            {listeneintrag.getMenge()?
               listeneintrag.getMenge() +"  "
            : null }
            {listeneintrag.getArtikel_einheit()}
          </Typography>

          <Typography className={classes.Ort} color='textPrimary'>
            {listeneintrag.getEinzelhaendler_name()}
          </Typography>

          <Typography className={classes.Benutzer} color='textPrimary'>
           {listeneintrag.getBenutzer_name()}

           {listeneintrag.getZuletzt_geaendert()?
              <Button  color='secondary' size='small' startIcon={<UpdateIcon/>} onClick={this.latest}>
            </Button>
           : null
          }
          </Typography>

          <ListItemSecondaryAction>
            <Button  color='secondary' size='small' startIcon={<EditIcon />} onClick={this.editButtonClicked}>
            </Button>
            <Button  color='secondary' size='small' startIcon={<DeleteIcon />} onClick={this.deleteListeneintragButtonClicked}>
            </Button>
          </ListItemSecondaryAction>
        </ListItem>
        </List>
        <ListeneintragForm  listeneintrag={listeneintrag} show={showForm} reload={this.props.reload} onClose={this.formClosed} einkaufsliste={this.props.einkaufsliste} />
        <ListeneintragLoeschen show={showListeneintragDeleteDialog}  listeneintrag={listeneintrag} onClose={this.deleteListeneintragDialogClosed} />
      </div>
    );
  }
}

/** Komponentenspezifisches Styling */
const styles = theme => ({
  root: {
    width: '100%'
  },
  buttonMargin: {
    marginRight: theme.spacing(2),
  },
    Artikel: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '25%',
    flexShrink: 0,
    align:'justify'

  },
    Liste:{
    listStyleType: false,
    variant: 'overline'
    },

    Menge: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '25%',
    flexShrink: 0,
    align:'justify'
    },

    Ort: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '25%',
    flexShrink: 0,
    align:'justify'

    },

    Benutzer: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '25%',
    flexShrink: 0,
    align:'justify'

    },




});

/** PropTypes */
ListenEintrag.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,

  listeneintrag: PropTypes.object.isRequired,
}

export default withStyles(styles)(ListenEintrag);
