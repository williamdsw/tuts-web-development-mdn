
const assetsPaths = [
    '../../../assets/images/coffee.jpg',
    '../../../assets/images/tea.jpg',
    '../../../assets/txts/description.txt',
];

let divContent = null;

window.addEventListener('DOMContentLoaded', () => {
    const button = document.querySelector('button');
    const pError = document.querySelector('#error');
    divContent = document.querySelector('#content');

    if (button && pError && divContent) {
        button.addEventListener('click', () => {
            divContent.innerHTML = '';
            const promises = [];
            assetsPaths.forEach(path => promises.push(fetch(path)));
            console.log ('promises', promises);
            Promise.all(promises).then(responses => {
                responses.forEach(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    else {
                        const contentType = response.headers.get('content-type');
                        console.log('response', response);
                        console.log('response', response.headers.get('Content-Type'));
    
                        if (contentType.indexOf('image') !== -1) {
                            response.blob().then(blob => buildImage(blob));
                        }
                        else if (contentType.indexOf('text') !== -1) {
                            response.text().then(text => buildText(text));
                        }
                    }
                });
            })
            .catch(error => pError.textContent = `There has been a problem with your fetch operation: ${error.message}`)
            .finally (() => console.log ('finally of promise!'));
        });
    }

    
});

function buildImage(blob) {
    if (divContent && blob) {
        const objectUrl = URL.createObjectURL(blob);
        const img = document.createElement('img');
        img.src = objectUrl;
        divContent.appendChild(img);
    }
}

function buildText(text) {
    if (divContent && text) {
        const textarea = document.createElement('textarea');
        textarea.textContent = text;
        divContent.appendChild(textarea);
    }
}