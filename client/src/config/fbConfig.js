import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyBP2VauuXRSQ_z72xFBvG3wDnbW1G3h0xM',
  authDomain: 'ahoy-9a920.firebaseapp.com',
  databaseURL: 'https://ahoy-9a920.firebaseio.com',
  projectId: 'ahoy-9a920',
  storageBucket: 'ahoy-9a920.appspot.com',
  messagingSenderId: '769799102117',
  appId: '1:769799102117:web:92b25f597f3f6292ae374c',
  measurementId: 'G-8V692VTM2N',
};

firebase.initializeApp(firebaseConfig);
firebase.firestore().settings({ timestampsInSnapshots: true });

export default firebase;
