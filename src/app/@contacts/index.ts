interface Chat {
    name: string;
    about: string;
    chats: { sender: string; message: string }[];
    imgLink : string
  }

export type {Chat}