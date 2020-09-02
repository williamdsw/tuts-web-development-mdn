
function buildHtml() {
    
    const button1 = document.getElementById('button1');
    const button2 = document.getElementById('button2');
    const button3 = document.getElementById('button3');

    button1.onclick = () => displayMessage('Wow, this is a different message!');
    button2.onclick = () => displayMessage('Your inbox is almost full - delete some mails!', 'warning');
    button3.onclick = () => displayMessage('Brian: hi there, how are you today?', 'chat');
}

function displayMessage(text, type) {
    const html = document.querySelector('html');

    const div = document.createElement('div');
    div.setAttribute('class', 'message-box');
    html.appendChild(div);

    const p = document.createElement('p');
    p.textContent = text;
    div.appendChild(p);

    if (type === 'warning') {
        div.className = 'message-box danger';
    }
    else if (type === 'chat') {
        div.className = 'message-box chat';
    }
    else {
        div.className = 'message-box';
        p.style.paddingLeft = '20px';
    }

    const closeButton = document.createElement('button');
    closeButton.textContent = 'x';
    div.appendChild(closeButton);

    closeButton.onclick = function () {
        div.parentNode.removeChild(div);
    };
}

buildHtml();