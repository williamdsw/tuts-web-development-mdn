
const supported = document.querySelector('#supported');

// 2020-08-29 - currently supported only on Firefox 62
if ('ondevicelight' in window) {
    window.addEventListener('devicelight', (ev) => {
        const body = document.querySelector('body');
        if (ev.value < 50) {
            body.classList.add('dark-theme');
            body.classList.remove('light-theme');
        }
        else {
            body.classList.add('light-theme');
            body.classList.remove('dark-theme');
        }
    });

    supported.textContent = 'Device Light supported';
}
else {
    console.log('devicelight event not supported');
    supported.textContent = 'Device Light not supported';
}