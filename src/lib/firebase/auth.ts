import {
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
  onAuthStateChanged as _onAuthStateChanged,
  NextOrObserver,
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile
} from "firebase/auth";

import { auth } from "./clientApp";
import { setCookie } from "../cookie";

export function onAuthStateChanged(cb: NextOrObserver<User>): () => void {
  return _onAuthStateChanged(auth, cb);
}

export async function createUser(email : string, password : string, userName : string): Promise<User | null> {
  try{
      const userCred = await createUserWithEmailAndPassword(auth, email, password);
      if (auth.currentUser) {
        updateProfile(auth.currentUser, {
            displayName : userName
        });
        return userCred.user;
    } else {
        throw new Error("Current user is null");
    }
  }
  catch(error){
      console.log("Error creating new user", error);
      return null;
  }
}

export async function signUser(email : string, password : string){
  try{
      const userCred = await signInWithEmailAndPassword(auth,email, password);
      return userCred;
  }
  catch(error){
      console.log("Error Signing in", error)
  }
}

export async function signInWithGoogle() {
  const provider = new GoogleAuthProvider();

  try {
    await signInWithPopup(auth, provider)
    .then((userCred)=>{
      return userCred.user;
    });
  } catch (error) {
    console.error("Error signing in with Google", error);
  }
}

export async function signInWithFacebook() {
  const provider = new FacebookAuthProvider();

  try {
    await signInWithPopup(auth, provider)
    .then((userCred)=>{
      return userCred.user;
    });
  } catch (error) {
    console.error("Error signing in with Google", error);
  }
}

export async function signOut() {
  try {
    return auth.signOut();
  } catch (error) {
    console.error("Error signing out with Google", error);
  }
}