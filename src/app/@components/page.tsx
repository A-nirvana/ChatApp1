"use client"

import { FireChat } from ".";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { User } from "firebase/auth";
import { bring, getChats, getUser } from "@/lib/firebase/fireStore";
import { DocumentData } from "firebase/firestore";

interface ContactsProps {
    set: Function;
    user: User | null | undefined;
    setContact: Function;
    setChatId: Function;
}

const Contacts: React.FC<ContactsProps> = ({ set, user, setContact, setChatId }) => {
    const [chatList, setChatList] = useState<FireChat[]>([])
    const [current, setCurrent] = useState<FireChat>();
    useEffect(() => {
        if (user) getChats(user).then((List) => {
            setChatList(List.sort((a: FireChat, b: FireChat) => b.updatedAt - a.updatedAt));
        })
    }, [])
    return (
        <main className="flex h-auto flex-col items-center justify-between space-y-3 ">
            {chatList.map((item) => (
                <ChatItem item={item} set={set} setChatId={setChatId} setCurrent={setCurrent} current={current} setContact={setContact}/>
            )
            )}
        </main>
    );
}

export default Contacts


interface ChatItemProps {
    item: FireChat;
    current: FireChat | undefined;
    set: Function;
    setCurrent: Function;
    setChatId: Function;
    setContact: Function
  }
  
const ChatItem: React.FC<ChatItemProps> = ({ item,current,setCurrent,set,setChatId, setContact }) => {
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
                set(item);
                setChatId(item.chatId);
                setContact(reciever)
                console.log(item)
            }}
        >
            <img src={avatar} className="rounded-full mr-4" />
            <div>
                <p className="text-md text-black dark:text-white font-semibold">{name}</p>
                <p className="text-xs text-gray-600">{item.lastMessage}</p>
            </div>

        </motion.div>
    );
  };