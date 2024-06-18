"use client"
import { db } from "@/lib/firebase/clientApp";
import {
    DocumentData,
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { useState } from "react";
import { useUser } from "../UserProvider";

const AddUser = () => {
  const [user, setUser] = useState<DocumentData | null>(null);
  const currentUser = useUser();

const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const username = formData.get("username") as string;

    try {
        const userRef = collection(db, "users");

        const q = query(userRef, where("username", "==", username));

        const querySnapShot = await getDocs(q);

        if (!querySnapShot.empty) {
            const userData = querySnapShot.docs[0].data();
            setUser(userData);
        }
    } catch (err) {
        console.log(err);
    }
};

  const handleAdd = async () => {
    const chatRef = collection(db, "chats");
    const userChatsRef = collection(db, "userChats");

    try {
      const newChatRef = doc(chatRef);

      await setDoc(newChatRef, {
        createdAt: serverTimestamp(),
        messages: [],
      });

      await updateDoc(doc(userChatsRef, user?.id), {
        chats: arrayUnion({
          chatId: newChatRef.id,
          lastMessage: "",
          recieverId: currentUser?.uid,
          updatedAt: Date.now(),
        }),
      });

      await updateDoc(doc(userChatsRef, currentUser?.uid), {
        chats: arrayUnion({
          chatId: newChatRef.id,
          lastMessage: "",
          receiverId: user?.id,
          updatedAt: Date.now(),
        }),
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="absolute left-[15%] top-12 bg-teal-900 p-5 h-1/3 rounded-xl z-10 border-4 border-amber-600 font-thin">
      <form onSubmit={handleSearch}>
        <input type="text" placeholder="Username" name="username" className="p-2 px-5 rounded-xl outline-none bg-[#1d1d1d] mr-2"/>
        <button>Search</button>
      </form>
      {user && (
        <div className="user mt-3 flex justify-evenly">
          <div className="detail flex flex-col justify-center items-center">
            <img src={user.avatar || "./logo.svg"} alt="" className="rounded-full h-20 w-20 border-2"/>
            <span>{user.username}</span>
          </div>
          <button onClick={handleAdd}>Add User</button>
        </div>
      )}
    </div>
  );
};

export default AddUser;