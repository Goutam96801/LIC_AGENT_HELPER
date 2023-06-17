let firebaseConfig = {
    apiKey: "AIzaSyBEk_FYq1p2jo-Ntyw6wHcYzvCLIpjSSbY",
    authDomain: "lic-agent-portal.firebaseapp.com",
    projectId: "lic-agent-portal",
    storageBucket: "lic-agent-portal.appspot.com",
    messagingSenderId: "795903472001",
    appId: "1:795903472001:web:ebeb44dc30a2149878b880",
    measurementId: "G-DLJV1V7KEG"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

let db = firebase.firestore();

let auth = firebase.auth();

const logoutUser = () => {
    auth.signOut();
    location.reload();
}