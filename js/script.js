// ! OPERAZIONI PRELIMINARI

// Recuperiamo la griglia
const grid = document.getElementById('grid');
const button = document.querySelector('button');
const form = document.querySelector('form');
const selectField = document.getElementById('difficoltà');
const scoreDisplay = document.getElementById('score');

// Preparo il flag
let isGameOver = false;

// ! FUNZIONI
/**
 * Funzione utile alla creazione delle celle
 * @param {number} content Il numero contenuto nella cella
 * @returns Creazione della cella
 */
const createCell = content => {
    const newCell = document.createElement('div');
    newCell.className = 'cell';
    newCell.innerText = content;
    return newCell;
}

/**
 * Funzione per generare TOT bombe casuali, tutte diverse, nel range delle celle disponibili
 * @param {number} maxBombNumber Numero massimo da cui generare le bombe // 100 - 81 - 49
 * @param {number} totalBombs Numero totale di bombe da inserire nell'array // 16
 * @returns Creazione delle bombe
 */
const generateBombs = (maxBombNumber, totalBombs) => {
    const bombs = [];
    while (bombs.length < totalBombs) {
        const randomNumber = Math.floor(Math.random() * maxBombNumber) + 1;
        if (!bombs.includes(randomNumber)) bombs.push(randomNumber);
    }
    return bombs;
}

/**
 * Funzione che gestisce il gameOver
 * @param {number} score Il punteggio raggiunto
 * @param {boolean} hasWon Per stabilire se l'utente ha vinto oppure ha perso
 */
const endGame = (score, hasWon = false) => {
    const message = hasWon
        ? 'COMPLIMENTI! HAI VINTO!'
        : `Hai perso! Hai totalizzato ${score} punti.`;

    alert(message);
    isGameOver = true;
}

// ! EFFETTIVO SVOLGIMENTO DEL PROGRAMMA
// Creazione della griglia al click del bottone Play
form.addEventListener('submit', function (event) {
    // ! Impedisco il comportamento di default
    event.preventDefault();

    // Reset dello stato
    isGameOver = false;
    let score = 0;
    scoreDisplay.innerText = score;

    // Reset delle classi della griglia
    grid.className = '';

    // Cambio il testo del bottone
    button.innerText = 'Ricomincia';

    // Svuota la griglia
    grid.innerText = '';

    // Recuperiamo il valore della difficoltà
    const inputChoice = selectField.value;

    // Rimuovo la classe della difficoltà precedente, se presente
    grid.classList.remove('easy', 'medium', 'hard');

    // Assegno la classe alla griglia
    grid.classList.add(inputChoice);

    // Determino quante rows e quante cols voglio
    let rows, cols;
    switch (inputChoice) {
        case 'medium':
            rows = 9;
            cols = 9;
            break;
        case 'hard':
            rows = 7;
            cols = 7;
            break;
        case 'easy':
            rows = 10;
            cols = 10;
            break;
    }

    const totalCells = rows * cols;

    // Preparo le informazioni per le bombe
    const totalBombs = 16;

    // Punteggio massimo 
    const maxScore = totalCells - totalBombs;

    // Generiamo le bombe
    const bombs = generateBombs(totalCells, totalBombs);
    console.log(bombs);

    // Creazione ciclo for per ottenere la griglia
    for (let i = 1; i <= totalCells; i++) {
        // Creare una cella
        const cell = createCell(i);

        // Al click stampo in console il numero della cella, poi la coloriamo di azzurro
        cell.addEventListener('click', () => {
            // ! Controllo se è stata già cliccata
            if (isGameOver || cell.classList.contains('clicked')) return;

            // Aggiungo la classe clicked
            cell.classList.add('clicked');

            // Stampo il numero della cella cliccata
            console.log(i);

            // Controllo se ha cliccato la bomba
            const hasHitBomb = bombs.includes(i);

            if (hasHitBomb) {
                cell.classList.add('bomb');
                endGame(score, false);
            } else {
                // Incremento punteggio
                scoreDisplay.innerText = ++score;

                // controllo se ha vinto
                if (score === maxScore) {
                    endGame(score, true);
                }
            }
        });

        // Aggiungo la cella in pagina
        grid.appendChild(cell);
    }
});
