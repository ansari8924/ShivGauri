import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBd6ffWldUKv1G07CPF94K5kz1JeUmyrm0",
  authDomain: "projectdb-5d09c.firebaseapp.com",
  projectId: "projectdb-5d09c",
  storageBucket: "projectdb-5d09c.firebasestorage.app",
  messagingSenderId: "1053734352574",
  appId: "1:1053734352574:web:dd4008ab0852f8bc1910ef",
  measurementId: "G-YF1RFN7KV6"
};

const app = initializeApp(firebaseConfig);
export const analytics = typeof window !== "undefined" ? getAnalytics(app) : null;
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
