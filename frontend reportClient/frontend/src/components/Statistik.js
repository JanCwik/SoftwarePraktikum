import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Button, TextField, InputAdornment, IconButton, Grid, Typography } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import ClearIcon from '@material-ui/icons/Clear'
import { withRouter } from 'react-router-dom';
import  API from "../api/API";
import ContextErrorMessage from './dialogs/ContextErrorMessage';
import LoadingProgress from './dialogs/LoadingProgress';
import StatistikListenEintrag from "./StatistikListenEintrag";

/**
 * Kontrolliert eine Liste von EinzelhaendlerListenEintraegen um ein ExpansionPanel für jeden
 * Einzelhaendler zu erstellen.
 */
class Statistik extends Component {

  constructor(props) {
    super(props);

    // Init ein leeres state
    this.state = {
      statistikeintraege: [],
      error: null,
      loadingInProgress: false,
      startZeitpunkt: null,
      endZeitpunkt: null,
      einzelhaendler: null

    };
  }

    /** Behandelt das onChange Ereignis von dem Einzelhaendler filtern Textfeld */
  einzelhaendlerFieldChange = event => {
    const value = event.target.value
    this.setState({
      einzelhaendler: value
    });
  }

    /** Behandelt das onChange Ereignis von dem Einzelhaendler filtern Textfeld */
  vonFieldChange = event => {
    const value = event.target.value.toLowerCase();
    this.setState({
      startZeitpunkt: value
    });
  }

    /** Behandelt das onChange Ereignis von dem Einzelhaendler filtern Textfeld */
  bisFieldChange = event => {
    const value = event.target.value.toLowerCase();
    this.setState({
      endZeitpunkt: value
    });
  }

  componentDidMount=() =>{
    this.byBenutzer()
  }

  reload=() =>{
    this.byBenutzer()
  }

  byBenutzer =()=>{
    API.getAPI().getStatistikenAPI(this.props.userMail).then(statistiken=>{
      this.setState({
        statistikeintraege: statistiken,
         loadingInProgress: false,   // Ladeanzeige deaktivieren
          error: null
        })}).catch(e =>
          this.setState({             // Setzt state mit Error vom catch zurück
            statistikeintraege: [],
            loadingInProgress: false, // Ladeanzeige deaktivieren
            error: e
          })
        );

    // Setzt laden auf true
    this.setState({
      loadingInProgress: true,
      error: null
    });}


  byEinzelhaendler =()=>{
    API.getAPI().getStatistikenByHaendlerAPI(this.props.userMail, this.state.einzelhaendler).then(statistiken=>{
      this.setState({
        statistikeintraege: statistiken,
         loadingInProgress: false,   // Ladeanzeige deaktivieren
          error: null
        })}).catch(e =>
          this.setState({             // Setzt state mit Error vom catch zurück
            statistikeintraege: [],
            loadingInProgress: false, // Ladeanzeige deaktivieren
            error: e
          })
        );

    // Setzt laden auf true
    this.setState({
      loadingInProgress: true,
      error: null
    });}


  byZeitraum =()=>{
  API.getAPI().getStatistikenByZeitraumAPI(this.props.userMail, this.state.startZeitpunkt, this.state.endZeitpunkt).then(statistiken=>{
      this.setState({
        statistikeintraege: statistiken,
         loadingInProgress: false,   // Ladeanzeige deaktivieren
          error: null
        })}).catch(e =>
          this.setState({             // Setzt state mit Error vom catch zurück
            statistikeintraege: [],
            loadingInProgress: false, // Ladeanzeige deaktivieren
            error: e
          })
        );

    // Setzt laden auf true
    this.setState({
      loadingInProgress: true,
      error: null
    });}



