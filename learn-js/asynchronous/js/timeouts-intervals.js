
// FIELDS

let greeting = null;
let today = null;
let greetingTimeout = null;
let clockInterval = null;
let box = null;
let boxAnimationFrame = null;

// FUNCTIONS

window.addEventListener('DOMContentLoaded', () => {
    greeting = document.querySelector('#greeting');
    today = document.querySelector('#today');
    const button = document.querySelector('button');
    const buttonModifyBox = document.querySelector('#buttonModifyBox');
    const buttonStopBox = document.querySelector('#buttonStopBox');
    box = document.querySelector('.box');

    greetingTimeout = setTimeout(sayHi, 2000, 'Mr. Universe');
    clockInterval = setInterval(displayTime, 1000);

    if (button) {
        button.addEventListener('click', () => {
            if (greetingTimeout !== null) {
                clearTimeout(greetingTimeout);
            }
    
            if (clockInterval !== null) {
                clearInterval(clockInterval);
            }
        });
    }

    if (buttonModifyBox) {
        buttonModifyBox.addEventListener('click', modifyBox);
    }
    
    if (buttonStopBox) {
        buttonStopBox.addEventListener('click', () => {
            if (boxAnimationFrame) {
                cancelAnimationFrame(boxAnimationFrame);
            }
        });
    }
});

function sayHi(who) {
    const greeting = document.querySelector('#greeting');
    if (greeting) {
        greeting.textContent = `Hello, ${who}`;
    }
}

function displayTime() {
    const date = new Date();
    const time = date.toLocaleTimeString();
    if (today) {
        today.textContent = time;
    }
}

function modifyBox() {
   
    if (box) {
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