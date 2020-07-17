import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Button } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import AutorenewIcon from '@material-ui/icons/Autorenew';


/**
 *Zeigt eine Error Nachricht, in einem gegebenen Komponenten Kontext,
 * wenn ein Error Object nicht null ist.
 */
class ContextErrorMessage extends Component {
  #standardText = 'Da ist wohl etwas schief gelaufen...';

  /** Rendert die ContextErrorMessage, wenn der Error nicht null ist.  */
  render() {
    const { classes, error, contextErrorMsg, onReload } = this.props;

    return (
      (error !== null) ?
        <Alert severity='error' className={classes.root}>
          <div>
            {this.#standardText}
          </div>
          <AlertTitle>
            {contextErrorMsg}
          </AlertTitle>
          <div className={classes.margins}>
            Error Nachricht (nur für debugging) ist:
        </div>
          <div>
            {error.message}
          </div>
          {
            onReload ?
              <div className={classes.margins}>
                <Button variant='contained' color='primary' startIcon={<AutorenewIcon />} onClick={onReload}>
                  Reload
            </Button>
              </div>
              : null
          }
        </Alert>
        : null
    );
  }
}

/** Komponentenspezifische Stile */
const styles = theme => ({
  margins: {
    marginTop: theme.spacing(2)
  }
});

/** PropTypes */
ContextErrorMessage.propTypes = {
  classes: PropTypes.object.isRequired,
  /**
   * Das Error Objekt, welches die Error Nachricht auslöst.
   * Wenn dieses nicht null ist wird die Error Nachricht angezeigt.
   */
  error: PropTypes.object,
  /**  Die Error Nachricht, die im Kontext angezeigt wird. */
  contextErrorMsg: PropTypes.string,
  /**
   * Ein Handler für das onReload Ereignis. Dieser erscheint, wenn man auf die Reload Taste klickt.
   * Wenn solch eine Taste vorhanden ist, wird dieser Handler ausgeführt.
   */
  onReload: PropTypes.func
}

export default withStyles(styles)(ContextErrorMessage);