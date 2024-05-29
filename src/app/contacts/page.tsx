"use client"

import { useState } from "react";

export default function Contacts(set : Function) 
{
    interface Chat{
        name: string;
        last: string;
    }   
    const [current, setCurrent] = useState<Chat>({name: "", last: ""});
    const arr = [
        { name: "John Doe", last: "Abrea" },
        { name: "Jane Smith", last: "Babdjba" },
        { name: "Michael Johnson", last: "Coifdi" },
        { name: "Emily Davis", last: "Doihdsaio" },
        { name: "Daniel Wilson", last: "Eiew" },
        { name: "Olivia Brown", last: "Fjeij" },
        { name: "Sophia Taylor", last: "Goihdias" },
        { name: "Matthew Anderson", last: "Hisioa" },
        { name: "Emma Thomas", last: "Ijsdao" },
        { name: "William Martinez", last: "Jaisd" }
    ];

    return (
        <main className="flex h-auto flex-col items-center justify-between">
            {arr.map((item) => {
                return (
                    <div
                        key={item.name}
                        className={`border-b-2 border-slate-950 w-full h-12 cursor-pointer px-2 ${current.name === item.name && "bg-slate-800" }`}
                        onClick={() => {
                            setCurrent(item);
                            set(item);
                            console.log(current);
                        }}
                    >
                        <p className="text-md text-black dark:text-white">{item.name}</p>
                        <p className="text-xs text-gray-600">{item.last}</p>
                    </div>
                );
            })}
        </main>
    );
}
