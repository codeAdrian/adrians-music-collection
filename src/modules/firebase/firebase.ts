import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/storage';
import 'firebase/auth';
import 'firebase/firestore';
import { FirebaseOptions } from '@firebase/app-types';
/*
const FIREBASE_CONFIG: FirebaseOptions = {
    apiKey: 'AIzaSyBDCUWI4pB5wAZummqaYemHjJJbJDUcDXI',
    authDomain: 'adrian-s-music-collection.firebaseapp.com',
    databaseURL: 'https://adrian-s-music-collection.firebaseio.com',
    projectId: 'adrian-s-music-collection',
    storageBucket: 'adrian-s-music-collection.appspot.com',
    messagingSenderId: '226107742809',
    appId: '1:226107742809:web:6eacbd99624654e4'
};
*/

const FIREBASE_CONFIG: FirebaseOptions = {
    apiKey: 'AIzaSyDwHBLX8P5RbZYtAFqgzC6CJOIunA3d0RQ',
    authDomain: 'adrian-s-music-collectio-14bdb.firebaseapp.com',
    databaseURL: 'https://adrian-s-music-collectio-14bdb.firebaseio.com',
    projectId: 'adrian-s-music-collectio-14bdb',
    storageBucket: 'adrian-s-music-collectio-14bdb.appspot.com',
    messagingSenderId: '108526308076',
    appId: '1:108526308076:web:c59f11e8036abd6d'
};

export const firebaseInit = firebase.initializeApp(FIREBASE_CONFIG);
