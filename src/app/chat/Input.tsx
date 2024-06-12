"use client"

import { Chat } from '../@contacts';
import ReactTextareaAutosize from 'react-textarea-autosize';
import { motion } from 'framer-motion';

export default function Input(chat : string,setChat : Function ,current : Chat,setCurrent:Function){
    return(
        <>
        <input type='file'></input>
        <ReactTextareaAutosize maxRows={6} className=' w-2/3 bg-transparent bg-opacity-70 py-4 px-6 border-x-2 mx-4 border-gray-800'
            value={chat}
            onChange={(area)=>{
              setChat(area.target.value)
            }}
          />
          <motion.div
            className='box p-2 mt-2 rounded-full ml-4 mr-2 cursor-pointer h-10 '
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
            <img src="/record.svg" className='h-6'/>
          </motion.div>
        
        </>
    )
}