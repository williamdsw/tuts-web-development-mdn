
// FIELDS

let status = null;
let staticImage = null;
let error = null;

// FUNCTIONS

window.addEventListener('DOMContentLoaded', () => {
    status = document.getElementById('status');
    staticImage = document.getElementById('staticImage');
    error = document.getElementById('error');
    const buttonCall = document.getElementById('buttonCall');
    const buttonLoadImage = document.getElementById('buttonLoadImage');

    buttonCall.addEventListener('click', handleCallButton);
    buttonLoadImage.addEventListener('click', loadImage);
});

function setStatusMessage (message) {
    if (status !== null) {
        status.textContent = message;
    }
}

function handleCallButton(ev) {
    setStatusMessage('Calling...');

    navigator.mediaDevices.getUserMedia({ video: false, audio: true })
    .then(chatStream => {

        console.log('chatStream', chatStream);
        // TODO
        setStatusMessage('Connected!');
    })
    .catch(error => setStatusMessage(`Failed to connect: ${error.message}`));
}

function loadImage() {
    const promise = fetch('../../../assets/images/coffee.jpg');
    promise.then(response => {
        if (response.ok) {
            return response.blob();
        }
        else {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
    })
    .then(blob => setImage(blob))
    .catch(error => setError(error.message));
}

function setImage(blob) {
    if (staticImage !== null) {
        const objectURL = URL.createObjectURL(blob);
        staticImage.src = objectURL;
    }
}

function setError(message) {
    if (error !== null) {
        error.textContent = message;
    }
}