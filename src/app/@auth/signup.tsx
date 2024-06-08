
import { createUserWithEmailAndPassword, signInWithRedirect } from "firebase/auth";
import { FireAuth } from "../firebase";
import { GoogleAuthProvider } from "firebase/auth";
import {setCookie} from "../cookie"

import { useAuthState } from 'react-firebase-hooks/auth'
import { useState } from "react";

export function Signup() {
    const provider = new GoogleAuthProvider();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    return (
        <>
            <div className=" bg-[#464fb6d8]">
                <input value={email} onChange={(e)=>{setEmail(e.target.value)}} />
                <input value={password} onChange={(e)=>{setPassword(e.target.value)}} />
                <input />
                <p>Or signup with</p>
                <button
                    onClick={async ()=>{
                        provider.addScope('profile')
                        provider.addScope('email')
                        await signInWithRedirect(FireAuth,provider)
                    }}
                >Signup with Google</button>
                <button>Signup with Facebook</button>
                <button
                    onClick={() => {
                        createUserWithEmailAndPassword(FireAuth, email, password)
                            .then((userCredential) => {
                                const user = userCredential.user;
                                setCookie('UserCredential',"UserId "+user.uid,30);
                            })
                            .catch((error) => {
                                const errorCode = error.code;
                                const errorMessage = error.message;
                            });
                    }}
                >Signup</button>
            </div>
        </>
    )
}
