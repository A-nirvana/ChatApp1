"use client"

import { signOut } from "@/lib/firebase/auth";
import { useRouter } from "next/navigation";
export default function () {
    const router = useRouter();
    return (
        <>
        <main className=" bg-gray-900 h-screen w-screen flex justify-center">
                <section className=" h-screen w-1/3 flex justify-end text-right">
                    <div className=" p-8">
                        <img className=" border-4 rounded-full border-blue-500 p-2 hover:opacity-60 bg-white cursor-pointer" id="profile" src="/logo.svg"/>
                        {/* <label className="text-red-700 absolute top-1/3 left-[21rem] font-semibold text-3xl opacity-30" htmlFor="profile">EDIT</label> */}
                    </div>
                </section>
                <section className=" bg-gray-800 w-2/3 flex justify-start text-left">
                    <div className=" p-8">
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