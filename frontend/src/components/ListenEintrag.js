import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {withStyles, Button, ListItem, ListItemSecondaryAction, Link, Typography, ButtonGroup} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import SwapHoriz from '@material-ui/icons/SwapHoriz';
import { Link as RouterLink } from 'react-router-dom';
import { API } from '../api';
import List from '@material-ui/core/List';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import ListeneintragLoeschen from "./dialogs/ListeneintragLoeschen";


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

  constructor(props) {
    super(props);

    // Initialisiert ein leeres state
    this.state = {
      balance: '',
      loadingInProgress: false,
      deletingInProgress: false,
      loadingError: null,
      deletingError: null,
      checked:false

    };
  }


handleCheck =(event)=>{
    this.setState({
      checked: event.target.checked
        }
    )
}

  deleteListeneintragButtonClicked = (event) => {
    event.stopPropagation();
    this.setState({
      showListeneintragDeleteDialog: true
    });
  }

  /** Rendert die Komponente */
  render() {
    const { classes, listeneintrag } = this.props;
    const { showListeneintragDeleteDialog, loadingInProgress, deletingInProgress, loadingError, deletingError, checked } = this.state;

    return (
      <div >
        <List  className={classes.Liste} >
        <ListItem >
          <Checkbox
              checked={checked}
              onChange={this.handleCheck}
              inputProps={{ 'aria-label': 'primary checkbox' }}
          />

          <Typography color='textPrimary' className={classes.Artikel} >
            {listeneintrag.getArtikel_name()}

          </Typography>
          <Typography className={classes.Menge} color='textPrimary'>
            {listeneintrag.getMenge()+"  "}
            {listeneintrag.getArtikel_einheit()}
          </Typography>

          <Typography className={classes.Ort} color='textPrimary'>
            {listeneintrag.getEinzelhaendler_name()}
          </Typography>

          <Typography className={classes.Benutzer} color='textPrimary'>
           {listeneintrag.getBenutzer_name()}
          </Typography>

          <ListItemSecondaryAction>
            <Button  color='secondary' size='small' startIcon={<EditIcon />} onClick={this.editListeneintrag}>
            </Button>
            <Button  color='secondary' size='small' startIcon={<DeleteIcon />} onClick={this.deleteListeneintragButtonClicked}>
            </Button>
          </ListItemSecondaryAction>
        </ListItem>
        </List>
        <ListeneintragLoeschen show={showListeneintragDeleteDialog} listeneintrag={listeneintrag} artikel={listeneintrag.getArtikel_name} onClose={this.deleteListeneintragDialogClosed} />
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
