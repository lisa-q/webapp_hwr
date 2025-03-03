// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDqUVu5xc7ad6YWhhH9bXXQmcNjAA9JoH0",
  authDomain: "furtastic-fashion-cd4a7.firebaseapp.com",
  databaseURL: "https://furtastic-fashion-cd4a7-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "furtastic-fashion-cd4a7",
  storageBucket: "furtastic-fashion-cd4a7.firebasestorage.app",
  messagingSenderId: "56738488732",
  appId: "1:56738488732:web:3f9bd916bcdec5a0512859",
  measurementId: "G-E5Q4GD1309"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export the Realtime Database instance
export const db = getDatabase(app);