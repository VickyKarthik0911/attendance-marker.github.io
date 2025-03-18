import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";
import { getFirestore, getDoc, doc, collection, setDoc } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js";

  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

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
const date = new Date().toDateString();

let lat="";
let lon="";
let latitudeFlag=false;
let longitudeFlag=false;



document.getElementById('signout').addEventListener('click',()=>{
    console.log('signout button clicked');
    auth.signOut().then(()=>{
        location.href="../index.html"
    }).catch(console.error(()=>{
        console.log('failed to sign out ',error.code);
    })
    )
})

function fetchLocation(position){

    //Precision of location tolerance can be changed by changing to value parameters given to " toFixed" method
    lat=position.coords.latitude.toFixed(2);
    lon=position.coords.longitude.toFixed(2);
    console.log('lat',lat,'long',lon);

    //change values according to your desired location where you want to use this site
    if(lat==17.50  && lon==78.43){
        console.log('at desired lat and long')
        latitudeFlag=true;
        longitudeFlag=true;
    }
    else{
        console.log('not in region');
    }
    
    
}

function locationError(){
    alert('Failed to fetch location');
}

navigator.geolocation.getCurrentPosition(fetchLocation,locationError);


function changeGreeting(user_email, id) {
    getDoc(doc(db, "user", user_email)).then(docSnap => {
        if (docSnap.exists()) {
            const user_data = docSnap.data();
            let text = user_data.fullName + "";
            let existing_greeting = document.getElementById(id).innerHTML;
            document.getElementById(id).innerHTML = existing_greeting + ", " + text;
            document.getElementById('mark').addEventListener('click', () => {
                if(longitudeFlag && latitudeFlag){
                    markAttendance(text);
                }

                else{
                    alert('Retry getting into a specified location')
                }
                
            })
            
        }
        else {
            console.log("error fetching data");
        }
    })
}



function markAttendance(full_name) {
    const docRef=doc(db,date,full_name);

    let data={
        fullName:full_name,
        time: new Date().getTime()
    }

    getDoc(doc(db,date,full_name)).then(docSnap =>{

        

        if(docSnap.exists() ){
            alert("Your attendance already marked for today");
        }
        else{
            setDoc(docRef,data).then(()=>{
                alert('Attendance marked');
            })
        }
    })
}



onAuthStateChanged(auth, (user) => {
    if (user) {
        const user_email = user.email;
        changeGreeting(user_email, 'greeting');
    } else {
        console.log('error occured getting user data');
    }
});

