"use client"
import { useEffect, useRef, useState } from 'react'
import Contacts from '../@components/page'
import "./chat.css"
import { motion } from 'framer-motion';
import { FireChat, FireMessage } from '../@components';
import { Source_Code_Pro } from 'next/font/google';
import Input, { profile } from './Input';
import { User } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { useUser } from '../UserProvider';
import { db } from '@/lib/firebase/clientApp';
import { onSnapshot, doc, DocumentData } from 'firebase/firestore';
import AddUser from '../@components/addUser';
import ChatComponent from './ChatComponent';

const inter = Source_Code_Pro({
  weight: "600",
  subsets: ['latin'],
  display: 'swap',
})

function App() {
  const [current, setCurrent] = useState<FireChat>();
  const [reciever, setReciever] = useState<DocumentData | undefined>();
  const [chatId, setChatId] = useState<string>("");
  const [currentChats, setCurrentChats] = useState<DocumentData | undefined>()
  const [chat, setChat] = useState("")
  const [img, setImg] = useState({
    file: null,
    url: ""
  })
  const endRef = useRef<HTMLDivElement>(null)
  const [user, setUser] = useState<User | null>()
  const [view, setView] = useState(false)
  const router = useRouter();
  const currUser = useUser()

  useEffect(() => {
    if(chatId){
      const unSub = onSnapshot(doc(db, "chats", chatId), (res) => {
      setCurrentChats(res.data());
    });

    return () => {
      unSub();
    };
    }
  }, [chatId]);

  useEffect(() => {
    if (endRef.current) {
      endRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [img, chat])

  useEffect(() => {
    setUser(currUser);
  }, [currUser])
  const [add, setAdd] = useState(false)

  if (!user) {
    return (
      <p>
        Loading
      </p>
    )
  }
  
  return (
    <main className='min-h-screen w-screen flex'>
      <section className=' bg-slate-900 dark:bg-slate-900 w-1/4'>
        <div className=' h-14 pr-1 text-center text-xl font-semibold font-mono pt-3 flex justify-center'>
          <img src='/Untitledlogo.svg' className='h-10 invert -mt-1 dark:drop-shadow-[0_0_0.3rem_#ff0000]' />
          <button className='absolute left-[22%] rounded border-2 border-white px-2' onClick={() => {
            setAdd(!add)
          }}>+</button>
          {add && <AddUser />}
        </div>
        <hr className=' bg-purple-600 mb-2 h-1.5 rounded-md dark:drop-shadow-[0_0_0.5rem_#ff44ff80] border-purple-700 w-11/12 ml-4' />
        <div className='mt-2'>{user && <Contacts set={setCurrent} user={user} setContact={setReciever} setChatId={setChatId} />}</div>
        <div className='absolute bottom-16'>{view && profile(user, setView)}</div>
        <div className=' absolute bottom-0 py-2 flex w-1/4 bg-slate-600 items-center'>
          <img src={user?.photoURL || undefined} className={`rounded-full mr-5 ml-5 bg-yellow-100 ${user.photoURL ? 'h-9' : 'h-7 p-0.5'}`} />
          <div className=' hover:opacity-10 cursor-pointer' onClick={() => {
            setView(!view)
          }}>
            <p className='mt-1 text-sm'>{user ? user.displayName : "user"}</p>
            <p className=' text-xs'>Online</p>
          </div>
          <button onClick={() => {
            router.push("/settings")
          }} className='absolute right-6 hover:bg-slate-800 p-1 rounded-lg'><img src='/settings.svg' className='h-6 invert hover:rotate-[360deg] hover:transition-all hover:duration-300' /></button>
        </div>
      </section>
      <section className='w-3/4 text-slate-950 dark:text-white max-h-screen'>
        {reciever && <motion.div
          className='box p-1 border-[#4a4ad1ab] border-2 rounded-full mx-2 cursor-pointer h-11 w-11 absolute right-40 top-2'
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
          onClick={() => {
            router.push("/chatroom");
          }}
        >
          <img src="/video.svg" className='h-8' />
        </motion.div>}
        <div className='bg-white dark:bg-blue-950  h-14 shadow-md shadow-slate-950 text-center'>
          <p className={`font-semibold text-xl pt-1 font-sans ${inter.className}`}>{reciever?.username}</p>
        </div>
        <hr className=' bg-cyan-600 mb-2 h-1.5 rounded-md dark:drop-shadow-[0_0.1rem_0.5rem_#00ffff80] border-cyan-700 w-11/12 ml-12' />
        {reciever &&
          <div className=' w-full overflow-scroll h-5/6 scr'>
            {currentChats?.messages.map( (chat: FireMessage) =>(
              <ChatComponent chat={chat}/>
            ))
            }
            <div ref={endRef}></div>
            <div className=' absolute bottom-0 justify-center flex w-3/4 bg-gray-600'>
              {Input(chat, setChat, img, setImg, currUser, chatId, reciever)}
            </div>

          </div>
        }
      </section>

    </main>
  )
}

export default App