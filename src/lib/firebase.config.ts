//Firebase Config values imported from .env file
export const firebaseConfig = {
    apiKey: `${process.env.NEXT_PUBLIC_FIREBASEAPIKEY}`,
    authDomain: `${process.env.NEXT_PUBLIC_PROJECTID}.firebaseapp.com`,
    projectId: `${process.env.NEXT_PUBLIC_PROJECTID}`,
    storageBucket: `${process.env.NEXT_PUBLIC_PROJECTID}.firebasestorage.app`,
    messagingSenderId: `${process.env.NEXT_PUBLIC_MESSAGE_SENDER}`,
    appId: `${process.env.NEXT_PUBLIC_NOTIFY_APPID}`,
};
