import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";

import {
  getAuth,
  createUserWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";

import {
  getFirestore,
  setDoc,
  doc,
} from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js";


//Not to be disposed
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBYfQfF2vSY3JHOC3G7gWtN2_4GNBd9ijQ",
    authDomain: "attendance-marker-v1-49c6b.firebaseapp.com",
    projectId: "attendance-marker-v1-49c6b",
    storageBucket: "attendance-marker-v1-49c6b.firebasestorage.app",
    messagingSenderId: "38582862750",
    appId: "1:38582862750:web:8b1eccf1326f2296e90c8f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);



document.getElementById("register").addEventListener("click", (event) => {
  event.preventDefault();
  const full_name = document.getElementById("fullName").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed up 
      const user = userCredential.user;
      const user_data = {
        fullName: full_name,
        user_email: email
      };
      const docRef = doc(db, "user", email);
      setDoc(docRef, user_data)
        .then(() => {
          alert("Account created try logging in");
          location.href = "../index.html"
        })
        .catch((error) => {
          console.log(error.code);
        });
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert('Unknown error',errorMessage);
      // ..
    });
});
