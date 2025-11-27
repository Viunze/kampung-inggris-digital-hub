// src/lib/firebase.ts

// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app"; // Tambahkan getApps, getApp
import { getAuth } from "firebase/auth"; // Tambahkan ini untuk Firebase Authentication
import { getFirestore } from "firebase/firestore"; // Tambahkan ini untuk Cloud Firestore
import { getStorage } from "firebase/storage"; // Tambahkan ini untuk Cloud Storage
import { getAnalytics } from "firebase/analytics"; // Ini sudah ada

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBaPUJWt_E0aDPRTsB7KhMx9gQ6MbNas5c",
  authDomain: "lyntrix-d309a.firebaseapp.com",
  projectId: "lyntrix-d309a",
  storageBucket: "lyntrix-d309a.firebasestorage.app",
  messagingSenderId: "481360999219",
  appId: "1:481360999219:web:92a5c7097f5fe7fb1a4446",
  measurementId: "G-ZJD7XR61WC",
};

// Initialize Firebase
// Pastikan Firebase hanya diinisialisasi sekali
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Inisialisasi layanan Firebase yang akan kita gunakan
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// Inisialisasi Analytics, hanya jika berjalan di lingkungan browser
let analytics;
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}

export { app, auth, db, storage, analytics }; // Export semua layanan
