import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // No persistence setting for React Native
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Firebase config
const firebaseConfig = {
    apiKey: "AIzaSyDHgl8cuOZ42osztO-o6EcNzYhAzRU96oo",
    authDomain: "scubed-eda81.firebaseapp.com",
    projectId: "scubed-eda81",
    storageBucket: "scubed-eda81.appspot.com",
    messagingSenderId: "306014953325",
    appId: "1:306014953325:web:842c7750115bea10f34464",
    measurementId: "G-HD0RVN7VYZ"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth without setting any persistence
export const auth = getAuth(app);

// Initialize Firestore and Storage
export const database = getFirestore(app);
export const storage = getStorage(app);
