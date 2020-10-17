
window.addEventListener('DOMContentLoaded', function (){
    const buttonRawData = document.querySelector('#buttonRawData');
    const buttonFormData = document.querySelector('#buttonFormData');
    const myForm = document.querySelector('#myForm');

    if (buttonRawData) {
        buttonRawData.addEventListener('click', () => sendRawData ({ test: 'ok!' }));
    }

    if (buttonFormData && myForm) {
        buttonFormData.addEventListener('click', () => sendFormData (myForm));
    }
});

function sendRawData(data) {
    const request = new XMLHttpRequest();

    let urlEncodedDataPairs = [];
    for (let name in data) {
        urlEncodedDataPairs.push(encodeURIComponent(name) + '=' + encodeURIComponent(data[name]));
    }

    const urlEncodedData = urlEncodedDataPairs.join('&').replace(/%20/g, '+');

    request.addEventListener('load', () => alert('Data sent!'));
    request.addEventListener('error', () => alert('Something went wrong!'));
    request.open('POST', 'https://example.com/cors.php');
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    request.send(urlEncodedData);
}

function sendFormData(form) {
    const request = new XMLHttpRequest();
    const formData = new FormData(form);

    request.addEventListener('load', (ev) => alert(ev.target.responseText));
    request.addEventListener('error', () => alert('Something went wrong!'));
    request.open('POST', 'https://example.com/cors.php');
    request.send(formData);
}