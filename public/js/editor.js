const policyNumber = document.querySelector(".policy-number");
const policyholderName = document.querySelector(".policyholder-name");
const policyholderAddress = document.querySelector(".policyholder-address");
const birthDate = document.querySelector(".birth-date");
const commencementDate = document.querySelector(".commencement-date");
const maturityDate = document.querySelector(".maturity-date");
const termTable = document.querySelector(".term-table");
const assuredSum = document.querySelector(".assured-sum");
const premiumMode = document.querySelector(".premium-mode");
const premiumAmount = document.querySelector(".premium-amount");
const Heights = document.querySelector(".height");
const Weights = document.querySelector(".weight");
const mobileNumber = document.querySelector(".mobile");
const fatherName = document.querySelector(".father-name");
const nomineeDetail = document.querySelector(".nominee-details");
const articleField = document.querySelector('.article');
const loadingScreen = document.querySelector('.loading-screen');
const storageRef = firebase.storage().ref();
const uploadInput = document.querySelector('#pdf-upload');
const publishBtn = document.querySelector('.publish-btn');
hideLoadingScreen();

uploadInput.addEventListener('change', () => {
    uploadPDF(uploadInput, "pdf");
});


const uploadPDF = (uploadFile, uploadType) => {
    const files = uploadFile.files;
    const pdfsRef = storageRef.child("pdfs");

    showLoadingScreen();

    const uploadPromises = [];

    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (file && file.type === "application/pdf") {
            showLoadingScreen();
            const pdfRef = pdfsRef.child(file.name);
            const uploadTask = pdfRef.put(file);

            const uploadPromise = new Promise((resolve, reject) => {
                uploadTask.on(
                    "state_changed",
                    (snapshot) => {
                        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        console.log(`Upload progress for ${file.name}: ${progress}%`);
                        showLoadingScreen();
                    },
                    (error) => {
                        console.error(`Error uploading ${file.name}:`, error);
                        reject(error);
                    },
                    () => {
                        hideLoadingScreen();
                        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                            addPDF(downloadURL, file.name);
                            resolve();
                        });
                    }
                );
            });

            uploadPromises.push(uploadPromise);
            hideLoadingScreen();

        } else {
            console.warn(`Skipping ${file.name} - not a PDF file.`);
        }
    }

    Promise.all(uploadPromises)
        .then(() => {

        })
        .catch((error) => {
            console.error("Error uploading PDFs:", error);

        });
};

const addPDF = (pdfPath, name) => {
    let curPos = articleField.selectionStart;
    let textToInsert = `\r[${name}](${pdfPath})\r`;
    articleField.value = articleField.value.slice(0, curPos) + textToInsert + articleField.value.slice(curPos);
};

const addImage = (imagepath, alt) => {
    let curPos = articleField.selectionStart;
    let textToInsert = `\r![${alt}](${imagepath})\r`;
    articleField.value = articleField.value.slice(0, curPos) + textToInsert + articleField.value.slice(curPos);

}


publishBtn.addEventListener('click', () => {
    let letters = 'abcdefghijklmnopqrstuvwxyz';
    let policyHolder = policyholderName.value.split(" ").join("-");
    let id = '';
    for (let i = 0; i < 4; i++) {
        showLoadingScreen();
        id += letters[Math.floor(Math.random() * letters.length)];
    }

    // setting up docname
    let docName = `${policyHolder}-${id}`;

    // access firestore with db variable
    db.collection("policies").doc(docName).set({
            policyNumberValue: policyNumber.value,
            policyholderAddressValue: policyholderAddress.value,
            policyholderNameValue: policyholderName.value,
            birthDateValue: birthDate.value,
            commencementDateValue: commencementDate.value,
            maturityDateValue: maturityDate.value,
            termTableValue: termTable.value,
            assuredSumValue: assuredSum.value,
            premiumModeValue: premiumMode.value,
            premiumAmountValue: premiumAmount.value,
            heightValue: Heights.value,
            weightValue: Weights.value,
            mobileNumberValue: mobileNumber.value,
            fatherNameValue: fatherName.value,
            nomineeDetailValue: nomineeDetail.value,
            articleFieldValue: articleField.value,
            author: auth.currentUser.email.split("@")[0]
        })
        .then(() => {
            location.href = `/${docName}`;
            hideLoadingScreen();
        })
        .catch((err) => {
            console.error(err);

        })

});
// checking for user to be logged in or not

auth.onAuthStateChanged((user) => {
    if (!user) {
        location.replace("/admin"); //this will redirect to admin route login page

    }
})

function showLoadingScreen() {
    loadingScreen.style.display = "flex";
}

function hideLoadingScreen() {
    loadingScreen.style.display = "none";
}