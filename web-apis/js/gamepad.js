
// FIELDS

let haveEvents = 'GamepadEvent' in window;
let haveWebkitEvents = 'WebKitGamepadEvent' in window;
let userGamepads = {};
let raf = window.mozRequestAnimationFrame || window.requestAnimationFrame || window.webkitRequestAnimationFrame;

// FUNCTIONS

const onGamepadConnected = (ev) => addGamepad(ev.gamepad);
const onGamepadDisconnected = (ev) => removeGamepad(ev.gamepad);

if (haveEvents) {
    window.addEventListener('gamepadconnected', onGamepadConnected);
    window.addEventListener('gamepaddisconnected', onGamepadDisconnected);
}
else if (haveWebkitEvents) {
    window.addEventListener('webkitgamepadconnected', onGamepadConnected);
    window.addEventListener('webkitgamepaddisconnected', onGamepadDisconnected);
}
else {
    setInterval(scanGamepads, 500);
}

function addGamepad (gamepad) {

    const controllers = document.querySelector('#controllers');

    console.log('gamepad', gamepad);
    userGamepads[gamepad.index] = gamepad;

    // Global
    const controllerDiv = document.createElement('div');
    controllerDiv.setAttribute('id', `controller-${gamepad.index}`);
    controllerDiv.setAttribute('class', 'controller');

    // Name
    const nameHeader = document.createElement('h1');
    nameHeader.textContent = gamepad.id;
    controllerDiv.appendChild(nameHeader);

    // Buttons
    const buttonsDiv = document.createElement('div');
    buttonsDiv.setAttribute('class', 'buttons');

    for (let i = 0; i < gamepad.buttons.length; i++) {
        const buttonDiv = document.createElement('span');
        buttonDiv.setAttribute('class', 'button');
        buttonDiv.innerHTML = i;
        buttonsDiv.appendChild(buttonDiv);
    }

    controllerDiv.appendChild(buttonsDiv);

    // Axes
    const axesDiv = document.createElement('div');
    axesDiv.setAttribute('class', 'axes');

    for (let i = 0; i < gamepad.axes.length; i++) {
        const axisProgress = document.createElement('div');
        axisProgress.setAttribute('class', 'axis');
        axisProgress.innerHTML = `axis ${i} = 0`;
        axesDiv.appendChild(axisProgress);
    }

    controllerDiv.appendChild(axesDiv);

    // Pulse ?
    const label = document.createElement('label');
    const input = document.createElement('input');
    const button = document.createElement('button');

    label.textContent = 'Duration:';
    input.type = 'number';
    input.min = 100;
    input.max = 5000;
    input.step = 100;
    input.value = 1000;
    button.textContent = 'Pulse?';
    button.addEventListener('click', () => vibrateGamepad(gamepad, input.value));

    controllerDiv.appendChild(label);
    controllerDiv.appendChild(input);
    controllerDiv.appendChild(button);

    controllers.appendChild(controllerDiv);
    raf(updateStatus);
}

function removeGamepad(gamepad) {
    const controllerDiv = document.querySelector(`#controller-${gamepad.index}`);
    document.body.removeChild(controllerDiv);
    delete userGamepads[gamepad.index];
}

function scanGamepads() {
    const gamepads = navigator.getGamepads ? navigator.getGamepads() : (navigator.getWebkitGetGamepads ? navigator.getWebkitGetGamepads() : []);
    for (const gamepad of gamepads) {
        if (gamepad && (gamepad.index in userGamepads)) {
            userGamepads[gamepad.index] = gamepad;
        }
    };
}

function updateStatus() {
    scanGamepads();

    for (const index in userGamepads) {
        const gamepad = userGamepads[index];
        const controllerDiv = document.querySelector(`#controller-${gamepad.index}`);
        const buttonsDivs = controllerDiv.querySelectorAll('.button');
        const axesDivs = controllerDiv.querySelectorAll('.axis');

        // Buttons detection
        gamepad.buttons.forEach ((button, index) => {
            let value = (button.value ? button.value : button);
            let isPressed = (button.pressed ? button.pressed : value == 1);
            let isTouched = (button.touched ? button.touched : value == 1);

            const div = buttonsDivs[index];
            div.setAttribute('class', (isPressed || isTouched ? 'button pressed' : 'button'));
        });

        // Axis detection
        gamepad.axes.forEach((axis, index) => {
            const div = axesDivs[index];
            div.innerHTML = `axis ${index} = ${axis.toFixed(4)}`;
        });
    }

    requestAnimationFrame(updateStatus);
}

function vibrateGamepad(gamepad, duration) {

    if (duration === '') {
        duration = '1000';
    }

    duration = parseInt(duration);

    console.log(gamepad);

    if (gamepad.hapticActuators) { // Firefox
        gamepad.hapticActuators.forEach(act => {
            act.pulse(1.0, 1000).then(result => {
                console.log('result', result);
            });
        });
    }
    else if (gamepad.vibrationActuator) { // Chrome
        const type = gamepad.vibrationActuator.type;
        gamepad.vibrationActuator.playEffect(type, {
            duration: duration, strongMagnitude: 1.0, weakMagnitude: 1.0
        });
    }
}