  byEinzelhaendlerUndZeitraum=()=>{
  API.getAPI().getStatistikenByZuHAPI(this.props.userMail, this.state.einzelhaendler,this.state.startZeitpunkt, this.state.endZeitpunkt).then(statistiken=>{
      this.setState({
        statistikeintraege: statistiken,
         loadingInProgress: false,   // Ladeanzeige deaktivieren
          error: null
        })}).catch(e =>
          this.setState({             // Setzt state mit Error vom catch zurück
            statistikeintraege: [],
            loadingInProgress: false, // Ladeanzeige deaktivieren
            error: e
          })
        );

    // Setzt laden auf true
    this.setState({
      loadingInProgress: true,
      error: null
    });
  }


  /** Rendert die Komponente */
  render() {
    const { classes } = this.props;
    const {  einzelhaendler,endZeitpunkt,startZeitpunkt, loadingInProgress, error,statistikeintraege} = this.state;
    return (
      <div className={classes.root}>
        <Grid className={classes.eingabe} container spacing={1} justify='flex-start' alignItems='center'>

          <Grid item xs={2}>
            <TextField
              autoFocus
              fullWidth
              id='einzelhaendler'
              label="Einzelhändler"
              type='text'
              value={einzelhaendler}
              onChange={this.einzelhaendlerFieldChange}
            />
            <Button color="primary" onClick={this.byEinzelhaendler} >
              Suche nach Einzelhändler
            </Button>
              </Grid>
            <Grid item xs={1} />
            <Grid item xs={2}>

             <TextField
              autoFocus
              fullWidth
              id='zeitraumBis'
              type='text'
              label="Von  YYYY-MM-DD"
              value={startZeitpunkt}
              onChange={this.vonFieldChange}
            />
               <TextField
              autoFocus
              fullWidth
              id='zeitraumBis'
              type='text'
              label="Bis   YYYY-MM-DD"
              value={endZeitpunkt}
              onChange={this.bisFieldChange}
            />
             <Button color="primary" onClick={this.byZeitraum} >
              Suche nach Zeitraum
            </Button>
          </Grid>

          <Grid item xs={1} />

          <Grid item>

             <Button color="primary" onClick={this.byEinzelhaendlerUndZeitraum}>
              Suche nach Einzelhändler und Zeitraum
            </Button>
          </Grid>
            <Grid item xs={1} />

          <Grid item>
            <Button color="primary" onClick={this.reload} >
              Suche ohne Filter
            </Button>
              </Grid>
          </Grid>
            <hr/>
        <div className={classes.Top}>
        {
          /** Zeigt die Liste der EinzelhaendlerListenEintrag Komponenten*/
          statistikeintraege.map(statistikeintrag =>
            <StatistikListenEintrag statistikeintrag = {statistikeintrag} key={statistikeintrag.getArtikelID()}

           />)
        }
        </div>

        <LoadingProgress show={loadingInProgress} />
        <ContextErrorMessage error={error} align='center' contextErrorMsg={`Die Statistik konnte nicht geladen werden. Überprüfen Sie den Einzelhändler auf Tippfehler und ob Sie bei Start- und Enddatum das vorgegebene Format eingehalten haben. `} onReload={this.byBenutzer} />

      </div>
    );
  }
}


/*

        <Typography>
          {statistikeintraege[0].getEinzelhaendlerName()? "Meistgekauften Artikel bei " + statistikeintraege[0].getEinzelhaendlerName()  :null}
          {statistikeintraege[0].getStartZeitpunkt()? "Meistgekauften Artikel im Zeitraum Von:" + statistikeintraege[0].getStartZeitpunkt()  :null}
          {statistikeintraege[0].getEndZeitpunkt()? "Bis:" + statistikeintraege[0].getEndZeitpunkt()  :null}

        </Typography>
 */



/** Komponentenspezifisches Styling */
const styles = theme => ({
  root: {
    width: '100%',

  },
  eingabe: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
    marginLeft : theme.spacing(10)

  },
  Top:{
    marginTop: theme.spacing(7),
  }

});

/** PropTypes */
Statistik.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,
  /** @ignore */
  location: PropTypes.object.isRequired,
}

export default withStyles(styles)(Statistik);