// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDlmJQg0tWb73f5LkhJmr6bfVnfp_dXUqE",
  authDomain: "react-course-1fead.firebaseapp.com",
  projectId: "react-course-1fead",
  storageBucket: "react-course-1fead.appspot.com",
  messagingSenderId: "599553654958",
  appId: "1:599553654958:web:bfec2d383af14594cb2d3f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();