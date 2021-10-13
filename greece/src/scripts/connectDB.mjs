// eslint-disable-next-line import/no-unresolved
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';

function connectDB() {
  const firebaseConfig = {
    apiKey: 'AIzaSyA_BlS_0vucMidOD7OzEWND9kwPw7ojg_c',
    authDomain: 'greece-d2a3d.firebaseapp.com',
    databaseURL: 'https://greece-d2a3d-default-rtdb.firebaseio.com',
    projectId: 'greece-d2a3d',
    storageBucket: 'greece-d2a3d.appspot.com',
    messagingSenderId: '769401518786',
    appId: '1:769401518786:web:eec291fd613c097c59d95b',
    measurementId: 'G-C8E617QPC4',
  };

  firebase.initializeApp(firebaseConfig);

  // Get a reference to the database service.
  function databaseInit() {
    return firebase.database().ref('/').once('value');
  }

  return databaseInit()
    .then((answer) => answer.val());
}

export default connectDB;