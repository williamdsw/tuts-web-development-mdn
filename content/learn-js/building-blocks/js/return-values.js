
// Event Listeners

window.addEventListener('DOMContentLoaded', () => {

    const inputNumber = document.querySelector('#inputNumber');
    const output = document.querySelector('#output');

    if (inputNumber && output) {
        inputNumber.addEventListener('change', function() {
            if (this.value !== '') {
                output.textContent = '';
                const num = this.value;
    
                if (!isNaN(num)) {
                    const square = toSquare(num);
                    const cube = toCube(num);
                    const factorial = toFactorial(num);
    
                    output.textContent += `${num} to square is ${square}.\n`;
                    output.textContent += `${num} to cube is ${cube}.\n`;
                    output.textContent += `${num} to factorial is ${factorial}.\n`;
                }
                else {
                    output.textContent = 'You need to enter a number!';
                }
            }
        });

        console.log ('ok!');
    }
});

// Functions

function toSquare(num) {
    return num * num;
}

const toCube = (num) => num * num * num;

function toFactorial(num) {
    if (num < 0) return undefined;
    if (num === 0) return 1;
    let x = num - 1;
    while (x > 1) {
        num *= x;
        x--;
    }

    return num;
}