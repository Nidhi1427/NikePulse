import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// Optional: only if you actually plan to use Analytics on web
// import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAQCml8hAodJC9tAr75JETlacnjgHMeIhY",
  authDomain: "nikepulse-804ca.firebaseapp.com",
  projectId: "nikepulse-804ca",
  storageBucket: "nikepulse-804ca.firebasestorage.app",
  messagingSenderId: "474248061430",
  appId: "1:474248061430:web:28ead16d76518941a767d7",
  measurementId: "G-9JNG5TKM5B",
};

// Make sure we don't initialize the app multiple times in Next.js
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const db = getFirestore(app);
export const storage = getStorage(app);

