
// Fields

let secondOutput = null;
let message = null;

let products = ['bread', 'milk', 'cheese', 'hummus', 'noodles'];
let sequence = [1, 1, 2, 3, 5, 8, 13];
let random = ['tree', 795, [0, 1, 2]];
let citiesStr = 'Manchester,London,Liverpool,Birmingham,Leeds,Carlisle';
let cities = citiesStr.split(',');
let sameCities = cities.toString();

let teams = ['PSG'];

// Event Listeners

document.addEventListener('DOMContentLoaded', () => {
    const firstOutput = document.querySelector('output#first');
    secondOutput = document.querySelector('output#second');
    const buttonPush = document.querySelector('#buttonPush');
    const buttonPop = document.querySelector('#buttonPop');
    const buttonUnshift = document.querySelector('#buttonUnshift');
    const buttonShift = document.querySelector('#buttonShift');
    message = document.querySelector('#message');
    const inputTeam = document.querySelector('#inputTeam');

    if (firstOutput && secondOutput) {
        printArray(products , firstOutput);
        printArray(sequence, firstOutput);
        printArray(random, firstOutput);
        printArray(cities, firstOutput);
        printArray(teams, secondOutput);
    }

    console.log('citiesStr:', citiesStr);
    console.log('sameCities:', sameCities);

    if (inputTeam && buttonPush && buttonUnshift && buttonShift) {
        inputTeam.addEventListener('input', function() {
            const disabled = this.value.length === 0;
            buttonPush.disabled = buttonUnshift.disabled = disabled;
        });
    
        buttonPush.addEventListener('click', () => push(inputTeam.value));
        buttonPop.addEventListener('click', pop);
        buttonUnshift.addEventListener('click', () => unshift(inputTeam.value));
        buttonShift.addEventListener('click', shift);
    }
    
});

// Functions

function printArray(array, output) {

    if (output == secondOutput) {
        output.innerHTML = array.join(', ') + ` || Length: ${array.length} <br/>`;
    }
    else {
        output.innerHTML += array.join(', ') + ` || Length: ${array.length} <br/>`;
    }
}

function push(value) {
    if (!message) return;

    value = value.trim();

    if (teams.indexOf(value) === -1) {
        teams.push(value);
        printArray(teams, secondOutput);
        message.innerHTML = `${value} was added to Teams!`;
    }
}

function pop() {
    if (!message) return;
    if (teams.length === 0) return;

    const value = teams.pop();
    printArray(teams, secondOutput);
    message.innerHTML = `${value} was popped from Teams!`;
}

function unshift(value) {
    if (!message) return;

    value = value.trim();
    
    if (teams.indexOf(value) === -1) {
        teams.unshift(value);
        printArray(teams, secondOutput);
        message.innerHTML = `${value} was unshifted to Teams!`;
    }
}

function shift() {
    if (!message) return;
    if (teams.length === 0) return;

    const value = teams.shift();
    printArray(teams, secondOutput);
    message.innerHTML = `${value} was shifted from Teams!`;
}