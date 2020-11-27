import authReducer from './authReducer';
import departmentReducer from './departmentReducer';
import profileReducer from './profileReducer';
import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase';
import messageReducer from './messageReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  departments: departmentReducer,
  chat: messageReducer,
  profileData: profileReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer,
});

export default rootReducer;
