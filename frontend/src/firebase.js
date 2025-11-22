// Import necessary Firebase modules
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your Firebase config - Double-checked
const firebaseConfig = {
  apiKey: "AIzaSyAw3gs9fOrCBiNERadLmQ1funLbJ8nMmSc",
  authDomain: "ainalyze-a9dfe.firebaseapp.com",
  projectId: "ainalyze-a9dfe",
  storageBucket: "ainalyze-a9dfe.appspot.com", // Correct format
  messagingSenderId: "833698420187",
  appId: "1:833698420187:web:c70ec50c8bb7c8596643fe",
  measurementId: "G-JDPMRDV80M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize other Firebase services
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
