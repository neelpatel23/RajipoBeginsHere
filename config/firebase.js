import { initializeApp } from "firebase/app";
import { getAuth, getReactNativePersistence, initializeAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

// Firebase config
// const firebaseConfig = {
//     apiKey: "AIzaSyAqLSSF_fo8UFpHPfjTSh7PLN2Epp9gX7w",
//     authDomain: "rajipobh.firebaseapp.com",
//     projectId: "rajipobh",
//     storageBucket: "rajipobh.appspot.com",
//     messagingSenderId: "10975846431",
//     appId: "1:10975846431:web:6e124819d8ee196a70f52a",
//     measurementId: "G-5FNRZQYRX0"
// };

const firebaseConfig = {
    apiKey: "AIzaSyDHgl8cuOZ42osztO-o6EcNzYhAzRU96oo",
    authDomain: "scubed-eda81.firebaseapp.com",
    projectId: "scubed-eda81",
    storageBucket: "scubed-eda81.appspot.com",
    messagingSenderId: "306014953325",
    appId: "1:306014953325:web:842c7750115bea10f34464",
    measurementId: "G-HD0RVN7VYZ"
  };
const app = initializeApp(firebaseConfig);

initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});


export const auth = getAuth();
export const database = getFirestore();
export const storage = getStorage();  