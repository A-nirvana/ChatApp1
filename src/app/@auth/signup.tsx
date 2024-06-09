import { useState } from "react";
import { createUser, signInWithGoogle } from "@/lib/firebase/auth";
import { useUser } from "@/lib/getUser";

export function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    return (
        <>
            <div className=" bg-[#464fb6d8] absolute flex flex-col space-y-3 p-8 z-10 rounded-3xl">
                <input className="p-2 rounded-3xl text-black" value={email} onChange={(e)=>{setEmail(e.target.value)}} />
                <input className="p-2 rounded-3xl text-black" value={password} onChange={(e)=>{setPassword(e.target.value)}} />
                <input className="p-2 rounded-3xl text-black" />
                <p>Or signup with</p>
                <button className="p-3 rounded-3xl -mb-4 bg-[#ea4335]"
                    onClick={(e)=>{
                        e.preventDefault();
                        signInWithGoogle()
                        window.location.href = "/chat";
                    }}
                >Signup with Google</button>
                <button className=" bg-[#1f4577] p-3 rounded-3xl">Signup with Facebook</button>
                <button className=" bg-[#1da1f2] p-3 rounded-3xl"
                    onClick={(e) => {
                        e.preventDefault();
                        createUser(email,password);
                    }}
                >Signup</button>
            </div>
        </>
    )
}
