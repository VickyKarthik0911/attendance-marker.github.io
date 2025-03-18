import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";;


// not to be disposed
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

const auth = getAuth(app);

document.getElementById('loginBtn').addEventListener('click', (event) => {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            alert('Login successful');
            location.href = '../webpages/dashboard.html'
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            if (errorCode == 'auth/invalid-credential' || errorCode == 'auth/invalid-email') {
                alert('Incorrect login credentials or account not found')
            }
            else {
                alert('Unknown error',errorMessage);
            }
        });
})