// ! OPERAZIONI PRELIMINARI

// Recuperiamo la griglia
const grid = document.getElementById('grid');
const button = document.querySelector('button');
const form = document.querySelector('form');
const selectField = document.getElementById('difficoltà');




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


// ! EFFETTIVO SVOLGIMENTO DEL PROGRAMMA
// Creazione della griglia al click del bottone Play
form.addEventListener('submit', function(event) {
    // ! Impedisco il comportamento di default
    event.preventDefault();

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



    // Creazione ciclo for per ottenere la griglia
    for (let i = 1; i <= totalCells; i++) {

        // Creare una cella
        const cell = createCell(i);

        // Al click stampo in console il numero della cella, poi la coloriamo di azzurro
        cell.addEventListener('click', () => {
            cell.classList.add('clicked');
            console.log(i);
        })

        // Aggiungo la cella in pagina
        grid.appendChild(cell);
    }
})