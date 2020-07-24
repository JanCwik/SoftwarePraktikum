import React, { Component } from 'react';
import Header from "./components/layout/Header";
import {BrowserRouter as Router, Route, Redirect} from "react-router-dom";
import Artikel from "./components/Artikel";
import Anwenderverbund from "./components/Anwenderverbund";
import Einzelhaendler from "./components/Einzelhaendler";
import AlleEinkaufslisten from "./components/AlleEinkaufslisten";
import SignIn from "./Pages/SignIn";
import firebase from 'firebase/app';
import 'firebase/auth';
import LoadingProgress from './components/dialogs/LoadingProgress';
import ContextErrorMessage from './components/dialogs/ContextErrorMessage';
import Einkaufsliste from "./components/Einkaufsliste";
import Container from '@material-ui/core/Container';
class App extends Component {
    #firebaseConfig = {
    apiKey: "AIzaSyCEuXbtugiUUVRXul-bVblzeWgbwivWz50",
    authDomain: "softwarepraktikum-85388.firebaseapp.com",
    databaseURL: "https://softwarepraktikum-85388.firebaseio.com",
    projectId: "softwarepraktikum-85388",
    storageBucket: "softwarepraktikum-85388.appspot.com",
    messagingSenderId: "243362182329",
    appId: "1:243362182329:web:2125e0a6b68f6310f59768"
  };

    constructor(props) {
        super(props);


        this.state = {
			currentUser: null,
			appError: null,
			authError: null,
			authLoading: false
		};

    }

  	/**
	 * Create an error boundary for this app and recieve all errors from below the component tree.
	 *
	 * @See See Reacts [Error Boundaries](https://reactjs.org/docs/error-boundaries.html)
 	 */
	static getDerivedStateFromError(error) {
		// Update state so the next render will show the fallback UI.
		return { appError: error };
	}

	/** Handles firebase usres logged in state changes  */
	handleAuthStateChange = user => {
		if (user) {
			this.setState({
				authLoading: true
			});
			// The user is signed in
			user.getIdToken().then(token => {
				// Add the token to the browser's cookies. The server will then be
				// able to verify the token against the API.
				// SECURITY NOTE: As cookies can easily be modified, only put the
				// token (which is verified server-side) in a cookie; do not add other
				// user information.
				document.cookie = `token=${token};path=/`;

				// Set the user not before the token arrived
				this.setState({
					currentUser: user,
					authError: null,
					authLoading: false
				});
			}).catch(e => {
				this.setState({
					authError: e,
					authLoading: false
				});
			});
		} else {
			// User has logged out, so clear the id token
			document.cookie = 'token=;path=/';

			// Set the logged out user to null
			this.setState({
				currentUser: null,
				authLoading: false
			});
		}
	}

  /**
   * Handles the sign in request of the SignIn component uses the firebase.auth() component to sign in.
	 * @see See Google [firebase.auth()](https://firebase.google.com/docs/reference/js/firebase.auth.Auth)
	 * @see See Google [firebase.auth().signInWithRedirect](https://firebase.google.com/docs/reference/js/firebase.auth.Auth#signinwithredirect)
	 */
	handleSignIn = () => {
		this.setState({
			authLoading: true
		});
		const provider = new firebase.auth.GoogleAuthProvider();
		firebase.auth().signInWithRedirect(provider);
	}

	/**
	 * Lifecycle method, which is called when the component gets inserted into the browsers DOM.
	 * Initializes the firebase SDK.
	 *
	 * @see See Googles [firebase init process](https://firebase.google.com/docs/web/setup)
	 */
	componentDidMount() {
		firebase.initializeApp(this.#firebaseConfig);
		firebase.auth().languageCode = 'en';
		firebase.auth().onAuthStateChanged(this.handleAuthStateChange);
	}



    render() {

	    const { currentUser, appError, authError, authLoading } = this.state;
        return (
            <div  className="App">



                <Router basename={'/'}>
                    <div className="App">
						<Container maxWidth='lg'>
                        <Header user={currentUser}/>
                        {
							// Is a user signed in?
							currentUser ?
                            <>

                            <Redirect from='/' to='/alleEinkaufslisten'/>

                            <Route path='/alleEinkaufslisten'>
                                <AlleEinkaufslisten userMail={this.state.currentUser?.email}/>

                            </Route>

							<Route path='/einkaufsliste'>
                                <Einkaufsliste/>

                            </Route>

                            <Route exact path='/artikel'>
                                <Artikel userMail={this.state.currentUser?.email} />
                            </Route>

                            <Route path='/anwenderverbund'>
                                <Anwenderverbund userMail={this.state.currentUser?.email}/>

                            </Route>

                            <Route path='/einzelhaendler'>
                                <Einzelhaendler userMail={this.state.currentUser?.email} />

                            </Route>

                            </>

								:
								// else show the sign in page
								<>
									<Redirect to='/index.html' />
									<SignIn onSignIn={this.handleSignIn} />
								</>
						}

						<LoadingProgress show={authLoading} />
						<ContextErrorMessage error={authError} contextErrorMsg={`Something went wrong during sighn in process.`} onReload={this.handleSignIn} />
						<ContextErrorMessage error={appError} contextErrorMsg={`Something went wrong inside the app. Please reload the page.`} />

					</Container>
                    </div>

                </Router>



            </div>
        );
    }
}
export default App;

