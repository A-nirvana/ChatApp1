import {
	collection,
	onSnapshot,
	query,
	getDocs,
	doc,
	getDoc,
	setDoc,
	updateDoc,
	orderBy,
	Timestamp,
	runTransaction,
	where,
	addDoc,
	getFirestore,
	arrayUnion,
} from "firebase/firestore";

import { db } from "./clientApp";
import { User } from "firebase/auth";

export const bring = (set : Function, user: User|null|undefined) => {
	if(user) onSnapshot(doc(db, "userChats", user?.uid ), (res) => {
		set(res.data()?.Chats)
		console.log("Current data: ", res.data());
	});
}

export const addChat = async (user: User | null | undefined, recieverId: string) => {
	const userChatsRef = collection(db, "userChats");
	const chatRef = collection(db, "chats");
	try {
		const newChatRef = doc(chatRef);
		await setDoc(newChatRef, {
			createdAt: Timestamp.now(),
			messages: [],
		});
		await updateDoc(doc(userChatsRef, user?.uid), {
			Chats: arrayUnion({
				chatId: newChatRef.id,
				lastMessage: "",
				recieverId: recieverId,
				updatedAt: Timestamp.now(),
			}),
		});
	} catch (err) {
		console.log(err);
	}
}

export const sendMessage = async (chatId: string, message: string, user: User | null | undefined) => {
	const chatRef = doc(db, "chats", chatId);
	try {
		await updateDoc(chatRef, {
			messages: arrayUnion({
				message: message,
				sender: user?.displayName,
				createdAt: Timestamp.now(),
			}),
		});
	} catch (err) {
		console.log(err);
	}
}

export const getChat = async (chatId: string) => {
	const chatRef = doc(db, "chats", chatId);
	const chatSnap = await getDoc(chatRef);
	return chatSnap.data();
}

export const getChats = async (user: User) => {
	const userChatsRef = doc(db, "userChats", user?.uid);
	const userChatsSnap = await getDoc(userChatsRef);
	const chats = userChatsSnap.data()?.chats;
	return chats;
}

export const getUser = async (userId: string) => {
	const userRef = doc(db, "users", userId);
	const userSnap = await getDoc(userRef);
	return userSnap.data();
}

