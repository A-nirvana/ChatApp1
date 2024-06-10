'use client';

import { initializeApp, getApps } from "firebase/app";
// import { firebaseConfig } from "./config";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyC89PhiRL8PJ6heGuEczCfJsr2r86yXKIw",

  authDomain: "hunterchat-48b60.firebaseapp.com",

  projectId: "hunterchat-48b60",

  storageBucket: "hunterchat-48b60.appspot.com",

  messagingSenderId: "583967324248",

  appId: "1:583967324248:web:f7625302b777360878b22d",

  measurementId: "G-L5BJ6VDB54"

  };
  
export const firebaseApp =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);
export const storage = getStorage(firebaseApp);