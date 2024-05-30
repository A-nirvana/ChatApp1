"use client"
import { useEffect, useState } from 'react'
import Contacts from '../contacts/page'
import "./chat.css"
import ReactTextareaAutosize from 'react-textarea-autosize';
import { motion } from 'framer-motion';

function App() {
  // const [socket, setSocket] = useState<WebSocket | null>(null);

  // useEffect(() => {
  //   const newSocket = new WebSocket('ws://localhost:8080');
  //   newSocket.onopen = () => {
  //     console.log('Connection established');
  //   }
  //   newSocket.onmessage = (message) => {
  //     console.log('Message received:', message.data);
  //   }
  //   setSocket(newSocket);
  //   return () => newSocket.close();
  // }, [])

  interface Chat{
    name: string;
    last: string;
  }

  const [current, setCurrent] = useState<Chat>({name: "", last: ""});

  return (
    <main className='min-h-screen w-screen flex'>
      <section className=' bg-slate-900 dark: bg-slate-900 w-1/4'>
        <div className=' h-14 shadow-md shadow-slate-950 -mb-1 mb-4 pr-1 text-center text-xl font-semibold font-mono pt-3 flex justify-center'>
          <img src='../favicon.ico' className='h-6'/>HuntersOfficial</div>
        <div>{Contacts(setCurrent)}</div>
        
      </section>
      <section className='bg-white dark:bg-slate-800 w-3/4 text-slate-950 dark:text-white'>
        <div className=' h-14 shadow-md shadow-slate-950 mb-4 text-center'><p>{current.name}</p>{current.last}</div>
        {current.name &&
        <div className=' w-full'>
        <div className=' absolute bottom-8 justify-center flex w-3/4'>
          <ReactTextareaAutosize maxRows={6} className=' w-1/2 bg-slate-700 bg-opacity-70 rounded-md py-2 px-6 shadow-xl mx-4'/>
          <motion.div
            className='box p-2 bg-slate-600 rounded-full mx-4 cursor-pointer'
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          ><img src="/send.svg" className='h-6 mr-0.5'/></motion.div>
          <div ></div>
        </div>
        
        </div>
        }
        <div>

        </div>
      </section>
      
    </main> 
  )
}

export default App