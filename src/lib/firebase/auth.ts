import {
    GoogleAuthProvider,
    signInWithPopup,
    onAuthStateChanged as _onAuthStateChanged,
    NextOrObserver,
    User,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword
  } from "firebase/auth";
  
  import { auth } from "./clientApp";
import { setCookie } from "../cookie";
  
export function onAuthStateChanged(cb: NextOrObserver<User>): () => void {
    return _onAuthStateChanged(auth, cb);
}
  
export async function createUser(email : string, password : string): Promise<User | null> {
    try{
        const userCred = await createUserWithEmailAndPassword(auth, email, password);
        setCookie("Authentication", "Bearer " + JSON.stringify(userCred.user), 30);
        return userCred.user;
    }
    catch(error){
        console.log("Error creating new user", error);
        return null;
    }
}

export async function signUser(email : string, password : string){
    try{
        await signInWithEmailAndPassword(auth,email, password)
        .then((userCred)=>{
            setCookie("Authentication", "Bearer " + JSON.stringify(userCred.user), 30)
            return userCred;
          });
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
        setCookie("Authentication", "Bearer " + JSON.stringify(userCred.user), 30);
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