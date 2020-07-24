import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import { Popover, IconButton, Avatar, ClickAwayListener, withStyles, Typography, Paper, Button, Grid, Divider } from '@material-ui/core';
import firebase from 'firebase/app';

/**
 * Zeigt ein Drop down Feld für die Benutzerinfos und die Möglichkeit sich auszuloggen. Um das Pop up Menü zu schließen
 * muss mit der Maus auserhalb des Menüs geklickt werden. Um sich auszuloggen wird die Methode firebase.auth().signOut()
 * verwendet.
 */

class ProfileDropDown extends Component {

  // Eine Referenz zur Avatar Taste
  #avatarButtonRef = createRef();

  constructor(props) {
    super(props);

    // Init das state
    this.state = {
      open: false,
    }
  }

  /** Behandelt Klickevents auf die Avatar Taste und verändert die Sichtbarkeit */
  handleAvatarButtonClick = () => {
    this.setState({
      open: !this.state.open
    });
  }

  /** Behandelt Klickevents des ClickAwayListenerHandles. */
  handleClose = () => {
    this.setState({
      open: false
    });
  }

  /** Behandelt das Klickevent der Ausloggen Taste und benutz die firebase.auth() Komponente um sich einzuloggen. */
  handleSignOutButtonClicked = () => {
    firebase.auth().signOut();
  }

  /** Rendert die Komponente */
  render() {
    const { classes, user } = this.props;
    const { open } = this.state;
    return (
      user ?
        <div>
          <IconButton className={classes.avatarButton} ref={this.#avatarButtonRef} onClick={this.handleAvatarButtonClick}>
            <Avatar src={user.photoURL} />
          </IconButton>
          <Popover open={open} anchorEl={this.#avatarButtonRef.current} onClose={this.handleClose}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}>
            <ClickAwayListener onClickAway={this.handleClose}>
              <Paper className={classes.profileBox}>
                <Typography align='center'>Willkommen</Typography>
                <Divider className={classes.divider} />
                <Typography align='center' variant='body2'>{user.displayName}</Typography>
                <Typography align='center' variant='body2'>{user.email}</Typography>
                <Divider className={classes.divider} />
                <Grid container justify='center'>
                  <Grid item>
                    <Button color='primary' onClick={this.handleSignOutButtonClicked}>Logout</Button>
                  </Grid>
                </Grid>
              </Paper>
            </ClickAwayListener>
          </Popover>
        </div>
        : null
    )
  }
}

/** Komponentenspezifisches Styling */
const styles = theme => ({
  avatarButton: {
    float: 'right'
  },
  divider: {
    margin: theme.spacing(1),
  },
  profileBox: {
    padding: theme.spacing(1),
    background: theme.palette.background.default,
  }
});

/** PropTypes */
ProfileDropDown.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,
  /** Der eingeloggte Firebase User */
  user: PropTypes.object,
}

export default withStyles(styles)(ProfileDropDown)