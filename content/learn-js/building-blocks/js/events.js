
// Event Listeners

window.addEventListener('DOMContentLoaded', () => {
    const button = document.querySelector('button');
    const buttons = document.querySelectorAll('.buttons button');
    const divs = document.querySelectorAll('.interactive div');
    const p = document.querySelector('p');
    const buttonDisplayVideo = document.querySelector('#buttonDisplayVideo');
    const divVideo = document.querySelector('.media');
    const video = document.querySelector('video');

    if (button) {
        button.onclick = function () {
            document.body.style.backgroundColor = getRandomColor();
        };

        button.onmouseover = button.onmouseout = function () {
            button.style.backgroundColor = getRandomColor();
            button.style.color = getRandomColor();
        }
    }

    if (buttons.length !== 0) {
        buttons.forEach((button, index) => {
            button.addEventListener('click', () => {
                if (index !== 0 && index !== buttons.length - 1) {
                    button.onclick = null;
                }
    
                alert(button.innerText);
            });
        });
    }

    if (divs.length !== 0) {
        divs.forEach(div => {
            div.addEventListener('click', (ev) => {
                ev.target.style.backgroundColor = getRandomColor();
                p.innerText = `x: ${ev.x} | y: ${ev.y} | ${ev.timeStamp}`;
            });
        });
    }

    if (buttonDisplayVideo && divVideo && video) {
        buttonDisplayVideo.addEventListener('click', () => {
            let className = divVideo.className;
            className = className.replace('hidden', 'showing');
            divVideo.className = className;
        });

        divVideo.addEventListener('click', () => {
            let className = divVideo.className;
            className = className.replace('showing', 'hidden');
            divVideo.className = className;
        });

        video.addEventListener('click', function (ev) {
            ev.stopPropagation();
            video.play();
        });
    }
});

// Functions

function random(number) {
    return Math.floor(Math.random() * (number + 1));
}

function getRandomColor() {
    const r = random(255);
    const g = random(255);
    const b = random(255);
    return `rgb(${r},${g},${b})`;
}