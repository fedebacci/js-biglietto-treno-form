// COMMENTO NORMALE (PER COMMENTARE IL CODICE)
// ! COMMENTO ERRORE
// ? COMMENTO DOMANDA
// * COMMENTO HIGHLIGHT
// todo COMMENTO TODO


// * INFORMAZIONI INIZIALI
const ticketPriceForKM = 0.21;
const minorsDiscount = 20;
const overDiscount = 40;
// * NON SERVE PIU PER I CALCOLI, MA SOLO PER MOSTRARE NELLA SELECT L'ETA SCELTA (PER I MINORENNI NON SERVE)
const overAge = 65;


// * INPUT PER INFORMAZIONI RICAVATE DALL'UTENTE
const inputUserName = document.getElementById('userName');
const inputUserAge = document.getElementById('userAge');
// * INSERISCO NELLA SELECT IL VALORE PER GLI OVER IN MODO CHE SI POSSA MODIFICARE L'ETÁ PER LO SCONTO OVER TRAMITE JS
// ? CERCO QUALE È LA OPTION A CUI CAMBIARE IL TESTO DINAMICAMENTE. LASCEREI IL CICLO SE DOVESSI FARE UNA COSA PIU COMPLESSA ED ACCETTARE ETA DIVERSE TRAMITE INPUT NUMERICO (COMMIT PRECEDENTE), MA CON LA SELECT POSSO PERMETTERMI DI ANDARE DIRETTAMENTE ALL'ELMENTO INTERESSATO
// overAgeValue.childNodes.forEach((element) => {
//     if (element.value === 'over') element.innerText += overAge;
// });
inputUserAge.childNodes[5].innerText += overAge;
const inputTripKM = document.getElementById('tripKM');


// * ELEMENTI AI QUALI REAGIRE
const btnCalculateTicketPrice = document.getElementById('calculateTicketPrice');
const btnCancelInfo = document.getElementById('cancelInfo');
btnCalculateTicketPrice.addEventListener('click', function() {
    calculateTicketPrice(inputUserName.value, inputUserAge.value, minorsDiscount, overDiscount, inputTripKM.value, ticketPriceForKM);
})
btnCancelInfo.addEventListener('click', function() {
    cancelInfo();
})


// * ELEMENTI IN CUI MOSTRARE RISULTATI
const userNameError = document.getElementById('userNameError');;
const tripKMError = document.getElementById('tripKMError');;
const results = document.getElementById('results');
const ticketUserName = document.getElementById('ticketUserName');
const ticketOfferType = document.getElementById('ticketOfferType');
const ticketTicketPrice = document.getElementById('ticketTicketPrice');


// * FUNZIONE CHE CALCOLA IL PREZZO
function calculateTicketPrice(userName, userAge, minorsDiscount, overDiscount, tripKM, ticketPriceForKM) {
    tripKM = parseInt(tripKM);

    // * CONTROLLO LA PRESENZA DI ERRORI: NOME VUOTO E KM VUOTI O NON NUMERICI (LA SELECT AVRA SEMPRE UN VALORE ACCETTABILE)
    let error = false;
    if (!userName) {
        console.debug("ERRORE USER NAME");
        inputUserName.classList.add('border-danger');
        userNameError.classList.remove('d-none');
        userNameError.innerText = "Inserisci un nome";
        error = true;
    } else {
        inputUserName.classList.remove('border-danger');
        userNameError.classList.add('d-none');
    };
    if (isNaN(tripKM)) {
        console.debug("ERRORE USER NAME");
        inputTripKM.classList.add('border-danger');
        tripKMError.classList.remove('d-none');
        tripKMError.innerText = "Inserisci un numero di KM da percorrere"
        error = true;
    } else {
        inputTripKM.classList.remove('border-danger');
        tripKMError.classList.add('d-none');
    };
    if (error === true) {
        results.classList.add('d-none');
        return;
    };

    // * CALCOLO EFFETTIVO DEL COSTO DEL BIGLIETTO
    let ticketPrice = tripKM * ticketPriceForKM;
    // * LA SALVO IN UN'ALTRA VARIABILE PER AVERE A DISPOSIZIONE ANCHE IL PREZZO INIZIALE DA MOSTRARE SE VIENE APPLICATO UNO SCONTO
    let finalPrice = ticketPrice;
    // * APPLICO EVENTUALI SCONTI
    if (userAge === 'minor') {
        finalPrice = calculateDiscountedPrice(ticketPrice, minorsDiscount);
        console.log(`Prezzo non scontato: ${ticketPrice.toFixed(2)}€`);
    };
    if (userAge === 'over') {
        finalPrice = calculateDiscountedPrice(ticketPrice, overDiscount);
        console.log(`Prezzo non scontato: ${ticketPrice.toFixed(2)}€`);
    };

    // * MOSTRO IL RISULTATO IN CONSOLE (MILESTONE 1)
    console.info(`Ciao ${userName}, il costo del tuo biglietto è: ${finalPrice.toFixed(2)}€`);

    // * MOSTRO IL RISULTATO IN PAGINA (MILESTONE 2)
    showResults(userName, userAge, overAge, ticketPrice, finalPrice);
}



