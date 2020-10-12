
// Fields

let str1 = 'The revolution will not be televised\n';
let str2 = "The revolution will not be televised\n";
let str3 = 'I\'ve got no right to take my place...\n';
let str4 = `I've got no right to take my place...\n`;
let number = 543;
let str5 = number.toString();

// Event Listeners

window.addEventListener ('DOMContentLoaded', () => {
    const myTextarea = document.querySelector('#myTextarea');
    const button = document.querySelector('button');

    if (myTextarea) {
        myTextarea.innerHTML += str1;
        myTextarea.innerHTML += str2;
        myTextarea.innerHTML += str3;
        myTextarea.innerHTML += str4;
        myTextarea.innerHTML += str5;
    }

    if (button) {
        button.onclick = function(){
            const name = prompt('What is your name?');
            alert(`Hello ${name}, nice to see you!`);
        };
    }
});