
// FIELDS

let divGuesses = null;
let divLastResult = null;
let divLowOrHi = null;
let buttonSubmitGuess = null;
let inputGuess = null;
let buttonReset = null;

let randomNumber = Math.floor(Math.random() * 100) + 1;
let guessCount = 1;
let guesses = [];

// FUNCTIONS

document.addEventListener('DOMContentLoaded', () => {
    divGuesses = document.querySelector('.guesses');
    divLastResult = document.querySelector('.last-result');
    divLowOrHi = document.querySelector('.low-or-hi');
    buttonSubmitGuess = document.querySelector('#buttonSubmitGuess');
    inputGuess = document.querySelector('#inputGuess');
    buttonReset = document.querySelector('#buttonReset');

    buttonSubmitGuess.addEventListener('click', checkGuess);
});

function checkGuess() {
    const userGuess = Number(inputGuess.value);
    guesses.push(userGuess);

    divGuesses.textContent = `Previous guesses: ${guesses.join(', ')}`;
    if (userGuess === randomNumber) {
        divLastResult.textContent = 'Congratulations! Yo got it right!';
        divLastResult.className = 'last-result success';
        divLowOrHi.textContent = '';
        setGameOver();
    }
    else if (guessCount === 10) {
        divLastResult.textContent = '!!!GAME OVER!!!';
        setGameOver();
    }
    else {
        divLastResult.textContent = 'Wrong!';
        divLastResult.className = 'last-result fail';
        if (userGuess < randomNumber) {
            divLowOrHi.textContent = 'Last guess was too low!';
        }
        else if (userGuess > randomNumber) {
            divLowOrHi.textContent = 'Last guess was too high!';
        }
    }

    guessCount++;
    inputGuess.value = '';
    inputGuess.focus();
}

function setGameOver(){
    inputGuess.disabled = buttonSubmitGuess.disabled = true;
    buttonReset = document.createElement('button');
    buttonReset.textContent = 'Start new game';
    document.body.append(buttonReset);
    buttonReset.addEventListener('click', resetGame);
}

function resetGame() {
    guessCount = 1;
    guesses = [];

    const resetParagraphs = document.querySelectorAll('.result-parameters p');
    for (const paragraph of resetParagraphs) {
        paragraph.textContent = '';
    }

    buttonReset.parentNode.removeChild(buttonReset);

    inputGuess.disabled = buttonSubmitGuess.disabled = false;
    inputGuess.value = '';
    inputGuess.focus();

    divLastResult.className = 'last-result';

    randomNumber = Math.floor(Math.random() * 100) + 1;
}