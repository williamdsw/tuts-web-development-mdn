
window.addEventListener('DOMContentLoaded', () => {

    console.log('history', history);

    const header = document.querySelector('h2');
    const buttonBack = document.querySelector('#buttonBack');
    const buttonForward = document.querySelector('#buttonForward');

    header.innerText += history.length;
    buttonBack.addEventListener('click', () => history.back());
    buttonForward.addEventListener('click', () => history.forward());
});