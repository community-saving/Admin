import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBKs_0tOsl6OrDQOSTQDD4ghHv3PHLNFqo",
  authDomain: "money-saving-community.firebaseapp.com",
  projectId: "money-saving-community",
  storageBucket: "money-saving-community.firebasestorage.app",
  messagingSenderId: "1023049683110",
  appId: "1:1023049683110:web:fa5c36a12cb20440412467",
  measurementId: "G-1K6718VQSL"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };