"use client"

import { getUser } from "@/lib/firebase/fireStore";
import { DocumentData } from "firebase/firestore";
import { motion } from "framer-motion";
import { FireMessage } from "../@components";
import { useEffect, useState } from "react";

interface ChatComp {
    chat: FireMessage;
}

const ChatComponent: React.FC<ChatComp> = ({ chat }) => {
    const [sender, setSender] = useState<DocumentData | undefined>(undefined);

    useEffect(() => {
        getUser(chat.senderId).then((senr) => {
            setSender(senr)
        })
    }, []);
    const d = chat.createdAt.toDate()
    return (
        <motion.div className={` w-full px-1 py-3 flex`}>
            <img src={sender?.avatar} className="h-12 mr-3 rounded-full"/>
            <div className="text-wrap w-full overflow-hidden">
                <p className=' font-semibold'>{sender?.username}    <span className=' text-xs'>{d.toLocaleString()}</span> </p>
                {chat.img && <img src={chat.img} alt="" className="h-60 cursor-pointer"/>}
                <p className=" break-words">{chat.chat}</p>
            </div>
        </motion.div>
    )
}

export default ChatComponent;
