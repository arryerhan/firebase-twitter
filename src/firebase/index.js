// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD1a40jUj-MNvyqCiPnLv1t8X-0Hd2MtOA",
  authDomain: "fir-twitter-60ae2.firebaseapp.com",
  projectId: "fir-twitter-60ae2",
  storageBucket: "fir-twitter-60ae2.firebasestorage.app",
  messagingSenderId: "94250034953",
  appId: "1:94250034953:web:89c4a3e099aac5f29015d8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// auth servisinin referansını al
export const auth = getAuth(app);

// google sağlaycısını kur
export const provider = new GoogleAuthProvider();

// storage servisinin referansını al
export const storage = getStorage(app);

// vertitabanı servisinin referanısnı al
export const db = getFirestore(app);
