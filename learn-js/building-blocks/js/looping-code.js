
// FIELDS

const cats = ['Bill', 'Jeff', 'Pete', 'Biggles', 'Jasmin'];
const contacts = ['Chris:2232322', 'Sarah:3453456', 'Bill:7654322', 'Mary:9998769', 'Dianne:9384975'];
let paragraphCats = null;
let inputSearch = null;
let paragraphContacts = null;
let inputOtherNumber = null;
let paragraphOutput = null;

// FUNCTIONS

document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.querySelector('canvas');
    const context = canvas.getContext('2d');
    const inputNumber = document.querySelector('#inputNumber');
    const buttonGenerate = document.querySelector('#buttonGenerate');

    paragraphCats = document.getElementById('cats');
    inputSearch = document.getElementById('inputSearch');
    const buttonSearch = document.getElementById('buttonSearch');
    paragraphContacts = document.getElementById('contacts');

    inputOtherNumber = document.getElementById('inputOtherNumber');
    const buttonSquareRoot = document.getElementById('buttonSquareRoot');
    paragraphOutput = document.getElementById('output');

    const HEIGHT = canvas.clientHeight;
    const WIDTH = canvas.clientWidth;

    inputNumber.addEventListener('input', () => {
        const disabled = inputNumber.value.length === 0;
        buttonGenerate.disabled = disabled;
    });

    buttonGenerate.addEventListener('click', () => {
        if (inputNumber.value !== '') {
            const numberOfCircles = parseInt(inputNumber.value);

            context.clearRect(0, 0, WIDTH, HEIGHT);
            for(let i = 1; i <= numberOfCircles; i++) {
                context.beginPath();
                context.fillStyle = 'rgba(255,0,0,0.5)';
                context.arc(random(WIDTH), random(HEIGHT), random(50), 0, 2 * Math.PI);
                context.fill();
            }
        }
    });

    buttonSearch.addEventListener('click', searchContacts);
    buttonSquareRoot.addEventListener('click', generateSquareRoots);

    paragraphCats.innerText = printCats();
    
});

function random(number) {
    return Math.floor(Math.random() * number);
}

function printCats () {
    
    let info = 'My cats are called ';
    for (let i = 0; i < cats.length; i++) {
        const element = cats[i];

        if (i === cats.length - 1) {
            info += 'and ' + element + '.';
        }
        else {
            info += element + ', ';
        }
    }

    return info;
}

function searchContacts() {
    if (inputSearch.value !== '') {
        const search = inputSearch.value;
        inputSearch.value = '';
        inputSearch.focus();

        for (let contact of contacts) {
            contact = contact.split(':');
            if (search.toLowerCase() === contact[0].toLowerCase()) {
                paragraphContacts.innerText = `${contact[0]} number is ${contact[1]}!`;
                break;
            }
            else {
                paragraphContacts.innerText = 'Contact not found!';
            }
        }
    }
}

function generateSquareRoots() {
    if (inputOtherNumber.value !== '') {
        paragraphOutput.textContent = '';
        const number = parseInt(inputOtherNumber.value);

        for(let i = 1; i <= number; i++) {
            const square = Math.sqrt(i);

            if (Math.floor(square) !== square) {
                continue;
            }

            paragraphOutput.textContent += `${i}, `;
        }
    }
}