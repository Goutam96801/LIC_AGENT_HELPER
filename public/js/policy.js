const loadingScreen = document.querySelector('.loading-screen');

let policyId = decodeURI(location.pathname.split("/").pop());

let docRef = db.collection("policies").doc(policyId);

showLoadingScreen();

docRef
    .get()
    .then((doc) => {
        if (doc.exists) {
            const data = doc.data();

            // Generate the HTML markup for displaying the details
            const detailsHTML = `
        <p class="policy-cards">Policy Number: <span class="value">${data.policyNumberValue}</span></p>
        <p class="policy-cards">Policyholder's Name: <span class="value">${data.policyholderNameValue}</span></p>
        <p class="policy-cards">Policyholder's Address: <span class="value">${data.policyholderAddressValue}</span></p>
        <p class="policy-cards">Birth Date: <span class="value">${data.birthDateValue}</span></p>
        <p class="policy-cards">Commencement Date: <span class="value">${data.commencementDateValue}</span></p>
        <p class="policy-cards">Maturity Date: <span class="value">${data.maturityDateValue}</span></p>
        <p class="policy-cards">Term & Table: <span class="value">${data.termTableValue}</span></p>
        <p class="policy-cards">Assured Sum: <span class="value">${data.assuredSumValue}</span></p>
        <p class="policy-cards">Premium Mode: <span class="value">${data.premiumModeValue}</span></p>
        <p class="policy-cards">Height: <span class="value">${data.heightValue}</span></p>
        <p class="policy-cards">Weight: <span class="value">${data.weightValue}</span></p>
        <p class="policy-cards">Mobile Number: <span class="value">${data.mobileNumberValue}</span></p>
        <p class="policy-cards">Father's Name: <span class="value">${data.fatherNameValue}</span></p>
        <p class="policy-cards">Nominee Details: <span class="value">${data.nomineeDetailValue}</span></p>
        <p class="agent-name">LIC Advisor: ${data.author}</p>
        <button id="print-button">Print</button>
      `;


            // Append the details HTML to the container
            const policyContainer = document.querySelector("#policy-container");
            policyContainer.innerHTML = detailsHTML;
            // Retrieve and display PDF files
            if (data.articleFieldValue) {
                const pdfLinks = data.articleFieldValue.match(/\[(.*?)\]\((.*?)\)/g);

                if (pdfLinks) {
                    pdfLinks.forEach((link) => {
                        const regex = /\[(.*?)\]\((.*?)\)/;
                        const match = regex.exec(link);
                        const pdfURL = match[2];


                        const anchorElement = document.createElement("a");
                        anchorElement.href = pdfURL;
                        anchorElement.target = "_blank";
                        anchorElement.classList.add("pdf-link");
                        anchorElement.textContent = "View Document";

                        const paragraphElement = document.createElement("p");
                        paragraphElement.appendChild(anchorElement);

                        policyContainer.appendChild(paragraphElement);

                    })

                }
            }

            const printButton = document.getElementById("print-button");
            printButton.addEventListener("click", () => {
                window.print();
            });


        } else {
            // Handle case when the document does not exist
            console.log("Document not found");
        }
        detailsHTML += `
        `
        hideLoadingScreen();
    })
    .catch((error) => {

        hideLoadingScreen();
    });

function showLoadingScreen() {
    loadingScreen.style.display = "flex";
}

function hideLoadingScreen() {
    loadingScreen.style.display = "none";
}