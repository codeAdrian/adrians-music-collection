import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/storage';

import { FirebaseOptions } from '@firebase/app-types';

const FIREBASE_CONFIG: FirebaseOptions = {
    apiKey: 'AIzaSyBDCUWI4pB5wAZummqaYemHjJJbJDUcDXI',
    authDomain: 'adrian-s-music-collection.firebaseapp.com',
    databaseURL: 'https://adrian-s-music-collection.firebaseio.com',
    projectId: 'adrian-s-music-collection',
    storageBucket: 'adrian-s-music-collection.appspot.com',
    messagingSenderId: '226107742809',
    appId: '1:226107742809:web:6eacbd99624654e4'
};

export default firebase.initializeApp(FIREBASE_CONFIG);
