import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyBCYHOLY62XOUg84ZeSEABje9o1jR6BHIg",
    authDomain: "docs-13bce.firebaseapp.com",
    projectId: "docs-13bce",
    storageBucket: "docs-13bce.appspot.com",
    messagingSenderId: "115421627686",
    appId: "1:115421627686:web:0561d698f89cdabddc6de7"
};

const app = !firebase.apps.length
    ? firebase.initializeApp(firebaseConfig)
    : firebase.app();

const db = app.firestore();

export { db };
