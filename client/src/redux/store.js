// Basic imports for setting up a store and middlewares
import { createStore, applyMiddleware } from 'redux';
// This is a middleware that will console.log the state as it is being passed from an action to a reducer
import logger from 'redux-logger';

// The main reducer where all of our slices of state combine into
import rootReducer from './root-reducer';

//Setup of the middlewares used after an Action fires off.  This is an array so we can make it modular if later on we want to add more middlewares.
const middlewares = [logger];

// Creation of the actual store. createStore() takes a reducer and then a function that sets up any middlewares we want to use.
const store = createStore(rootReducer, applyMiddleware(...middlewares));

export default store;



