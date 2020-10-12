
// Fields

let myAge = 25;
let myHeight = 1.75;
let myName = 'William';
let iAmAlive = true;
let favoriteBands = ['Megadeth', 'Metallica', 'Iron Maiden', 'Queen'];

let myself = {
    age: 25, height: 1.75, name: 'William', iAmAlive: true, 
    favoriteBands: ['Megadeth', 'Metallica', 'Iron Maiden', 'Queen']
};

const daysInWeek = 7;

// Event Listeners

window.addEventListener('DOMContentLoaded', function () {
    const textareaInformation = document.getElementById('textareaInformation');

    if (textareaInformation) {
        textareaInformation.innerHTML += `Days in Week: ${daysInWeek}\n\n`;
        textareaInformation.innerHTML += `Age: ${myAge}\n`;
        textareaInformation.innerHTML += `Height: ${myHeight}\n`;
        textareaInformation.innerHTML += `Name: ${myName}\n`;
        textareaInformation.innerHTML += `Am I Alive: ${iAmAlive}\n`;
        textareaInformation.innerHTML += `Favorite bands: ${favoriteBands}\n\n`;

        for (const prop of Object.keys(myself)) {
            textareaInformation.innerHTML += `${prop} : ${myself[prop]}\n`;
        }
    }
});

