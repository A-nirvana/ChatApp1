"use client"

import { Chat } from '../@contacts';
import ReactTextareaAutosize from 'react-textarea-autosize';
import { motion } from 'framer-motion';
import { User } from 'firebase/auth';

export default function Input(chat: string, setChat: Function, current: Chat, setCurrent: Function, file: {file:File | null,url : string}, setFile: Function) {
  return (
    <>
      <input type='file' id='upload-file' hidden onChange={(e) => {
        if(e.target.files)
        setFile({file :e.target.files[0], url : URL.createObjectURL(e.target.files[0])})
      }}></input>
      <label htmlFor="upload-file"><img src='/add.svg' className='h-12 mt-1 cursor-pointer' /></label>
      <div className='flex justify-between w-2/3 border-x-2 mx-4 border-gray-800'>
        <ReactTextareaAutosize maxRows={6} className='w-11/12 bg-transparent bg-opacity-70 py-4 px-6 '
        value={chat}
        onChange={(area) => {
          setChat(area.target.value)
        }}
        placeholder='Type Something'
      />
      {file.file && <img src={file.url} className='h-20 bottom-0 fixed right-60'/>}
      </div>
      
      <motion.div
        className='box p-2 mt-2 rounded-full ml-4 mr-2 cursor-pointer h-10 '
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        onClick={() => {
          if (chat || file.file) {
            const para = current.chats[current.chats.length - 1].message.split("\n");
            current.chats[current.chats.length - 1].sender === "You" && para.length < 6 && !file.file ? current.chats[current.chats.length - 1].message += "\n" + chat : current.chats.push({ sender: "You", message: chat, media: file });
            setChat("");
            setFile({file:null,url:""})
            setCurrent({ name: current.name, about: current.about, chats: current.chats, imgLink: "" })
          }
        }}
      ><img src="/send.svg" className='h-6 mr-0.5' /></motion.div>
      <motion.div
        className='box p-2 mt-2 rounded-full mx-2 cursor-pointer h-10'
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
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

                console.log("Recorded audio URL:", audioUrl);
              });
            })
            .catch((error) => {
              console.error("Error accessing microphone:", error);
            });
        }}
      >
        <img src="/record.svg" className='h-6' />
      </motion.div>

    </>
  )
}

export function profile(user: User, setView: Function) {
  return (
    <>
      <div className='flex bg-[#ff983295] p-8 rounded-2xl ml-5'>
        <button className='absolute rounded-full bg-red-600 start-8 top-4 h-6 w-6' onClick={() => {
          setView(false);
        }}>{"<"}</button>
        <div className='flex flex-col justify-center items-center mr-8'>
          <img src={user.photoURL || undefined} className=' h-20 rounded-full border-2' />
          <p className=' font-semibold text-xl'>{user.displayName}</p>
        </div>
        <div className='flex flex-col'>
          <p className='text-lg font-semibold'>{user.email}</p>
          <p>Verified {user.emailVerified ? "Yes" : "No"}</p>
          <p className=''>Online</p>
          <button className='border-2 rounded py-1 px-2 mt-8 self-end bg-[#3b4bc8c4]'>Edit Profile</button>
        </div>
      </div>
    </>
  )
}