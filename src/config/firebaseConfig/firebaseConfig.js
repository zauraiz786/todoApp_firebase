import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyCYHuKlADauqJtHQPVwj1jUqbOazxJq-pM",
  authDomain: "zhk-todo-app.firebaseapp.com",
  projectId: "zhk-todo-app",
  storageBucket: "zhk-todo-app.appspot.com",
  messagingSenderId: "11237540385",
  appId: "1:11237540385:web:ec194b4c8f987e8dfed960"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);