
// FIELDS

let greeting = null;
let today = null;
let greetingTimeout = null;
let clockInterval = null;
let box = null;
let boxAnimationFrame = null;

// FUNCTIONS

window.addEventListener('DOMContentLoaded', () => {
    greeting = document.getElementById('greeting');
    today = document.getElementById('today');
    const button = document.querySelector('button');
    const buttonModifyBox = document.querySelector('#buttonModifyBox');
    const buttonStopBox = document.querySelector('#buttonStopBox');
    box = document.querySelector('.box');

    greetingTimeout = setTimeout(sayHi, 2000, 'Mr. Universe');
    clockInterval = setInterval(displayTime, 1000);

    button.addEventListener('click', () => {
        if (greetingTimeout !== null) {
            clearTimeout(greetingTimeout);
        }

        if (clockInterval !== null) {
            clearInterval(clockInterval);
        }
    });

    buttonModifyBox.addEventListener('click', modifyBox);

    buttonStopBox.addEventListener('click', () => {
        if (boxAnimationFrame !== null) {
            cancelAnimationFrame(boxAnimationFrame);
        }
    });
});

function sayHi(who) {
    const greeting = document.getElementById('greeting');
    greeting.textContent = `Hello, ${who}`;
}

function displayTime() {
    const date = new Date();
    const time = date.toLocaleTimeString();
    today.textContent = time;
}

function modifyBox() {
   
    if (box !== null) {
        const r = random(0, 255);
        const g = random(0, 255);
        const b = random(0, 255);
        const a = random(0.1, 1);
        box.style.backgroundColor = `rgba(${r},${g},${b},${a})`;
    }

    boxAnimationFrame = requestAnimationFrame(modifyBox);
}

function random(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}