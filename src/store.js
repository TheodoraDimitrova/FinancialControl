import { createStore, combineReducers, compose } from 'redux';
import firebase from 'firebase';
import 'firebase/firestore'; // <- needed if using firestore
import { reactReduxFirebase, firebaseReducer } from 'react-redux-firebase';
import { reduxFirestore, firestoreReducer } from 'redux-firestore'; // <- needed if using firestore
//Reducers
import notifyReducer from './reducers/notifyReducer';
import settingsReducer from './reducers/settingsReducer';


const firebaseConfig = {
  apiKey: 'AIzaSyAaDmhb38kSi2Z1iJ6p8V9hqOA1OtBdBVk',
  authDomain: 'financialcontrol-73b3d.firebaseapp.com',
  databaseURL: 'https://financialcontrol-73b3d.firebaseio.com',
  projectId: 'financialcontrol-73b3d',
  storageBucket: 'financialcontrol-73b3d.appspot.com',
  messagingSenderId: '528674278779',
  appId: '1:528674278779:web:cb23ebe1ee5aebd5'
};
// react-redux-firebase config
const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// Initialize other services on firebase instance
//const firestore=firebase.firestore() // <- needed if using firestore

// Add reactReduxFirebase enhancer when making store creator
const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, rrfConfig), // firebase instance as first argument
  reduxFirestore(firebase) // <- needed if using firestore
)(createStore);

// Add firebase to reducers
const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer, // <- needed if using firestore
  notify: notifyReducer,
  settings:settingsReducer
});
// Create store with reducers and initial state
const initialState = {};
const store = createStoreWithFirebase(
  rootReducer,
  initialState,
  compose(
    reactReduxFirebase(firebase),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
