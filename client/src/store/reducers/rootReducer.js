import authReducer from './authReducer';
import departmentReducer from './departmentReducer';
import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase';

const rootReducer = combineReducers({
  auth: authReducer,
  departments: departmentReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer,
});

export default rootReducer;
