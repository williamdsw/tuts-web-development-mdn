
// FIELDS

const COFFEE_JPG_PATH = '../../../assets/images/coffee.jpg';

// FUNCTIONS

window.addEventListener('DOMContentLoaded', () => {
    const buttonLoadImageRequest = document.getElementById('buttonLoadImageRequest');
    const buttonLoadImageFetch = document.getElementById('buttonLoadImageFetch');
    const inputFiles = document.querySelector('input');

    buttonLoadImageRequest.addEventListener('click', () => {
        loadAssetRequest(COFFEE_JPG_PATH, 'blob', displayImage);
    });

    buttonLoadImageFetch.addEventListener('click', () => {
        loadAssetFetch(COFFEE_JPG_PATH, displayImage);
    });

    inputFiles.addEventListener('change', () => {
        if (inputFiles.files.length !== 0) {
            for (const file of inputFiles.files) {
                displayImage(file);
            }
        }
    });

    const gods = ['Apollo', 'Artemis', 'Ares', 'Zeus'];

    // sync callback
    gods.forEach((name, index) => {
        console.log(index + 1, ':', name);
    });
});

function loadAssetRequest(url, type, callback) {
    const request = new XMLHttpRequest();
    request.responseType = type;

    // Async callback
    request.onload = () => callback(request.response);

    request.open('GET', url);
    request.send();
}

function loadAssetFetch(url, callback) {
    fetch(url).then(response => { 
        return response.blob(); 
    })
    .then(blob => callback (blob))
    .catch(error => console.log('Fetch problem: ', error.message));
}

function displayImage(blob) {
    const objectUrl = URL.createObjectURL(blob);
    const image = document.createElement('img');
    image.src = objectUrl;
    document.body.appendChild(image);
}