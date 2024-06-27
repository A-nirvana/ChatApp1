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
import { getUser } from "@/lib/firebase/fireStore";

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
      if (currentUser) {
        const cnt = await getUser(currentUser.uid)
        await setDoc(newChatRef, {
          createdAt: serverTimestamp(),
          users: [user, cnt],
          messages: [],
        });
      }

      await updateDoc(doc(userChatsRef, user?.id), {
        chats: arrayUnion({
          chatId: newChatRef.id,
          lastMessage: "",
          recieverId: currentUser?.uid,
          updatedAt: Date.now(),
        }),
      });

      if(user?.id != currentUser?.uid){await updateDoc(doc(userChatsRef, currentUser?.uid), {
        chats: arrayUnion({
          chatId: newChatRef.id,
          lastMessage: "",
          recieverId: user?.id,
          updatedAt: Date.now(),
        }),
      });}
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="absolute left-0 top-12 p-5 h-1/3 rounded-xl z-10 border-4 border-amber-600 font-thin">
      <p>Please update after adding user, I'm working to solve the issue</p>
      <form onSubmit={handleSearch}>
        <input type="text" placeholder="Username" name="username" className="p-2 px-5 rounded-xl outline-none bg-[#1d1d1d] mr-2" />
        <button>Search</button>
      </form>
      {user && (
        <div className="user mt-3 flex justify-evenly">
          <div className="detail flex flex-col justify-center items-center">
            <img src={user.avatar || "./logo.svg"} alt="" className="rounded-full h-20 w-20 border-2" />
            <span>{user.username}</span>
          </div>
          <button onClick={handleAdd}>Add User</button>
        </div>
      )}
    </div>
  );
};

export default AddUser;