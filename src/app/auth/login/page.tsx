"use client"

import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRef, useState } from "react";
import { signInWithFacebook, signInWithGoogle, signUser } from "@/lib/firebase/auth";
import { useRouter } from "next/navigation";
import { useUser } from "@/app/UserProvider";
import { useAppStore } from '@/lib/redux/hooks';
import { setUser } from '@/lib/redux/user';

export default function Signup() {
    const store = useAppStore();
    const initialized = useRef(false)
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();
    const user = useUser();
    if (initialized.current) {
        router.refresh();
        router.push("/chat")
    }
    if(user){
        store.dispatch(setUser(user))
        initialized.current = true;
    }
    return (
        <main className="h-screen w-screen flex justify-center items-center">
            <div className=" bg-[#3d3d3d] absolute flex flex-col p-8 z-10 rounded drop-shadow-[-2rem_3rem_3rem_#00000090] text-center">
                <p className="text-xl font-semibold mb-6">Welcome Back !</p>
                <label className=" text-left text-sm ml-3 mt-6">Email</label>
                <input className="signup-input" value={email} onChange={(e) => { setEmail(e.target.value) }} required />
                <label className=" text-left text-sm ml-3 mt-6">Password</label>
                <input className="signup-input" value={password} onChange={(e) => { setPassword(e.target.value) }} required />
                <p>Or Continue with</p>
                <div className="flex justify-center space-x-10 mt-2 mb-6">
                    <button className="p-1 rounded-full border-2 hover:bg-[#22222270]"
                        onClick={(e) => {
                            e.preventDefault();
                            signInWithGoogle().then(user => {
                                if (user.uid) {
                                    toast.success('Logged in SuccessFully', {
                                        position: "top-right",
                                        autoClose: 2000,
                                        hideProgressBar: false,
                                        closeOnClick: true,
                                        pauseOnHover: true,
                                        draggable: true,
                                        progress: undefined,
                                        theme: "dark",
                                        transition: Bounce,
                                    });
                                    setTimeout(() => {
                                        router.refresh();
                                        router.push("/chat");
                                    }, 2000)

                                }
                                else {
                                    toast.error('Error in logging in', {
                                        position: "top-right",
                                        autoClose: 2000,
                                        hideProgressBar: false,
                                        closeOnClick: true,
                                        pauseOnHover: true,
                                        draggable: true,
                                        progress: undefined,
                                        theme: "dark",
                                        transition: Bounce,
                                    });
                                }
                            })
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
                        signUser(email, password);
                    }}
                >Signup</button>

                <p onClick={() => {
                    router.push("/auth/register")
                }}
                    className="text-left mt-10 text-sm text-blue-600 font-semibold hover:underline cursor-pointer">Don&apos;t have an Account? Register</p>
            </div>
                <ToastContainer/>
        </main>
    )
}
