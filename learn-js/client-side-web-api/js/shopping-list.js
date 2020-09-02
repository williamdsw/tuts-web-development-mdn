
window.addEventListener('DOMContentLoaded', () => {
    const buttonAdd = document.querySelector('button');
    const list = document.querySelector('ul');
    const input = document.querySelector('#inputItem');
    buttonAdd.addEventListener('click', () => addItem (list, input));
});

function addItem(ul, input) {
    if (input.value !== '') {
        const li = document.createElement('li');
        const span = document.createElement('span');
        const button = document.createElement('button');

        li.textContent = input.value;
        button.textContent = 'Delete';

        button.addEventListener('click', () => {
            if (li.parentElement !== null) {
                li.parentElement.removeChild(li);
                
                input.value = '';
                input.focus();
            }
        });

        span.appendChild(button);
        li.appendChild(span);
        ul.appendChild(li);

        input.value = '';
        input.focus();
    }
    else {
        alert (`Please inform the item's name!`);
    }
}