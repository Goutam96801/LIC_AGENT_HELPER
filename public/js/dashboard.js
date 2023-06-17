let ui = new firebaseui.auth.AuthUI(auth);
let login = document.querySelector('.login');
const policySection = document.querySelector('.policy-section');
const loadingScreen = document.querySelector('.loading-screen');

auth.onAuthStateChanged((user) => {
    if (user) {
        login.style.display = "none";
        showLoadingScreen();
        getUserPolicy(); // Call the function to fetch and display policies
    } else {
        setupLoginButton();
    }
});

const setupLoginButton = () => {
    ui.start('#loginUI', {
        callbacks: {
            signInSuccessWithAuthResult: function(authResult, RedirectURL) {
                login.style.display = "none";
                showLoadingScreen();
                getUserPolicy(); // Call the function to fetch and display policies
                return false;
            }
        },
        signInflow: "popup",
        signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID]
    });
};

const getUserPolicy = () => {
    db.collection("policies")
        .where("author", "==", auth.currentUser.email.split('@')[0])
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((policy) => {
                createPolicy(policy);
            });
            hideLoadingScreen();
        })
        .catch((error) => {
            console.error("Error getting policies:", error);
        });
};

const createPolicy = (policy) => {
    let data = policy.data();
    policySection.innerHTML += `
        <div class="card">
            <h3 class="policy-number-display">${data.policyNumberValue}</h3>
            <p class="policyholder-name-display">${data.policyholderNameValue}</p>
            <div class="all-btn">
                <a href="/${policy.id}" class="btn view-btn">View</a>
            </div>
        </div>`;
};

function showLoadingScreen() {
    loadingScreen.style.display = 'flex';
}

function hideLoadingScreen() {
    loadingScreen.style.display = 'none';
}