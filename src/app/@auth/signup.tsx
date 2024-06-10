import { useState } from "react";
import { createUser, signInWithFacebook, signInWithGoogle } from "@/lib/firebase/auth";
import { useRouter } from "next/navigation";

export function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userName, setUserName] = useState("");
    const router = useRouter();
    return (
        <>
            <div className=" bg-[#464fb6d8] absolute flex flex-col space-y-3 p-8 z-10 rounded-3xl items-center">
                <input className="signup-input" value={email} onChange={(e)=>{setEmail(e.target.value)}} />
                <input className="signup-input" value={password} onChange={(e)=>{setPassword(e.target.value)}} />
                <input className="signup-input" value={userName} onChange={(e)=>{setUserName(e.target.value)}} />
                <p>Or signup with</p>
                <button className="p-3 rounded-3xl -mb-4 bg-[#ea4335] px-6"
                    onClick={(e)=>{
                        e.preventDefault();
                        signInWithGoogle();
                        setTimeout(()=>{
                            router.push("/chat")
                        },2000) 
                    }}
                >Signup with Google</button>
                <button className=" bg-[#1f4577] p-3 rounded-3xl px-6"
                    onClick={(e)=>{
                        e.preventDefault();
                        signInWithFacebook().then(()=>{
                            router.push("/chat")
                        });
                    }}
                >Signup with Facebook</button>
                <button className=" bg-[#1da1f2] p-3 rounded-3xl px-6"
                    onClick={(e) => {
                        e.preventDefault();
                        createUser(email,password,userName);
                        router.push("/chat")
                    }}
                >Signup</button>
            </div>
        </>
    )
}
