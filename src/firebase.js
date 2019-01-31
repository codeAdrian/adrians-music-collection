import firebase from '../node_modules/firebase/app';
import '../node_modules/firebase/database';
import '../node_modules/firebase/storage';

// Initalize and export Firebase.
const config = {
    apiKey: 'AIzaSyBDCUWI4pB5wAZummqaYemHjJJbJDUcDXI',
    authDomain: 'adrian-s-music-collection.firebaseapp.com',
    databaseURL: 'https://adrian-s-music-collection.firebaseio.com',
    projectId: 'adrian-s-music-collection',
    storageBucket: '',
    messagingSenderId: '226107742809'
};
export default firebase.initializeApp(config);
