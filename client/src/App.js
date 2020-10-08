import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import HomePage from './pages/homepage/HomePage';
import Header from './components/Header/Header';
import About from './pages/About/About';
import Contact from './pages/Contact/Contact';
import SignInAndSignUp from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { setCurrentUser } from './redux/user/user.actions';


import './App.scss';

class App extends React.Component {
  constructor(){
    super();

    this.state = {
      currentUser: null
    }
  }

  unsubscribeFromAuth = null;

  componentDidMount () {
    // Opens a constant connection of the user to the session as long as the application is running.
    const { setCurrentUser } = this.props;
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      // If the user is signed in
      if (userAuth) {
        // Gettting the User Document Returned from the function in firebase config
        // and storing it as userRef
        const userRef = await createUserProfileDocument(userAuth);

        // onSnapshot() will allow you to use snapshot data in order to set the state inside react. snapShot.data() is necessary to access the data from the firestore DB.
        userRef.onSnapshot(snapShot => {
          setCurrentUser({
              id: snapShot.id,
              ...snapShot.data()
          });
        });
      }
      setCurrentUser(userAuth);
    });
  }

  componentWillUnmount() {
    // Closes subscription
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header />  
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/about" component={About} />
          <Route path="/contact" component={Contact} />
          <Route path="/signin" component={SignInAndSignUp} />
        </Switch> 
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(null, mapDispatchToProps)(App);