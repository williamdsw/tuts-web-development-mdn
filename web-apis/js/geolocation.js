
window.addEventListener('DOMContentLoaded', () => {
    const buttonFindMe = document.querySelector('#buttonFindMe');
    const status = document.querySelector('#status');
    const info = document.querySelector('#info');
    const mapLink = document.querySelector('#mapLink');
    buttonFindMe.addEventListener('click', () => findGeolocation(status, info, mapLink));
});

function findGeolocation(status, info, mapLink) {
    mapLink.href = mapLink.textContent = '';

    const onSuccess = (position) => {

        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        console.log('position', position);

        status.textContent = '';
        info.textContent = `latitude: ${latitude} º | longitude: ${longitude} º`;
        mapLink.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
        mapLink.textContent = info.textContent;
    };

    const onError = () => status.textContent = 'Unable to retrieve your location';

    if (!navigator.geolocation) {
        status.textContent = 'Geolocation is not supported by your browser!';
    }
    else {
        status.textContent = 'Locating...';
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }
}