// * FUNZIONE CHE CALCOLA LO SCONTO (INDIPENDENTEMENTE SE MINORENNE O OVER)
/**
 * Funzione che riceve il costo iniziale del biglietto ed applica lo sconto adeguato per l'utente. Restituisce poi il nuovo costo scontato
 * @param {number} initialPrice Costo del biglietto senza sconti applicati
 * @param {number} discountAmount % di sconto da applicare
 * @returns {number} Nuovo prezzo con lo sconto applicato
 */
function calculateDiscountedPrice(initialPrice, discountAmount) {
    return initialPrice = initialPrice - (initialPrice / 100 * discountAmount);
}



// * FUNZIONE CHE MOSTRA SULLO SCHERMO I RISULTATI
/**
 * 
 * @param {string} userName Nome dell'utente da mettere sul biglietto
 * @param {string} userAge Tipo di tariffa applicata (Standard/Minor/Over)
 * @param {number} overAge Età per gli over da mostrare se necessario
 * @param {number} ticketPrice Prezzo del biglietto senza sconti applicati
 * @param {number} finalPrice Prezzo del biglietto con eventuali sconti applicati
 */
function showResults(userName, userAge, overAge, ticketPrice, finalPrice) {
    ticketUserName.innerText = userName;

    // * MODIFICO SE NECESSARIO IL TESTO DA MOSTRARE NELLA CASELLA "OFFERTA" E LO INSERISCO
    let userAgeMSG = userAge;
    if (userAgeMSG === 'minor') {
        userAgeMSG = 'minorenni'
    };
    if (userAgeMSG === 'over') {
        userAgeMSG = `over ${overAge}`
    };
    ticketOfferType.innerText = `Biglietto ${userAgeMSG}`;

    // * INSERISCO IL PREZZO DEL BIGLIETTO NELLA CASELLA
    // * SE IL PREZZO È STATO SCONTATO MOSTRO ANCHE IL PREZZO ORIGINALE
    userAge === 'standard' ? ticketTicketPrice.innerText = `${finalPrice.toFixed(2)}€` : ticketTicketPrice.innerHTML = `<del>${ticketPrice.toFixed(2)}€</del><br/>${finalPrice.toFixed(2)}€`;

    // * MOSTRO LA CARD CON I RISULTATI
    if (results.classList.contains('d-none')) results.classList.remove('d-none');
};



// * FUNZIONE CHE SVUOTA GLI INPUT E NASCONDE I RISULTATI
function cancelInfo() {
    inputUserName.value = "";
    inputUserName.focus();
    inputUserAge.value = 'standard';
    inputTripKM.value = 0;

    results.classList.add('d-none');
};