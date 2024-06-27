"use client"

import { Shantell_Sans } from "next/font/google";
import Footer from "./@components/Footer";
import { useRouter } from "next/navigation";

const inter = Shantell_Sans({
  weight: "700",
  subsets: ['latin'],
  display: 'swap',
})

export default function Home() {
  const router = useRouter();
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
          <li className="text-lg font-semibold text-slate-900 dark:text-white cursor-pointer select-none">Premium</li>
          <li className="text-lg font-semibold text-slate-900 dark:text-white cursor-pointer select-none">Contact</li>
        </ul>
        <button className="bg-cyan-800 font-semibold select-none px-4 py-2 rounded-3xl mt-2 hover:bg-slate-600"
          onClick={() => {
            router.push("/auth/login")
          }}
        >Get Started</button>
      </div>
      <div className=" mt-28 flex justify-center">

        <div className=" relative w-1/4 ml-20 scale-125 mt-20">
          <p className={` text-5xl ${inter.className} tracking-tighter`}>Your hangout for laughs , games & friends</p>
          <p className=" font-extralight text-3xl mt-2 font-sans tracking-wider">Power up your downtime: Convoke for cozy chats, classic games, and friend time.</p>
        </div>
        <img
          className="relative dark:drop-shadow-[0_0_0.5rem_#4444ff90] bottom-10 ml-24 select-none"
          src="/disp.png"
          width={500}
        />
      </div>
      <div className=" ml-40 text-lg">
        <br></br>
        <button className="bg-slate-950 text-white font-semibold select-none px-4 py-2 rounded-3xl mt-2 ml-96 hover:opacity-70">Open in Browser</button>
        <button className="bg-white text-black font-semibold select-none px-4 py-2 rounded-3xl mt-2 ml-40 hover:opacity-70">Download</button>
      </div>
      <section className=" my-36">
        <div className=" flex justify-evenly p-8 m-24 border-8 rounded-3xl bg-[#5841db53]">
          <div className="font-extralight text-3xl mt-10 font-sans tracking-wider relative left-36 top-20 "><p className={` text-7xl ${inter.className} tracking-tighter mb-4`}>Dig the past, connect for the future!</p> Groovy group chats with custom emojis & sounds. Get your profile on point with a rad pic, then video chat or blast from the past with voice calls. Let your freak flag fly!</div>
          <img src="/prof.png" width={900} />
        </div>
        <div className=" flex justify-evenly p-8 m-24 py-32 border-8 rounded-3xl bg-[#2600ff27] mt-60">
          <img src="/piece.png" width={2500} />
          <div className="font-extralight text-3xl mt-20 font-sans tracking-wider"><p className={` text-5xl ${inter.className} tracking-tight mb-4`}>Introducing Retroverse: The Real-Time Multiplayer Playground!</p> Welcome to Retroverse, the ultimate destination for reliving classic gaming experiences with friends (or making new ones)!</div>
          <p></p>
        </div >
        <div className=" flex justify-evenly p-8 m-24 py-32 border-8 rounded-3xl bg-[#2600ff27] mt-60">
          <img src="/piece.png" width={2500} />
          <div className="font-extralight text-3xl mt-20 font-sans tracking-wider">
            <p className={` text-5xl ${inter.className} tracking-tighter mb-4`}>Connect and Compete:  Whether you&apos;re a seasoned gamer or a newcomer to the retro scene</p>
            <span className={`text-4xl ${inter.className} tracking-tighter`}>Social Lobby:</span> Mingle with fellow players in the vibrant social lobby before diving into a game.
            <p><span className={`text-4xl ${inter.className} tracking-tighter`}>Friend Finder:</span> Locate friends (old and new) based on shared interests or favorite retro titles.</p>
            <span className={`text-4xl ${inter.className} tracking-tighter`}>Voice Chat:</span> Strategize and reminisce with built-in voice chat functionality.</div>
          <p></p>
        </div >
        <div className=" flex justify-evenly p-8 m-24 py-32 border-8 rounded-3xl bg-[#2600ff27] mt-60">
          <img src="/piece.png" width={2500} />
          <div className="font-extralight text-3xl mt-20 font-sans tracking-wider">
            <p className={` text-5xl ${inter.className} tracking-tight mb-4`}>Relive the Classics:</p>
            Dive into a vast library of iconic retro games, spanning genres like platformers, racing titles, and side-scrolling adventures.  Play timeless classics like Mario, Sonic, or Street Fighter, or explore hidden gems you might have missed.</div>
          <p></p>
        </div >
      </section>
      <div>
        <img
          src="/foot2.png"
        />
      </div>
      <section>{Footer()}</section>
    </main>
  );
}
