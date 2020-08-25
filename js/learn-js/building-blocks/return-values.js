
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

window.addEventListener('DOMContentLoaded', () => {

    const inputNumber = document.getElementById('inputNumber');
    const output = document.getElementById('output');

    inputNumber.addEventListener('change', () => {
        if (inputNumber.value !== '') {
            output.textContent = '';
            const num = inputNumber.value;

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
});