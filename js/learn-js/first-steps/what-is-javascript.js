
window.addEventListener('load', () => {
    const paragraph = document.querySelector('p');

    paragraph.addEventListener('click', () => {
        const name = prompt('Enter a new name:');
        paragraph.textContent = `Player 1: ${name}`;
    });
});

document.addEventListener('DOMContentLoaded', () => {
    function createParagraph() {
        const paragraph = document.createElement('p');
        paragraph.textContent = 'You clicked the button';
        document.body.appendChild(paragraph);
    }

    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('click', createParagraph);
    });
});