"use client"

import { FireChat, media } from '../../components';
import ReactTextareaAutosize from 'react-textarea-autosize';
import { motion } from 'framer-motion';
import { User } from 'firebase/auth';
import { arrayUnion, doc, getDoc, updateDoc } from 'firebase/firestore';
import upload from '@/lib/firebase/storage';
import { db } from '@/lib/firebase/clientApp';
import { useState } from 'react';
import { getAudio } from '../utils/getAudio';

interface inputProps {
  chat: string,
  setChat: Function,
  user: User | null | undefined,
  chatId: string,
  reciever: any
}

const Input: React.FC<inputProps> = ({ chat, setChat, user, chatId, reciever }) => {
  const [rec, setRec] = useState(false)
  const [disp, setDisp] = useState(false)
  const [img, setImg] = useState<media>({
    file: null,
    url: ""
  })
  const [vid, setVid] = useState<media>({
    file: null,
    url: ""
  })
  const [file, setFile] = useState<media>({
    file:null,
    url:""
  })
  const handlesend = async () => {
    let imgUrl = null;
    let vidUrl = null;
    let fileUrl = null;

    try {
      if (img.file) {
        imgUrl = await upload(img.file,'images/');
      }
      if (vid.file) {
        vidUrl = await upload(vid.file, 'videos/')
      }
      if(file.file){
        fileUrl = await upload(file.file, 'files/')
      }

      await updateDoc(doc(db, "chats", chatId), {
        messages: arrayUnion({
          senderId: user?.uid,
          chat,
          createdAt: new Date(),
          ...(imgUrl ? { img: imgUrl } : {}),
          ...(vidUrl ? { vid: vidUrl } : {}),
          ...(fileUrl? { file: fileUrl} : {})
        }),
      });

      const userIDs = [user?.uid, reciever.id];

      userIDs.forEach(async (id) => {
        const userChatsRef = doc(db, "userchats", id);
        const userChatsSnapshot = await getDoc(userChatsRef);

        if (userChatsSnapshot.exists()) {
          const userChatsData = userChatsSnapshot.data();

          const chatIndex = userChatsData.chats.findIndex(
            (c: FireChat) => c.chatId === chatId
          );

          userChatsData.chats[chatIndex].lastMessage = chat;
          userChatsData.chats[chatIndex].isSeen =
            id === user?.uid ? true : false;
          userChatsData.chats[chatIndex].updatedAt = Date.now();

          await updateDoc(userChatsRef, {
            chats: userChatsData.chats,
          });
        }
      });
    } catch (err) {
      console.log(err);
    } finally {
      setImg({
        file: null,
        url: "",
      });
      setVid({
        file: null,
        url: "",
      });

      setChat("");
    }
  }

  return (
    <>
      <button onClick={() => {
        setDisp(!disp)
      }}>
        <img src='/add.svg' className='h-12 mt-1 cursor-pointer invert' />
      </button>
      {disp && <div className='absolute bottom-16 bg-lime-700 rounded-md pr-5 pl-2 py-1 left-[5%]'>
        <input type='file' id='upload-file' hidden onChange={(e) => {
          if (e.target.files)
            setFile({ file: e.target.files[0], url: URL.createObjectURL(e.target.files[0]) })
        }}></input>
        <input type='file' id='upload-img' accept='image/*' hidden onChange={(e) => {
          if (e.target.files)
            setImg({ file: e.target.files[0], url: URL.createObjectURL(e.target.files[0]) })
        }}></input>
        <input type='file' id='up' hidden onChange={(e) => {
          if (e.target.files)
            setVid({ file: e.target.files[0], url: URL.createObjectURL(e.target.files[0]) })
        }}></input>
        <label htmlFor="upload-file" className='flex items-center justify-center cursor-pointer'>File</label>
        <label htmlFor="up" className='flex items-center cursor-pointer'><img src='/vidPlay.svg' className='h-12 mt-1 invert' />Video</label>
        <label htmlFor="upload-img" className='flex items-center cursor-pointer'><img src='/photo.svg' className='h-12 mt-1 invert' />Photo</label>
      </div>
      }

      <div className='flex justify-between w-2/3 border-x-2 mx-4 border-gray-800'>
        <ReactTextareaAutosize maxRows={6} className='w-11/12 bg-transparent bg-opacity-70 py-4 px-6 '
          value={chat}
          onChange={(area) => {
            setChat(area.target.value)
          }}
          placeholder='Type Something'
        />
        {img.file && <img src={img.url} className='h-20 bottom-0 fixed right-60' />}
        {vid.file && <video className='h-20 bottom-0 fixed right-60' preload='metadata'><source src={vid.url + `#t=0.1`}></source></video>}
      </div>
      <motion.div
        className='box p-2 mt-2 rounded-full ml-4 mr-2 cursor-pointer h-10 '
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        onClick={async () => {
          if (chat || img.file || vid.file || file.file) {
            await handlesend();
          }
        }}
      ><img src="/send.svg" className='h-6 mr-0.5 invert' /></motion.div>
      <motion.div
        className='box p-2 mt-2 rounded-full mx-2 cursor-pointer h-10'
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        onClick={() => {
          setRec(!rec)
          getAudio(rec)
        }}
      >
        <img src="/record.svg" className='h-6 invert' />
      </motion.div>

    </>
  )
}

export default Input