// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyARgNMncO1yy5OXj9Y0NpgjmT4R6XUjerU",
  authDomain: "netflix-gpt-48feb.firebaseapp.com",
  projectId: "netflix-gpt-48feb",
  storageBucket: "netflix-gpt-48feb.appspot.com",
  messagingSenderId: "257350653970",
  appId: "1:257350653970:web:52ae559ee0d1cab28160cb",
  measurementId: "G-B29K13R8PC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();