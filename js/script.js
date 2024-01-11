// ! OPERAZIONI PRELIMINARI

// Recuperiamo la griglia
const grid = document.getElementById('grid');
const button = document.querySelector('button');
const form = document.querySelector('form');
const selectField = document.getElementById('difficoltà');
const scoreDisplay = document.getElementById('score');



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
        if(!bombs.includes(randomNumber)) bombs.push(randomNumber);
    }

    return bombs;
}

// ! EFFETTIVO SVOLGIMENTO DEL PROGRAMMA
// Creazione della griglia al click del bottone Play
form.addEventListener('submit', function(event) {
    // ! Impedisco il comportamento di default
    event.preventDefault();

    // Preparo il flag
    let isGameOver = false;

    // Cambio il testo del bottone
    button.innerText = 'Ricomincia';

    // Svuota la griglia
    grid.innerText = '';

    //Recuperiamo il valore
    const inputChoice = selectField.value;

    // Assegno la classe alla griglia
    grid.classList.add(inputChoice);

    // Determino quante rows e quante cols voglio
    let rows = 10;
    let cols = 10;

    switch (inputChoice) {
        case 'hard':
            rows = 7;
            cols = 7;
            break;
        case 'medium':
            rows = 9;
            cols = 9;
            break;
    }

    const totalCells = rows * cols;


    // Preparo una variabile punteggio
    let score = 0;
    scoreDisplay.innerText = score;


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
                console.log('Hai perso! Il tuo punteggio è: ' + score);
                isGameOver = true;
            } else {
                // Incremento punteggio
                scoreDisplay.innerText = ++score;

                // controllo se ha vinto
                if (score === maxScore) {
                    console.log('COMPLIMENTI! HAI VINTO!');
                    isGameOver = true;
                }

            }

        })

        // Aggiungo la cella in pagina
        grid.appendChild(cell);
    }
})