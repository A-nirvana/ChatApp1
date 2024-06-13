"use client"

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from "react";
import { createUser, signInWithFacebook, signInWithGoogle } from "@/lib/firebase/auth";
import { useRouter } from "next/navigation";

export default function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userName, setUserName] = useState("");
    const router = useRouter();
    router.prefetch("/auth/login")
    return (
        <main className="h-screen w-screen flex justify-center items-center">
            <div className=" bg-[#3d3d3d] absolute flex flex-col p-8 z-10 rounded drop-shadow-[-2rem_3rem_3rem_#00000090] text-center">
                <p className="text-xl font-semibold mb-6">Create an Account</p>
                <label className=" text-left text-sm ml-3 mt-6">Email</label>
                <input className="signup-input" value={email} onChange={(e) => { setEmail(e.target.value) }} />
                <label className=" text-left text-sm ml-3 mt-6">Password</label>
                <input className="signup-input" value={password} onChange={(e) => { setPassword(e.target.value) }} />
                <label className=" text-left text-sm ml-3 mt-6">Username</label>
                <input className="signup-input" value={userName} onChange={(e) => { setUserName(e.target.value) }} />
                <label className=" text-left text-sm ml-3 mt-6">Date of Birth</label>
                <form className=" space-x-2 mb-6"><select className="date">
                    <option value="" disabled selected>Day</option>
                    {Array.from({ length: 31 }, (_, i) => i + 1).map(day => (
                        <option key={day} value={day}>{day}</option>
                    ))}
                </select>
                    <select className="date">
                        <option value="" disabled selected>Month</option>
                        {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map((month, index) => (
                            <option key={index} value={index + 1}>{month}</option>
                        ))}
                    </select>
                    <input className="date" placeholder="Year" /></form>
                <p>Or signup with</p>
                <div className="flex justify-center space-x-10 mt-2 mb-6">
                    <button className="p-1 rounded-full border-2 hover:bg-[#22222270]"
                        onClick={async (e) => {
                            e.preventDefault();
                            const user = await signInWithGoogle()
                            if(user){
                              router.push("/chat");
                              
                            }
                        }}
                    ><img src="/google.svg" className="h-10" /></button>
                    <button className=" rounded-full border-2 p-1 hover:bg-[#22222270]"
                        onClick={(e) => {
                            e.preventDefault();
                            signInWithFacebook()
                            router.push("/chat");
                        }}
                    ><img src="https://assets-global.website-files.com/6257adef93867e50d84d30e2/65a4fe4173c1df8be608c8a2_facebook.svg" className="h-10 invert" /></button>
                </div>

                <button className=" bg-[#1da1f2] p-3 rounded-xl w-2/3 self-center font-semibold"
                    onClick={(e) => {
                        e.preventDefault();
                        createUser(email, password, userName);
                    }}
                >Signup</button>

                <p onClick={()=>{
                    router.push("/auth/login")
                }}
                 className="text-left mt-4 text-sm text-blue-600 font-semibold hover:underline cursor-pointer">Already have an account?</p>
            </div>

        </main>
    )
}
