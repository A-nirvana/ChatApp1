"use client"

import { getUser } from "@/lib/firebase/fireStore";
import { DocumentData } from "firebase/firestore";
import { motion } from "framer-motion";
import { FireMessage } from "../../components";
import { useEffect, useState } from "react";
import Image from "next/image";

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
            <img src={sender?.avatar} className="h-12 mr-3 rounded-full" />
            <div className="text-wrap w-full overflow-hidden">
                <p className=' font-semibold'>{sender?.username}    <span className=' text-xs'>{d.toLocaleString()}</span> </p>
                {chat.img &&
                    <div className="rounded p-2 bg-slate-700 w-fit">
                        <img src={chat.img} alt="" className="h-60 cursor-pointer rounded-sm" />
                        <a href={chat.img} download="ConvokeImg"><Image src="/dnld.svg" height={30} width={30} alt="download" className="pt-2"/></a>
                    </div>
                }
                {chat.vid &&
                    <div className="rounded p-2 bg-slate-700 w-fit">
                        <video controls preload="metadata" className="h-60 cursor-pointer rounded-sm"><source src={chat.vid}></source></video>
                        <a href={chat.vid} download="ConvokeImg"><Image src="/dnld.svg" height={30} width={30} alt="download" className="pt-2"/></a>
                    </div>
                }
                {chat.file &&
                    <a href={chat.file} download className="text-xs">
                        <Image src="/dnld.svg" height={30} width={30} alt="download" className="pt-2"/>Download</a>
                }
                <p className=" break-words">{chat.chat}</p>
            </div>
        </motion.div>
    )
}

export default ChatComponent;
