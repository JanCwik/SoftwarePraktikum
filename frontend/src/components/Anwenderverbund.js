import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import {ListItemSecondaryAction,IconButton} from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import Collapse from '@material-ui/core/Collapse';
import InboxIcon from '@material-ui/icons/MoveToInbox';
//import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(2),
    backgroundColor: theme.palette.background.paper,

  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

export default function NestedList() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
          <Typography fontWeight="font-WeightMedium"  >
        <ListSubheader component="nav" id="nested-list-subheader">
          Verbunde
        </ListSubheader>
          </Typography>
      }
      className={classes.root}
    >
      <ListItem button>
          <ListItemSecondaryAction>
                <IconButton edge ='end' aria-label='delete'>
                    <DeleteIcon/>
                </IconButton>
            </ListItemSecondaryAction>
        <ListItemText primary="WG" />
      </ListItem>
      <ListItem button>

          <ListItemSecondaryAction>
                <IconButton edge ='end' aria-label='delete'>
                    <DeleteIcon/>
                </IconButton>
            </ListItemSecondaryAction>

        <ListItemText primary="Familie" />
      </ListItem>
      <ListItem button onClick={handleClick}>



        <ListItemText primary="Arbeit" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem button className={classes.nested}>

              <ListItemSecondaryAction>
                <IconButton edge ='end' aria-label='delete'>
                    <DeleteIcon/>
                </IconButton>
            </ListItemSecondaryAction>

              <ListItemText primary="EInkaufslisten" />

          </ListItem>
        </List>
      </Collapse>
    </List>
  );
}
