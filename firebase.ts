import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyAv13OiAH5_AiyvAekGaOAkCTjFWXJ1Ylo",
  authDomain: "chatgptclone-35886.firebaseapp.com",
  projectId: "chatgptclone-35886",
  storageBucket: "chatgptclone-35886.appspot.com",
  messagingSenderId: "1080718808065",
  appId: "1:1080718808065:web:ba175779c169527d88dc00"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore();
export const auth = getAuth();