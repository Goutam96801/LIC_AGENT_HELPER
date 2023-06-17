let ui = new firebaseui.auth.AuthUI(auth);
let login = document.querySelector('.login');
const policySection = document.querySelector('.policy-section');
const loadingScreen = document.querySelector('.loading-screen');
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');

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

searchForm.addEventListener('submit', handleSearch);


function handleSearch(e) {
    e.preventDefault();
    const searchTerm = searchInput.value.trim().toLowerCase();
    searchPolicies(searchTerm);
}

function searchPolicies(searchTerm) {
    const policyCards = document.querySelectorAll('#policy-section .card');
    policyCards.forEach((card) => {
        const policyNumber = card.querySelector('.policy-number-display').textContent.toLowerCase();
        const policyholderName = card.querySelector('.policyholder-name-display').textContent.toLowerCase();
        if (policyNumber.includes(searchTerm) || policyholderName.includes(searchTerm)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}


function showLoadingScreen() {
    loadingScreen.style.display = 'flex';
}

function hideLoadingScreen() {
    loadingScreen.style.display = 'none';
}