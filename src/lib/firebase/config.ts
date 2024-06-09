import dotenv from "dotenv";
import path from "path";

dotenv.config({path : path.resolve(__dirname, "./.env")});

interface Config {
    [key: string]: string | undefined;
    apiKey: string | undefined;
    authDomain: string | undefined;
    projectId: string | undefined;
    storageBucket: string | undefined;
    messagingSenderId: string | undefined;
    appId: string | undefined;
    measurementId: string | undefined;
  }
  
const config : Config = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
  };
  
  // When deployed, there are quotes that need to be stripped
  Object.keys(config).forEach((key) => {
    const configValue = config[key] + "";
    if (configValue.charAt(0) === '"') {
      config[key] = configValue.substring(1, configValue.length - 1);
    }
  });
  
  export const firebaseConfig = config;