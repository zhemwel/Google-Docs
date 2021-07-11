import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBzHkVzaftrW6B4Uq3VbDvlNTYG2-ohvwI",
  authDomain: "docs-next-8db86.firebaseapp.com",
  projectId: "docs-next-8db86",
  storageBucket: "docs-next-8db86.appspot.com",
  messagingSenderId: "471452645249",
  appId: "1:471452645249:web:c53608579bf3db372d1a80",
};

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const db = app.firestore();

export { db };
