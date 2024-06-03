"use client"

import { Shantell_Sans } from "next/font/google";
import { useEffect } from "react";
import {motion} from "framer-motion"
import Footer from "./@contacts/Footer";

const inter = Shantell_Sans({
  weight : "700",
  subsets: ['latin'],
  display: 'swap',
})

export default function Home() {
  useEffect(()=>{

  },[])

  return (
    <main className="relative flex flex-col min-h-screen pt-6">

      <div className="h-max flex justify-evenly ">
        <img
          className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff90] dark:invert hover:drop-shadow-[0_0_0.4rem_#ff0035]"
          src="/Untitledlogo.svg"
          alt="HunterChat logo"
          width={180}
        />
        <ul className="flex space-x-12 mt-2">
          <li className="text-lg font-semibold text-slate-900 dark:text-white cursor-pointer select-none">Home</li>
          <li className="text-lg font-semibold text-slate-900 dark:text-white cursor-pointer select-none">Features</li>
          <li className="text-lg font-semibold text-slate-900 dark:text-white cursor-pointer select-none">Pricing</li>
          <li className="text-lg font-semibold text-slate-900 dark:text-white cursor-pointer select-none">Contact</li>
        </ul>
        <button className="bg-cyan-800 font-semibold select-none px-4 py-2 rounded-3xl mt-2 hover:bg-slate-600">Get Started</button>
      </div>
      <div className=" mt-28 flex justify-center">
        <div className=" relative w-1/4 ml-20 scale-125 mt-20">
        <p className={` text-5xl ${inter.className} tracking-tighter`}>Your hangout for laughs , games & friends</p>
        <p className=" font-extralight text-3xl mt-2 font-sans tracking-wider">Power up your downtime: Convoke for cozy chats, classic games, and friend time.</p>
        </div>
        <img 
          className="relative dark:drop-shadow-[0_0_0.5rem_#4444ff90] bottom-10 ml-24"
          src="/disp.png"
          width={500}
        />
      </div>
      <div className=" ml-40 text-lg">
      <br></br>
      <button className="bg-slate-950 text-white font-semibold select-none px-4 py-2 rounded-3xl mt-2 ml-96 hover:opacity-70">Open in Browser</button>
      <button className="bg-white text-black font-semibold select-none px-4 py-2 rounded-3xl mt-2 ml-40 hover:opacity-70">Download</button>
      </div>
      <div>
        <img 
          src="/foot2.png"
        />
      </div>
      <section>{Footer()}</section>
    </main>
  );
}
