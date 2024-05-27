"use client"

import Image from "next/image";
import { useState } from "react";

export default function Contacts(set : Function) 
{
    const [current, setCurrent] = useState<Object | null>(null);
    const arr = [
        { name: "1", last: "Abrea" },
        { name: "2", last: "Babdjba" },
        { name: "3", last: "Coifdi" },
        { name: "4", last: "Doihdsaio" },
        { name: "5", last: "Eiew" },
        { name: "6", last: "Fjeij" },
        { name: "7", last: "Goihdias" },
        { name: "8", last: "Hisioa" },
        { name: "9", last: "Ijsdao" },
        { name: "10", last: "Jaisd" }
    ];
    return (
        <main className="flex h-auto flex-col items-center justify-between space-y-2">
            {arr.map((item) =>{
                return (
                    <div key={item.name} className={`border-b-2 border-slate-900 w-full h-12 cursor-pointer px-2 ${current == item ? "bg-slate-600" : "bg-slate-900"}`}
                        onClick={()=>{
                            setCurrent(item);
                            set(item);
                        }}
                    >
                        <p className=" text-md text-black dark:text-white">{item.name}</p>
                        <p className=" text-xs text-gray-600">{item.last}</p>
                    </div>
                )
            } )}
        </main>
    )       
}
