import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBN6ooirzfWbgdLZhic_lYvPA4TPqR0D80",
  authDomain: "nexfin-d68f8.firebaseapp.com",
  projectId: "nexfin-d68f8",
  storageBucket: "nexfin-d68f8.firebasestorage.app",
  messagingSenderId: "385626139094",
  appId: "1:385626139094:web:ae6c14a062a788b1079c77",
  measurementId: "G-9WBZWNRPPJ"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);