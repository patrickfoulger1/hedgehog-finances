import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";

//Firebase Config values imported from .env file
export const firebaseConfig = {
    apiKey: `${process.env.FIREBASEAPIKEY}`,
    authDomain: `${process.env.PROJECTID}.firebaseapp.com`,
    projectId: `${process.env.PROJECTID}`,
    storageBucket: `${process.env.PROJECTID}.firebasestorage.app`,
    messagingSenderId: `${process.env.MESSAGE_SENDER}`,
    appId: `${process.env.NOTIFY_APPID}`,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Messaging service
export const messaging = getMessaging(app);
