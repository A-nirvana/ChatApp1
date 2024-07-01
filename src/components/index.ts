import { Timestamp } from "firebase/firestore";

interface media {
  file: File | null;
  url: string
}

interface FireChat {
  chatId: string,
  lastMessage: string,
  recieverId: string,
  updatedAt: number
}

interface FireMessage {
  senderId: string,
  chat: string,
  createdAt: Timestamp,
  img?: string,
  vid?: string,
  file?: string
}

export type { FireChat, FireMessage, media }