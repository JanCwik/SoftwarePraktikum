import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Grid, Typography, withStyles } from '@material-ui/core';

/**
  * Rendert eine Seite für Benutzer, die noch nicht eingeloggt sind. Es wird ein Sign In Button
  * geliefert, um sich in einen bereits bestehenden Google Account einzuloggen. Die Komponente
  * benutzt Firebase um den Einlogprozess durchzuführen.
 */

class SignIn extends Component {

	/** Behandelt das Klick Event des Sign In Buttons und ruft den prop onSignIn Handler auf.*/
	handleSignInButtonClicked = () => {
		this.props.onSignIn();
	}

	/** Rendert die Sign in Seite, wenn das Benutzer Objekt null ist. */
	render() {
		const { classes } = this.props;
		return (
			<div>
				<Typography className={classes.root} align='center' variant='h6'>Willkommen zur Shared Shopping List</Typography>
				<Typography className={classes.root} align='center'>Melden Sie sich an um die Shopping List zu nutzen</Typography>
				<Grid container justify='center'>
					<Grid item>
						<Button variant='contained' color='primary' onClick={this.handleSignInButtonClicked}>
							Einloggen mit Google
      			</Button>
					</Grid>
				</Grid>
			</div>
		);
	}
}

/** Komponentenspezifisches Styling */
const styles = theme => ({
	root: {
		margin: theme.spacing(2)
	}
});

/** PropTypes */
SignIn.propTypes = {
	/** @ignore */
	classes: PropTypes.object.isRequired,
	/** Handler Funktion, welche aufgerufen wird, wenn sich der Benutzer einloggen will.*/
	onSignIn: PropTypes.func.isRequired,
}

export default withStyles(styles)(SignIn)