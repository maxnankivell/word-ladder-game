import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCJMIzcJd1UNemPjhv7-2Me1647Pki0O2I",
  authDomain: "word-filter-website.firebaseapp.com",
  projectId: "word-filter-website",
  storageBucket: "word-filter-website.appspot.com",
  messagingSenderId: "420803164071",
  appId: "1:420803164071:web:c37f404f74a3ce002ea882",
  measurementId: "G-T8749Q3NK7",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
