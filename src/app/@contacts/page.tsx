"use client"

import { Chat } from ".";
import { useState } from "react";
import { motion } from "framer-motion";

export default function Contacts(set: Function) {
    const [current, setCurrent] = useState<Chat>({ name: "", about: "", chats: [], imgLink : "" });
    const arr: Chat[] = [
        {
            name: "John Doe",
            about: "Abrea",
            chats: [
                { sender: "John Doe", message: "Hello" },
                { sender: "You", message: "How are you?" },
                { sender: "John Doe", message: "Nice to meet you" },
            ],imgLink : ""
        },
        {
            name: "Jane Smith",
            about: "Babdjba",
            chats: [
                { sender: "Jane Smith", message: "Hi" },
                { sender: "You", message: "I'm good, thanks!" },
                { sender: "Jane Smith", message: "Likewise" },
            ],imgLink : ""
        },
        {
            name: "Michael Johnson",
            about: "Coifdi",
            chats: [
                { sender: "Michael Johnson", message: "Hey" },
                { sender: "You", message: "Doing great!" },
                { sender: "Michael Johnson", message: "What about you?" },
            ],imgLink : ""
        },
        // Add more chat objects with the 'chats' array
    ];

    return (
        <main className="flex h-auto flex-col items-center justify-between space-y-3 ">
            {arr.map((item) => {
                return (
                    <motion.div
                        whileTap={{ scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                        key={item.name}
                        className={`w-full h-12 cursor-pointer px-2 ${
                            current.name === item.name && "bg-slate-800"
                        }`}
                        onClick={() => {
                            setCurrent(item);
                            set(item);
                        }}
                    >
                        <p className="text-md text-black dark:text-white">{item.name}</p>
                        <p className="text-xs text-gray-600">{item.chats[item.chats.length-1].message}</p>
                    </motion.div>
                );
            })}
        </main>
    );
}
