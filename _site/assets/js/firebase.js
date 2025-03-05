// Import the functions you need from the SDKs you need

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// Ensure Firebase is initialized before calling functions
document.addEventListener("DOMContentLoaded", function () {

    // Your web app's Firebase configuration
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    const firebaseConfig = {
        apiKey: "AIzaSyDwe3o-CNjGUE_-ESCAEUYdWV64ny3KEg0",
        authDomain: "columbia-space-cms.firebaseapp.com",
        projectId: "columbia-space-cms",
        storageBucket: "columbia-space-cms.firebasestorage.app",
        messagingSenderId: "999646019596",
        appId: "1:999646019596:web:eba465cea988b516786e29",
        measurementId: "G-CMMFSNX776"
    };
    
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    // Function to Sign in with Google
    window.signInWithGoogle = function () {
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider)
            .then((result) => {
                console.log("User signed in:", result.user);
                localStorage.setItem("user", JSON.stringify(result.user));
                updateUI(result.user);
            })
            .catch((error) => {
                console.error("Error signing in:", error);
            });
    };

    // Function to Check If User is Logged In
    window.checkAuth = function () {
        console.log('checking auth')
        firebase.auth().onAuthStateChanged((user) => {
            updateUI(user);
        });
    };

    // Function to Update UI Based on Auth Status
    window.updateUI = function (user) {
        let loginButton = document.getElementById("login-button");
        let logoutButton = document.getElementById("logout-button");
        let createPostLink = document.getElementById("create-post-link");

        if (user) {
            loginButton.style.display = "none";
            logoutButton.style.display = "block";
            createPostLink.style.display = "block";
        } else {
            loginButton.style.display = "block";
            logoutButton.style.display = "none";
            createPostLink.style.display = "none";
        }
    };

    // Function to Log Out
    window.signOut = function () {
        firebase.auth().signOut().then(() => {
            console.log("User signed out");
            localStorage.removeItem("user");
            updateUI(null);
        });
    };

    // Run authentication check on page load
    checkAuth();
});
