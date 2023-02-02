// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
    apiKey: "AIzaSyCcAUZTmHED6tXUBDtdjlcfn_Xvdbd77Hk",
    authDomain: "blogs-24ce3.firebaseapp.com",
    projectId: "blogs-24ce3",
    storageBucket: "blogs-24ce3.appspot.com",
    messagingSenderId: "696578804156",
    appId: "1:696578804156:web:b0ae117a9ce73e718503b9"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const storage = getStorage()
export const db = getFirestore()