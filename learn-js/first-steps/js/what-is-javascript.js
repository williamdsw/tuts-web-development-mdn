
// Event Listeners

window.addEventListener('load', () => {
    const paragraph = document.querySelector('p');

    if (paragraph) {
        paragraph.addEventListener('click', function() {
            const name = prompt('Enter a new name:');
            this.textContent = `Player 1: ${name}`;
        });
    }
});

document.addEventListener('DOMContentLoaded', () => {
    function createParagraph() {
        const paragraph = document.createElement('p');
        paragraph.textContent = 'You clicked the button';
        document.body.appendChild(paragraph);
    }

    const buttons = document.querySelectorAll('button');
    if (buttons.length !== 0) {
        buttons.forEach(button => {
            button.addEventListener('click', createParagraph);
        });
    }
});