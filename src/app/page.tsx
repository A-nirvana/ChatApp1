"use client"

import Image from "next/image";
import { useEffect } from "react";
import {motion} from "framer-motion"

export default function Home() {
  useEffect(()=>{

  },[])

  return (
    <main className="relative flex flex-col min-h-screen pt-6 before:absolute before:h-[300px] before:w-full before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 sm:before:w-[480px] sm:after:w-[240px] before:lg:h-[360px]">

      <div className="h-max flex justify-evenly ">
        <img
          className="relative dark:drop-shadow-[0_0_0.6rem_#ffffff70] dark:invert"
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
        <button className="bg-slate-600 font-semibold select-none px-4 py-2 rounded-3xl mt-2">Get Started</button>
      </div>
      <div className=" mt-28 w-3/4 ml-64">
        <div className=" w-1/3">
        <p className=" font-extrabold text-5xl">Your hangout for laughs, games & friends</p>
        <p className=" font-extralight text-3xl">Level up your fun with Convoke: Chat, play, and conquer with friends. Power up your downtime: Convoke for cozy chats, classic games, and friend time.</p>
        </div>
        </div>
    </main>
  );
}
