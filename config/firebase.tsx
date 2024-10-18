// Import the functions you need from the SDKs
import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDR6to-brPsM2MqiWHSx51TnXMMiZ2hMH8",
  authDomain: "expensify-c3bb2.firebaseapp.com",
  projectId: "expensify-c3bb2",
  storageBucket: "expensify-c3bb2.appspot.com",
  messagingSenderId: "1075237302485",
  appId: "1:1075237302485:web:2038f8d01487f927c0725c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

// Initialize Auth with persistence using React Native AsyncStorage
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

// Firebase collections references
export const tripsRef = collection(db, 'trips');
export const expensesRef = collection(db, 'expenses');

export default app;
