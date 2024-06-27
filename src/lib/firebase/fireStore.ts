import {
	collection,
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
	onSnapshot,
} from "firebase/firestore";

import { db } from "./clientApp";
import { User } from "firebase/auth";
import upload from "./storage";
import { FireChat, media } from "@/app/@components";

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

// export const sendMessage = async () => {
// 	let imgUrl = null;
//     let vidUrl = null;
//     let fileUrl = null;

//     try {
//       if (img.file) {
//         imgUrl = await upload(img.file);
//       }
//       if (vid.file) {
//         vidUrl = await upload(vid.file)
//       }
//       if(file.file){
//         fileUrl = await upload(file.file)
//       }

//       await updateDoc(doc(db, "chats", chatId), {
//         messages: arrayUnion({
//           senderId: user?.uid,
//           chat,
//           createdAt: new Date(),
//           ...(imgUrl ? { img: imgUrl } : {}),
//           ...(vidUrl ? { vid: vidUrl } : {}),
//           ...(fileUrl? { file: fileUrl} : {})
//         }),
//       });

//       const userIDs = [user?.uid, reciever.id];

//       userIDs.forEach(async (id) => {
//         const userChatsRef = doc(db, "userchats", id);
//         const userChatsSnapshot = await getDoc(userChatsRef);

//         if (userChatsSnapshot.exists()) {
//           const userChatsData = userChatsSnapshot.data();

//           const chatIndex = userChatsData.chats.findIndex(
//             (c: FireChat) => c.chatId === chatId
//           );

//           userChatsData.chats[chatIndex].lastMessage = chat;
//           userChatsData.chats[chatIndex].isSeen =
//             id === user?.uid ? true : false;
//           userChatsData.chats[chatIndex].updatedAt = Date.now();

//           await updateDoc(userChatsRef, {
//             chats: userChatsData.chats,
//           });
//         }
//       });
//     } catch (err) {
//       console.log(err);
//     } finally {
//       setImg({
//         file: null,
//         url: "",
//       });
//       setVid({
//         file: null,
//         url: "",
//       });

//       setChat("");
//     }
// }

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

export const setCallDoc = async (offer: { sdp: string | undefined, type: RTCSdpType }) => {
	const callDocRef = doc(collection(db, 'calls'));
	const offerCandidates = collection(callDocRef, 'offerCandidates')
	const answerCandidates = collection(callDocRef, 'answerCandidates')

	await setDoc(callDocRef, offer)
}
