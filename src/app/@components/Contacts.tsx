"use client"

import { FireChat } from ".";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { User } from "firebase/auth";
import { getChats, getUser } from "@/lib/firebase/fireStore";
import { DocumentData, doc, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase/clientApp";
import Loader from "../loading";

interface ContactsProps {
    user: User | null | undefined;
    setContact: Function;
    setChatId: Function;
}

const Contacts: React.FC<ContactsProps> = ({ user, setContact, setChatId }) => {
    const [chatList, setChatList] = useState<FireChat[]>([])
    const [current, setCurrent] = useState<FireChat>();
    useEffect(() => {
        if (user) {
          const unSub = onSnapshot(doc(db, "userChats", user.uid), (res) => {
            const List = res.data()?.chats;
            if(List) setChatList(List.sort((a: FireChat, b: FireChat) => b.updatedAt - a.updatedAt));
          }
        ,(error)=>{
            console.log(error)
        }
        );
          return () => {
            unSub();
          };
        }
      }, [user]);
      useEffect(() => {
        if (user) getChats(user).then((List) => {
            if(List) setChatList(List.sort((a: FireChat, b: FireChat) => b.updatedAt - a.updatedAt));
        })
    }, [])
    if(!chatList){
        return(
            <main>
              <Loader/>
            </main>
        )
    }
    return (
        <main className="h-auto items-center justify-between space-y-3 ">
            {chatList.map((item,key) => (
                <ChatItem item={item} setChatId={setChatId} setCurrent={setCurrent} current={current} setContact={setContact} key={key}/>
            )
            )}
        </main>
    );
}

export default Contacts


interface ChatItemProps {
    item: FireChat;
    current: FireChat | undefined;
    setCurrent: Function;
    setChatId: Function;
    setContact: Function
  }
  
const ChatItem: React.FC<ChatItemProps> = ({ item,current,setCurrent,setChatId, setContact }) => {
    const [reciever, setReciever] = useState<DocumentData | undefined>(undefined);
  
    useEffect(() => {
      if (!reciever) {
        getUser(item.recieverId).then((per) => {
          setReciever(per);
        });
      }
    }, [reciever, item.recieverId]);
  
    const name = reciever?.username;
    const avatar = reciever?.avatar;
  
    return (
        <motion.div
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            key={name}
            className={`w-full h-12 cursor-pointer px-2 flex ${current?.recieverId === name && "bg-slate-800"
                }`}
            onClick={() => {
                setCurrent(item);
                setChatId(item.chatId);
                setContact(reciever)
            }}
        >
            <img src={avatar} className="rounded-full mr-4" />
            <div className="hidden md:block">
                <p className="text-md text-black dark:text-white font-semibold">{name}</p>
                <p className="text-xs text-gray-600">{item.lastMessage}</p>
            </div>

        </motion.div>
    );
  };