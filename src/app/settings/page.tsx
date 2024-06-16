"use client"

import { signOut } from "@/lib/firebase/auth";
import { useRouter } from "next/navigation";
import { useUser } from "../UserProvider";
import { useEffect, useState } from "react";
import { User } from "firebase/auth";
export default function () {
    const router = useRouter();

    const currUser = useUser();
    const [user, setUser] = useState<User | null>()
    const [email, setEmail] = useState(user?.email);
    const [username, setUsername] = useState(user?.displayName);
    useEffect(() => {
        setUser(currUser);
        setEmail(currUser?.email)
        setUsername(currUser?.displayName)
      }, [currUser])
    
    return (
        <>
        <main className=" bg-gray-900 h-screen w-screen flex justify-center">
                <section className=" h-screen w-1/3 flex justify-end text-right">
                    <div className=" p-8">
                        <img className=" border-4 rounded-full border-blue-500 hover:opacity-60 bg-white cursor-pointer h-40" id="profile" src={user?.photoURL || undefined}/>
                        {/* <label className="text-red-700 absolute top-1/3 left-[21rem] font-semibold text-3xl opacity-30" htmlFor="profile">EDIT</label> */}
                    </div>
                </section>
                <section className=" bg-gray-800 w-2/3 flex justify-start text-left">
                    <div className=" p-8 flex flex-col">
                        <label htmlFor="username">Username</label>
                        <input className="signup-input mb-6" id='username' value={username || undefined} onChange={(e)=>{setUsername(e.target.value)}}/>
                        <label htmlFor="email">Email</label>
                        <input className="signup-input" id="email" value={email || undefined} onChange={(e)=>{setEmail(e.target.value)}}/>
                        <button className=" bg-red-700 rounded-xl px-3 py-1 absolute bottom-3 right-3" onClick={()=>{
                            signOut();
                            router.push("/")
                        }}>Log Out</button>
                    </div>
                </section>
        </main>
        </>
    )
} 