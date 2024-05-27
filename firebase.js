// Import the functions you need from the SDKs you need
import { initializeApp } from "./firebase/app";
import { getAnalytics } from "./firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD9htkaIjSVg44z04100_ttjgULYUlpLvk",
  authDomain: "bookmarker-bff64.firebaseapp.com",
  projectId: "bookmarker-bff64",
  storageBucket: "bookmarker-bff64.appspot.com",
  messagingSenderId: "828423988203",
  appId: "1:828423988203:web:4c9b6c43dc9835fd0bafae",
  measurementId: "G-3Q39CBPTC9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
console.log('hi')