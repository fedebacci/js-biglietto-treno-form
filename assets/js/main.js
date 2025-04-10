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


// * INSERISCO NELLA SELECT IL VALORE PER GLI OVER IN MODO CHE SI POSSA MODIFICARE L'ETÁ PER LO SCONTO OVER TRAMITE JS
const overAgeValue = document.querySelector('select');
// ? CERCO QUALE È LA OPTION A CUI CAMBIARE IL TESTO DINAMICAMENTE. LASCEREI IL CICLO SE DOVESSI FARE UNA COSA PIU COMPLESSA ED ACCETTARE ETA DIVERSE TRAMITE INPUT NUMERICO (COMMIT PRECEDENTE), MA CON LA SELECT POSSO PERMETTERMI DI ANDARE DIRETTAMENTE ALL'ELMENTO INTERESSATO
// overAgeValue.childNodes.forEach((element) => {
//     if (element.value === 'over') element.innerText += overAge
// })
overAgeValue.childNodes[5].innerText += overAge;


// * INPUT PER INFORMAZIONI RICAVATE DALL'UTENTE
const inputUserName = document.getElementById('userName');
// console.debug('inputUserName', inputUserName);
const inputUserAge = document.getElementById('userAge');
// console.debug('inputUserAge', inputUserAge);
const inputTripKM = document.getElementById('tripKM');
// console.debug('inputTripKM', inputTripKM);


// * ELEMENTI AI QUALI REAGIRE
// ! FORSE NON UTILIZZERÓ IL FORM
const formUserInputs = document.getElementById('userInputs');
// console.debug('formUserInputs', formUserInputs);
const btnCalculateTicketPrice = document.getElementById('calculateTicketPrice');
// console.debug('btnCalculateTicketPrice', btnCalculateTicketPrice);
btnCalculateTicketPrice.addEventListener('click', function() {
    calculateTicketPrice(inputUserName.value, inputUserAge.value, minorsDiscount, overDiscount, inputTripKM.value, ticketPriceForKM);
})


// * FUNZIONE CHE CALCOLA IL PREZZO
function calculateTicketPrice(userName, userAge, minorsDiscount, overDiscount, tripKM, ticketPriceForKM) {
    tripKM = parseInt(tripKM);

    // console.warn("___________")
    // console.debug('userName', userName);
    // console.debug('userAge', userAge);
    // console.debug('minorsDiscount', minorsDiscount);
    // console.debug('overDiscount', overDiscount);
    // console.debug('tripKM', tripKM);
    // console.debug('ticketPriceForKM', ticketPriceForKM);
    // console.warn("___________")

    // todo CONTROLLARE SE CI SONO ERRORI E MOSTRARLI ALL'UTENTE (DOPO AVER FATTO LA PARTE DEL CALCOLO SUPPONENDO DI AVERE I DATI CORRETTI)
    const errorMessage = "";
    const priceMessage = `Ciao ${userName}, il costo del tuo biglietto è:`;

    let ticketPrice = tripKM * ticketPriceForKM;
    // * LA SALVO IN UN'ALTRA VARIABILE PER AVERE A DISPOSIZIONE ANCHE IL PREZZO INIZIALE DA MOSTRARE SE VIENE APPLICATO UNO SCONTO
    let finalPrice = ticketPrice;

    if (userAge === 'minor') {
        finalPrice = calculateDiscountedPrice(ticketPrice, minorsDiscount);
        console.log(`Prezzo non scontato: ${ticketPrice.toFixed(2)}€`);
    };
    if (userAge === 'over') {
        finalPrice = calculateDiscountedPrice(ticketPrice, overDiscount);
        console.log(`Prezzo non scontato: ${ticketPrice.toFixed(2)}€`);
    };

    console.info(`${priceMessage} ${finalPrice.toFixed(2)}€`);
}



// * FUNZIONE CHE CALCOLA LO SCONTO (INDIPENDENTEMENTE SE MINORENNE O OVER)
/**
 * Funzione che riceve il costo iniziale del biglietto ed applica lo sconto adeguato per l'utente. Restituisce poi il nuovo costo scontato
 * @param {number} initialPrice Costo del biglietto senza sconti applicati
 * @param {number} discountAmount % di sconto da applicare
 * @returns {number} Nuovo prezzo con lo sconto applicato
 */
function calculateDiscountedPrice(initialPrice, discountAmount) {
    // console.debug('initialPrice', initialPrice);
    // console.debug('discountAmount', discountAmount);

    return initialPrice = initialPrice - (initialPrice / 100 * discountAmount);
}