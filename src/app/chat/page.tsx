"use client"
import { useEffect, useRef, useState } from 'react'
import Contacts from '../@contacts/page'
import "./chat.css"
import { motion } from 'framer-motion';
import { Chat } from '../@contacts';

import { Source_Code_Pro } from 'next/font/google';
import Input from './Input';
import { User } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { currentUser } from '@/lib/getUser';

const inter = Source_Code_Pro({
  weight: "600",
  subsets: ['latin'],
  display: 'swap',
})

function App() {

  // const [socket, setSocket] = useState<WebSocket | null>(null);
  const [current, setCurrent] = useState<Chat>({ name: "", about: "", chats: [], imgLink: "" });
  const [chat, setChat] = useState("")
  const endRef = useRef(null)
  const [user, setUser] = useState<User | null>()
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const current = await currentUser();
      setUser(current);
      console.log(current)
    };
    fetchUser();
  }, [])

  const contacts = Contacts(setCurrent);

  // if(!user){
  //   return (
  //     <p>
  //     Loading
  //     </p>
  //   )
  // }
  return (
    <main className='min-h-screen w-screen flex'>
      <section className=' bg-slate-900 dark:bg-slate-900 w-1/4'>
        <div className=' h-14 pr-1 text-center text-xl font-semibold font-mono pt-3 flex justify-center'>
          <img src='/Untitledlogo.svg' className='h-10 invert -mt-1 dark:drop-shadow-[0_0_0.3rem_#ff0000]' />
        </div>
        <hr className=' bg-purple-600 mb-2 h-1.5 rounded-md dark:drop-shadow-[0_0_0.5rem_#ff44ff80] border-purple-700 w-11/12 ml-4' />
        <div className='mt-2'>{contacts}</div>
        <div className=' absolute bottom-0 py-2 flex w-1/4 bg-slate-600 items-center'>
          <img src={user?.photoURL || undefined} className=' rounded-full h-9 mr-5 ml-5' />
          <div className=' hover:opacity-10'>
            <p className='mt-1 text-sm'>{user ? user.displayName : "user"}</p>
            <p className=' text-xs'>Online</p>
          </div>
          <button onClick={()=>{
            router.push("/settings")
          }} className='absolute right-6 hover:bg-slate-800 p-1 rounded-lg'><img src='/settings.svg' className='h-6 invert hover:rotate-[360deg] hover:transition-all hover:duration-300' /></button>
        </div>
      </section>
      <section className='w-3/4 text-slate-950 dark:text-white max-h-screen'>
        {current.name && <motion.div
            className='box p-2 bg-[#4a4ad1ab] rounded-full mx-2 cursor-pointer h-11 w-11 absolute right-40 top-2'
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
              onClick={()=>{
                router.push("/chatroom");
              }}
            >
              <img src="/video.svg" className='h-8 -mt-0.5'/>
          </motion.div>}
        <div className='bg-white dark:bg-blue-950  h-14 shadow-md shadow-slate-950 text-center'>
          <p className={`font-semibold font-sans ${inter.className}`}>{current.name}</p>
          <p className=' text-sm text-gray-500'>{current.about}</p>
        </div>
        <hr className=' bg-cyan-600 mb-2 h-1.5 rounded-md dark:drop-shadow-[0_0.1rem_0.5rem_#00ffff80] border-cyan-700 w-11/12 ml-12' />
        {current.name &&
          <div className=' w-full overflow-scroll h-5/6'>
            {current.chats.map((chat) => {
              const para = chat.message.split("\n")
              return (
                <motion.div className={` w-full p-3`}>
                  <p className=' font-semibold'>{chat.sender}</p>
                  {para.map((para) => {
                    return (
                      <p className='text-sm'>{para}</p>
                    )
                  })}
                </motion.div>
              )
            })
            }
            <div ref={endRef}></div>
            <div className=' absolute bottom-3 justify-center flex w-3/4'>
              {Input(chat,setChat,current,setCurrent)}
            </div>

          </div>
        }
      </section>

    </main>
  )
}

export default App