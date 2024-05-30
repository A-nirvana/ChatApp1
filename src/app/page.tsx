"use client"

import Image from "next/image";
import { useEffect } from "react";
import {motion} from "framer-motion"

export default function Home() {
  useEffect(()=>{

  },[])

  return (
    <main className="flex min-h-screen justify-center p-24">

      <div className="relative z-[-1] flex flex-col place-items-center before:absolute before:h-[300px] before:w-full before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 sm:before:w-[480px] sm:after:w-[240px] before:lg:h-[360px]">
        <Image
          className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] "
          src="/hunlog.png"
          alt="HunterChat logo"
          width={180}
          height={37}
          priority
        />
        <p style={{fontFamily:"Source Code Pro, monospace", "fontWeight" : "600", fontSize : "2.2rem"}} 
          className=""
        >Welcome to HunterChat</p>
        <motion.div className=" w-full h-3/5 border-2 border-white rounded-2xl">

        </motion.div>
      </div>

    </main>
  );
}
