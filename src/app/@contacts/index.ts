interface media {
  file: File | null;
  url: string
}

interface Chat {
  name: string;
  about: string;
  chats: { sender: string; message: string; media:media|null }[];
  imgLink: string
}

export type { Chat }