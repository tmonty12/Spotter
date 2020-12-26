import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";
import "firebase/auth";

firebase.initializeApp({
  apiKey: "AIzaSyDAMbr7nAFIbkzDuX3tDjb4tj-K3b1dDEI",
  authDomain: "lift-buddy-6c615.firebaseapp.com",
  databaseURL: "https://lift-buddy-6c615.firebaseio.com",
  projectId: "lift-buddy-6c615",
  storageBucket: "lift-buddy-6c615.appspot.com",
  messagingSenderId: "730206404249",
  appId: "1:730206404249:web:249862489c7ea7d16d8208",
  measurementId: "G-KZW54Q7WMG",
});

export default firebase;
