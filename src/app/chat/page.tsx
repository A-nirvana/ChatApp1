"use client"
import { useEffect, useState } from 'react'
import Contacts from '../contacts/page'

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

  const [current, setCurrent] = useState<Chat>({name: "1", last: "Abrea"});

  return (
    <main className='min-h-screen w-screen flex'>
      <section className=' bg-white dark: bg-slate-900 w-1/4'>
        <div className=' h-14 shadow-md shadow-slate-950 -mb-1 mb-4 pr-1'>ew</div>
        <div>{Contacts(setCurrent)}</div>
        
      </section>
      <section className='bg-white dark:bg-slate-800 w-3/4 text-slate-950 dark:text-white'>
        <div className=' h-14 shadow-md shadow-slate-950 mb-4'>{current.name}</div>
        <div >{current.last}</div>
      </section>
      
    </main> 
  )
}

export default App