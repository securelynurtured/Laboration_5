"use strict";
/*
 * Laboration 5 - Studentkortsgenerator
 * Namn: Henriette Heikki 
 */

// Hämta element från DOM
const form = document.querySelector("#studentform");
const clearButton = document.querySelector("#clear");

const fullnameInput = document.querySelector("#fullname");
const emailInput = document.querySelector("#email");
const phoneInput = document.querySelector("#phone");
const fontSelect = document.querySelector("#font");

const previewFullname = document.querySelector("#previewfullname");
const previewEmail = document.querySelector("#previewemail");
const previewPhone = document.querySelector("#previewphone");

const errorList = document.querySelector("#errorlist");
const historySection = document.querySelector("#history");
const deleteHistoryButton = document.querySelector("#delete");


// Array som används för felmeddelanden
let errors = [];

// Array som innehåller sparade studentkort
let history = [];

/**
 * Validerar formulärets inmatning.
 * @returns {boolean}
 */
function validateForm() {
    // Töm tidigare fel inför en ny kontroll
    errors = [];

    // Kontrollera formulärets obligatoriska fält
    if (fullnameInput.value.trim() === "") {
        errors.push("Ange ditt namn.");
    }

    if (emailInput.value.trim() === "") {
        errors.push("Ange din e-postadress.");
    }

    if (phoneInput.value.trim() === "") {
        errors.push("Ange ditt telefonnummer.");
    }

    // Visa eventuella felmeddelanden
    displayErrors();

    // Formuläret är giltigt om det inte finns några fel
    return errors.length === 0;
}

/**
 * Visar felmeddelanden på sidan.
 */
function displayErrors() {
    // Rensa tidigare felmeddelanden
    errorList.innerHTML = "";

    // Skriv ut aktuella felmeddelanden till DOM
    for (const error of errors) {
        const liElement = document.createElement("li");
        liElement.textContent = error;
        errorList.appendChild(liElement);
    }
}


/**
 * Skapar ett studentkort och visar det på sidan.
 */
function createStudentCard() {
    // Hämta information från formuläret
    const fullname = fullnameInput.value.trim();
    const email = emailInput.value.trim();
    const phone = phoneInput.value.trim();
    const font = fontSelect.value;

    // Uppdatera studentkortet
    previewFullname.textContent = fullname;
    previewEmail.textContent = email;
    previewPhone.textContent = phone;

    // Använd valt typsnitt för informationen på studentkortet
    previewFullname.style.fontFamily = font;
    previewEmail.style.fontFamily = font;
    previewPhone.style.fontFamily = font;

        // Lägg till studentkortet i historiken
    const studentCard = {
        fullname: fullname,
        email: email,
        phone: phone,
        font: font
    };

    history.unshift(studentCard);

    // Spara och uppdatera historiken
    saveHistory();
    renderHistory();
}

/**
 * Sparar historiken i localStorage.
 */
function saveHistory() {
    // Omvandla historiken till JSON-text och spara den i webbläsaren
    localStorage.setItem("studentCards", JSON.stringify(history));
}

/**
 * Läser in tidigare historik från localStorage.
 */
function loadHistory() {
    // Hämta eventuell sparad historik som text
    const savedHistory = localStorage.getItem("studentCards");

    // Om sparad historik finns, omvandla texten till en array
    if (savedHistory !== null) {
        history = JSON.parse(savedHistory);
    }
}

/**
 * Visar historiken på sidan.
 */
function renderHistory() {
    // Rensa tidigare visad historik
    historySection.innerHTML = "";

    // Skapa ett element för varje studentkort i historiken
    for (const studentCard of history) {
        const article = document.createElement("article");

        // Använd studentkortets sparade typsnitt
        article.style.fontFamily = studentCard.font;

        // Skapa element för namn, e-post och telefon
        const name = document.createElement("p");
        name.textContent = studentCard.fullname;

        const email = document.createElement("p");
        email.textContent = studentCard.email;

        const phone = document.createElement("p");
        phone.textContent = studentCard.phone;

        // Lägg informationen i historikposten
        article.appendChild(name);
        article.appendChild(email);
        article.appendChild(phone);

        // Lägg den färdiga historikposten på sidan
        historySection.appendChild(article);
    }
}


/**
 * Rensar formulär, aktuellt studentkort och felmeddelanden.
 */
function clearForm() {
    // Återställ formulärets fält till deras ursprungliga värden
    form.reset();

    // Återställ studentkortets texter
    previewFullname.textContent = "Namn";
    previewEmail.textContent = "E-post";
    previewPhone.textContent = "Telefon";

    // Ta bort typsnittet som tidigare sattes med JavaScript
    previewFullname.style.fontFamily = "";
    previewEmail.style.fontFamily = "";
    previewPhone.style.fontFamily = "";

    // Töm fel-arrayen och uppdatera fellistan på sidan
    errors = [];
    displayErrors();
}


/**
 * Raderar hela historiken.
 */
function deleteHistory() {
    // Radera sparad historik

    // Uppdatera history och visningen på sidan
}


// Eventlyssnare

// När formuläret skickas:
// - validera inmatningen
// - skapa studentkort om valideringen lyckas

form.addEventListener("submit", function (event) {
    event.preventDefault();

    // Skapa bara studentkortet om alla obligatoriska fält är ifyllda
    if (validateForm()) {
        createStudentCard();
    }
});

// När användaren klickar på "Rensa"
clearButton.addEventListener("click", clearForm);

// När användaren klickar på "Radera historik"


// När sidan laddas:
// - läs in och visa eventuell tidigare historik
loadHistory();
renderHistory();