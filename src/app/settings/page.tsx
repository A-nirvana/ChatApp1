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
                        <p>Log out</p>
                    </div>
                </section>
                <section className=" bg-gray-800 w-2/3 flex justify-start text-left">
                    <div className=" p-8">
                        <p>Are you sure about that?</p>
                        <button className=" bg-red-700 rounded-xl px-3 mt-2 py-1" onClick={()=>{
                            signOut();
                            router.push("/")
                        }}>Yes</button>
                    </div>
                </section>
        </main>
        </>
    )
} 