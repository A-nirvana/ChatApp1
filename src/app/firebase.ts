// firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';
import dotenv from 'dotenv';
import path from 'path';

const t = dotenv.config({path : path.resolve(__dirname, '../.env')});

console.log(t);

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID,
    measurementId: process.env.MEASUREMENT_ID
};

const fireApp = initializeApp(firebaseConfig);
const FireDB = getFirestore(fireApp);
const FireAuth = getAuth(fireApp)

export { FireDB, FireAuth};
