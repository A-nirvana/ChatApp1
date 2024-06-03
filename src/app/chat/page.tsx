"use client"
import { useEffect, useState } from 'react'
import Contacts from '../@contacts/page'
import "./chat.css"
import ReactTextareaAutosize from 'react-textarea-autosize';
import { motion } from 'framer-motion';

import { Source_Code_Pro } from 'next/font/google';

const inter = Source_Code_Pro({
  weight : "600",
  subsets: ['latin'],
  display: 'swap',
})

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
  interface Chat {
    name: string;
    about: string;
    chats: { sender: string; message: string }[];
    imgLink : string
  }
  const [current, setCurrent] = useState<Chat>({ name: "", about: "", chats: [], imgLink : "" });
  const [chat, setChat] = useState("")

  return (
    <main className='min-h-screen w-screen flex'>
      <section className=' bg-slate-900 dark:bg-slate-900 w-1/4'>
        <div className=' h-14 pr-1 text-center text-xl font-semibold font-mono pt-3 flex justify-center'>
          <img src='/Untitledlogo.svg' className='h-10 invert -mt-1 dark:drop-shadow-[0_0_0.3rem_#ff0000]'/>
        </div>
        <hr className=' bg-purple-600 mb-2 h-1.5 rounded-md dark:drop-shadow-[0_0_0.5rem_#ff44ff80] border-purple-700 w-11/12 ml-4'/>
        <div className='mt-2'>{Contacts(setCurrent)}</div>
        
      </section>
      <section className='w-3/4 text-slate-950 dark:text-white max-h-screen'>
        <div className='bg-white dark:bg-blue-950  h-14 shadow-md shadow-slate-950 text-center'><p className={`font-semibold font-sans ${inter.className}`}>{current.name}</p><p className=' text-sm text-gray-500'>{current.about}</p></div>
        <hr className=' bg-cyan-600 mb-2 h-1.5 rounded-md dark:drop-shadow-[0_0.1rem_0.5rem_#00ffff80] border-cyan-700 w-11/12 ml-12'/>
        {current.name &&
        <div className=' w-full overflow-scroll h-5/6'>
          {current.chats.map((chat)=>{
            const para = chat.message.split("\n")
            return(
              <motion.div className={` w-full p-3`}>
                <p className=' font-semibold'>{chat.sender}</p>
                {para.map((para)=>{
                  return(
                    <p className='text-sm'>{para}</p>
                  )
                })}
              </motion.div>
            )
          })
          }
        <div className=' absolute bottom-3 justify-center flex w-3/4'>
          <ReactTextareaAutosize maxRows={6} className=' w-1/2 bg-slate-700 bg-opacity-70 rounded-md py-2 px-6 shadow-xl mx-4'
            value={chat}
            onChange={(area)=>{
              setChat(area.target.value)
            }}
          />
          <motion.div
            className='box p-2 bg-slate-600 rounded-full ml-4 mr-2 cursor-pointer h-10 '
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            onClick={()=>{
              if(chat){
                const para = current.chats[current.chats.length-1].message.split("\n");
                current.chats[current.chats.length-1].sender === "You" && para.length<6 ? current.chats[current.chats.length-1].message += "\n" + chat : current.chats.push({sender : "You", message : chat});
                setChat("");
                setCurrent({name : current.name, about : current.about, chats : current.chats, imgLink: "" })
              }
            }}
          ><img src="/send.svg" className='h-6 mr-0.5'/></motion.div>
          <motion.div
            className='box p-2 bg-slate-600 rounded-full mx-2 cursor-pointer h-10'
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            // onClick={()=>{
            //   current.chats.push({ sender: "Jane Smith", message: "Likewise" },);
            //   setCurrent({name : current.name, about : current.about, chats : current.chats, imgLink: "" })
            // }}
            onClick={() => {
              navigator.mediaDevices.getUserMedia({ audio: true })
                .then((stream) => {
                  const mediaRecorder = new MediaRecorder(stream);
                  const chunks: Blob[] = [];
                  mediaRecorder.start();
                  mediaRecorder.addEventListener("dataavailable", (event) => {
                    chunks.push(event.data);
                  });

                  mediaRecorder.addEventListener("stop", () => {
                    const audioBlob = new Blob(chunks, { type: "audio/webm" });
                    const audioUrl = URL.createObjectURL(audioBlob);

                    // Do something with the recorded audio
                    console.log("Recorded audio URL:", audioUrl);
                  });
                })
                .catch((error) => {
                  console.error("Error accessing microphone:", error);
                });
            }}
          >
            <img src="/record.svg" className='h-6'/>
          </motion.div>
        </div>
        
        </div>
        }
      </section>
      
    </main> 
  )
}

export default App