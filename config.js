import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

export const firebaseConfig = {
        apiKey: "AIzaSyByj-JoUrg8gyQd5MTQv0hEooWfgrddFfg",
    authDomain: "med2u-7401c.firebaseapp.com",
    projectId: "med2u-7401c",
    storageBucket: "med2u-7401c.appspot.com",
    messagingSenderId: "695776953956",
    appId: "1:695776953956:web:74de656b1a5b6f6f068171"
};

if (!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
}