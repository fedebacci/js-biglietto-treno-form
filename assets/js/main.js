// COMMENTO NORMALE (PER COMMENTARE IL CODICE)
// ! COMMENTO ERRORE
// ? COMMENTO DOMANDA
// * COMMENTO HIGHLIGHT
// todo COMMENTO TODO


// * INFORMAZIONI INIZIALI
const ticketPriceForKM = 0.21;
const minorsDiscount = 20;
const minorsAge = 18;
const overDiscount = 40;
const overAge = 65;


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
    calculateTicketPrice(inputUserName.value, inputUserAge.value, minorsAge, minorsDiscount, overAge, overDiscount, inputTripKM.value, ticketPriceForKM)
})


// * FUNZIONE CHE CALCOLA IL PREZZO
// ! SO CHE FARE UNA FUNZIONE PER CIASCUNA AZIONE È BEN PIÙ CHE ESAGERATO, LO FACCIO PER PRENDERE DIMESTICHEZZA CON LA DOCUMENTAZIONE DELLE FUNZIONI. NELLE PROSSIME VERSIONI DI QUESTO STESSO ESERCIZIO TORNERÓ AD INSERIRE TUTTE QUESTE AZIONI NELLA FUNZIONE PRINCIPALE
// ! L'UNICA ALTRA FUNZIONE CHE RIMARRÁ SARÁ QUELLA PER CALCOLARE LO SCONTO
function calculateTicketPrice(userName, userAge, minorsAge, minorsDiscount, overAge, overDiscount, tripKM, ticketPriceForKM) {
    userAge = parseInt(userAge);
    tripKM = parseInt(tripKM);

    // console.warn("___________")
    // console.debug('userName', userName);
    // console.debug('userAge', userAge);
    // console.debug('minorsAge', minorsAge);
    // console.debug('minorsDiscount', minorsDiscount);
    // console.debug('overAge', overAge);
    // console.debug('overDiscount', overDiscount);
    // console.debug('tripKM', tripKM);
    // console.debug('ticketPriceForKM', ticketPriceForKM);
    // console.warn("___________")

    // todo CONTROLLARE SE CI SONO ERRORI E MOSTRARLI ALL'UTENTE (DOPO AVER FATTO LA PARTE DEL CALCOLO SUPPONENDO DI AVERE I DATI CORRETTI)
    const errorMessage = "";
    const priceMessage = `Ciao ${userName}, il costo del tuo biglietto è:`;

    let ticketPrice = calculateBasicPrice(tripKM, ticketPriceForKM);
    // console.debug('ticketPrice', ticketPrice);

    const isMinor = checkIfMinor(userAge, minorsAge);
    // console.debug('isMinor', isMinor);
    const isOver = checkIfOver(userAge, overAge);
    // console.debug('isOver', isOver);


    if (isMinor) {
        ticketPrice = calculateDiscountedPrice(ticketPrice, minorsDiscount);
        // console.debug('ticketPrice CON SCONTO MINORENNI APPLICATO', ticketPrice);
    };
    if (isOver) {
        ticketPrice = calculateDiscountedPrice(ticketPrice, overDiscount);
        // console.debug('ticketPrice CON SCONTO OVER APPLICATO', ticketPrice);
    };

    // ! TEMPORANEO (SOLO PER VEDERE IL PREZZO NON SCONTATO SE NON MINORENNE O OVER)
    // if (!isMinor && !isOver) {
    //     console.debug('ticketPrice SENZA NESSUNO SCONTO APPLICATO', ticketPrice);
    // }

    console.info(`${priceMessage} ${ticketPrice.toFixed(2)}€`);
}



// * FUNZIONE CHE CALCOLA IL PREZZO BASE DEL BIGLIETTO (SENZA SCONTI APPLICATI)
/**
 * Funzione che riceve il n° di KM da percorrere ed il prezzo per ciascun KM e restituisce il costo del biglietto senza sconti applicati
 * @param {number} KM Numeroo di KM da percorrere
 * @param {number} priceForKM Prezzo unitario per KM
 * @returns {number} Prezzo pieno calcolato per il biglietto
 */
function calculateBasicPrice(KM, priceForKM) {
    // console.debug('KM', KM);
    // console.debug('priceForKM', priceForKM);

    return KM * priceForKM;
};



// * FUNZIONE CHE CONTROLLA SE MINORENNE
/**
 * Funzione che riceve l'età dell'utente e l'età massima per applicare lo sconto per minorenni e restituisce un valore che indica se è necessario applicare lo sconto per minorenni
 * @param {number} userAge Età dell'utente
 * @param {number} minorsAge Età massima per applicare lo sconto per minorenni
 * @returns {boolean} Valore che indica se bisogna applicare lo sconto per minorenni
 */
function checkIfMinor(userAge, minorsAge) {
    // console.debug('userAge', userAge);
    // console.debug('minorsAge', minorsAge);
    
    return userAge < minorsAge;
};



// * FUNZIONE CHE CONTROLLA SE OVER
/**
 * Funzione che riceve l'età dell'utente e l'età minima per applicare lo sconto per gli over e restituisce un valore che indica se è necessario applicare lo sconto per gli over
 * @param {number} userAge Età dell'utente
 * @param {number} overAge Età minima per applicare lo sconto per over
 * @returns {boolean} Valore che indica se bisogna applicare lo sconto per gli over
 */
function checkIfOver(userAge, overAge) {
    // console.debug('userAge', userAge);
    // console.debug('overAge', overAge);

    return userAge > overAge;
};



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