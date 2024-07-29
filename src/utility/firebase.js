

import firebase from "firebase/compat/app";
import{getAuth} from "firebase/auth";
import "firebase/compat/firestore";
import "firebase/compat/auth";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBrMZPU2sXnslYJugIfVOjRECJQJMm5aJo",
  authDomain: "clone-fe17c.firebaseapp.com",
  projectId: "clone-fe17c",
  storageBucket: "clone-fe17c.appspot.com",
  messagingSenderId: "384995399295",
  appId: "1:384995399295:web:90292ec5c3390684d5114a"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = app.firestore();