
/* ECMS2017 */

window.addEventListener('DOMContentLoaded', () => {
    hello().then(value => console.log('Hello', value));
    other().then(console.log);
    hi().then(console.log);

    const button = document.querySelector('button');
    if (button) {
        button.addEventListener('click', () => {
            loadImage()
            .catch(e => console.log ('Some error: ', e.message))
            .finally(() => console.log('Finally!'));
        });
    }
});

// convert to a Promise (then, catch)

async function hello() {
    return 'Hello';
}

const other = async () => 'Other';

// 'await' only works for async functions!

async function hi() {
    return greeting = await Promise.resolve('Hi!');
}

async function loadImage() {
    const response = await fetch('../../../assets/images/coffee.jpg');

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    else {
        const blob = await response.blob();
        const objectUrl = URL.createObjectURL(blob);
        const image = document.createElement('img');
        image.src = objectUrl;
        document.body.appendChild(image);
    }
}