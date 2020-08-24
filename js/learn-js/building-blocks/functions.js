
(function () {

    const paragraphOriginal = document.querySelector('p#original');
    const paragraphReplaced = document.querySelector('p#replaced');
    const paragraphPhrase = document.querySelector('p#phrase');
    const paragraphRandom = document.querySelector('p#random');
    const button = document.querySelector('button');

    let text = 'Functions - reusable blocks of code';
    paragraphOriginal.textContent = ` text: ${text} `;
    console.log ('text', text);

    text = text.replace('Functions', 'Methods');
    paragraphReplaced.textContent = ` replaced: ${text} `;
    console.log ('text', text);

    let words = ['I', 'love', 'chocolate', 'frogs'];
    let phrase = words.join(' ');
    paragraphPhrase.textContent = ` phrase: ${phrase} `;
    console.log ('phrase', phrase);

    let random = Math.random();
    paragraphRandom.textContent = ` random: ${random} `;
    console.log ('random', random);

    button.addEventListener('click', () => alert('clicked!'));

})();

function greetings() {
    alert('greetings!');
}

greetings();