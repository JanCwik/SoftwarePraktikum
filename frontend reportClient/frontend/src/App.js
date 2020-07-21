import React from 'react';
import './App.css';
import Statistik from "./components/Statistik";
import 'firebase/auth';
import firebase from 'firebase/app';
import SignIn from "./Pages/SignIn";
import Header from "./components/layout/Header";
import {BrowserRouter as Router, Route, Redirect} from "react-router-dom";


class App extends React.Component{

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



render(){
		const { currentUser, appError, authError, authLoading } = this.state;
  return (
  	  <Router basename={'/'}>
  		 <div className="App">
			 <Header user={currentUser}/>

                        {
							// Is a user signed in?
							currentUser ?
                            <>


      							<Statistik userMail={this.state.currentUser?.email} />

      						</>

								:
								// else show the sign in page
								<>
									<Redirect to='/index.html' />
									<SignIn onSignIn={this.handleSignIn} />
								</>
						}

   		 </div>
	  </Router>
  );
}
}
export default App;
