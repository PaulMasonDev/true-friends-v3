// firebase/firebase.utils.js

import firebase from 'firebase/app'; // Standard boilerplate
import 'firebase/firestore'; // Import for firebase db
import 'firebase/auth';// Import for firebase user authentication

// This config object is from the firebase website
const config = {
  apiKey: "AIzaSyD8y41qQwBv9q6f-1dXMbhQFUWxCjxK4cc",
  authDomain: "true-friends-97f01.firebaseapp.com",
  databaseURL: "https://true-friends-97f01.firebaseio.com",
  projectId: "true-friends-97f01",
  storageBucket: "true-friends-97f01.appspot.com",
  messagingSenderId: "303401751388",
  appId: "1:303401751388:web:68269897f7cb85913a2799",
  measurementId: "G-JYS8QF2JXD"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  // If no user signed in, then return out of function.
  if(!userAuth) return; 

  // Create a user reference that we will perform CRUD operations on.  we can refer to "userRef" and perform the CRUD operations there.
  const userRef = firestore.doc(`users/${userAuth.uid}`);

  //Read-only get request of the user info.  We do not use snapShot to perform CRUD operations.
  const snapShot = await userRef.get();
  console.log(snapShot);

  // If there is no user in the database already with that uid...
  if(!snapShot.exists) { // Does the "exists" property of snapshot read false
    const { displayName, email } = userAuth // Dest. these values out of userAuth
    const createdAt = new Date(); // Generate the creation date

    // Async try block to add user data to the database (...addditionalData as well).
    try {
      userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    } catch(error) {
      console.log('Error creating user', error.message);
    }
  }
  // return the data in case we need it later
  return userRef; 
}

firebase.initializeApp(config); // Initializes firebase with the object data

export const auth = firebase.auth(); //Related to authentication
export const firestore = firebase.firestore(); // Database setup

const provider = new firebase.auth.GoogleAuthProvider();

// Triggers the Google auth system whenever the prompt of select_account is triggered
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;

