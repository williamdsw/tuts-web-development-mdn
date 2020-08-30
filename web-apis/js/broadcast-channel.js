
window.addEventListener('DOMContentLoaded', () => {

    const containerSend = document.querySelector('#containerSend');
    const containerReceived = document.querySelector('#containerReceived');
    const button = document.querySelector('button');
    const textarea = document.querySelector('textarea');
    const message = document.querySelector('.message');

    const channel = ('BroadcastChannel' in self ? new BroadcastChannel('testChannel') : null);
    channel.addEventListener('message', (ev) => {
        console.log('ev', ev);

        containerSend.style.display = 'none';
        containerReceived.style.display = 'block';
        message.innerHTML += `<p> Message: ${ev.data} </p>`
        message.innerHTML += `<p> Channel: ${ev.explicitOriginalTarget.name} </p>`
        message.innerHTML += `<p> Origin: ${ev.origin} </p>`
        message.innerHTML += `<p> Timestamp: ${ev.timeStamp} </p>`
    });

    button.addEventListener('click', () => {
        if (textarea.value !== '') {
            channel.postMessage(textarea.value);
        }
        else {
            alert('Input some text');
        }
    });
});
