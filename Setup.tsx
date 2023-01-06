import * as React from 'react';
import App from './App';
import firebase from '@react-native-firebase/app';
import Auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import functions from '@react-native-firebase/functions';

const firebaseConfig = {
  apiKey: 'AIzaSyCBdzVITTmslpuz9EDNQw3zUDZas0b6RAc',
  authDomain: 'pss1-bbd09.firebaseapp.com',
  projectId: 'pss1-bbd09',
  storageBucket: 'pss1-bbd09.appspot.com',
  messagingSenderId: '29630197922',
  appId: '1:29630197922:web:784d0bcf146730ac7667fb',
  measurementId: 'G-NDWNV2EWBT'
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
export { firebase, Auth, firestore, functions };

const Setup = () => {
  return <App />;
};

export default Setup;
