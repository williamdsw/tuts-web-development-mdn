
// Fields

let browserType = 'Mozilla';
const firstChar = browserType[0];
const lastChar = browserType[browserType.length - 1];
const indexOf = browserType.indexOf('zilla');
const sliced = browserType.slice(0, 3);
const otherSliced = browserType.slice(2);
const lowerCase = browserType.toLowerCase();
const upperCase = browserType.toUpperCase();
const replace = browserType.replace('Moz', 'Van');

// Event Listeners

window.addEventListener ('DOMContentLoaded', () => {
    const myTextarea = document.querySelector('#myTextarea');

    if (myTextarea) {
        myTextarea.innerHTML += `String: ${browserType}\n`;
        myTextarea.innerHTML += `First char: ${firstChar}\n`;
        myTextarea.innerHTML += `Last char: ${lastChar}\n`;
        myTextarea.innerHTML += `Index Of 'zilla': ${indexOf}\n`;
        myTextarea.innerHTML += `Sliced (0, 3): ${sliced}\n`;
        myTextarea.innerHTML += `Sliced (2): ${otherSliced}\n`;
        myTextarea.innerHTML += `Lower case: ${lowerCase}\n`;
        myTextarea.innerHTML += `Upper case: ${upperCase}\n`;
        myTextarea.innerHTML += `Replace: ${replace}\n`;
    }

    printChristmasMessages();
    printCitiesNames();
    printStations();
});

// Functions

function printChristmasMessages () {
    const list = document.querySelector('.output-christmas ul');
    if (list) {
        list.innerHTML = '';

        const greetings = [
            'Happy Birthday', 'Merry Christmas my love', 'A happy Christmas to all the family',
            'You\'re all I want for Christmas', 'Get well soon'
        ];

        for (let message of greetings) {
            if (message.toLowerCase().indexOf('christmas') !== -1) {
                const li = document.createElement('li');
                li.textContent = message;
                list.appendChild(li);
            }
        }
    }
}

function printCitiesNames () {
    const list = document.querySelector('.output-cities ul');
    if (list) {
        list.innerHTML = '';

        const cities = ['lonDon', 'ManCHESTer', 'BiRmiNGHAM', 'liVERpoOL'];

        for (let city of cities) {
            city = city.toLowerCase();
            city = city[0].toUpperCase() + city.slice(1);

            const li = document.createElement('li');
            li.textContent = city;
            list.appendChild(li);
        }
    }
}

function printStations () {
    const list = document.querySelector('.output-stations ul');
    if (list) {
        list.innerHTML = '';

        const stations = [
            'MAN675847583748sjt567654;Manchester Piccadilly',
            'GNF576746573fhdg4737dh4;Greenfield',
            'LIV5hg65hd737456236dch46dg4;Liverpool Lime Street',
            'SYB4f65hf75f736463;Stalybridge',
            'HUD5767ghtyfyr4536dh45dg45dg3;Huddersfield'
        ];

        for (let station of stations) {
            const code = station.slice(0, 3);
            const indexOf = station.indexOf(';');
            const name = station.slice(indexOf + 1);

            const li = document.createElement('li');
            li.textContent = `${code}: ${name}`;
            list.appendChild(li);
        }
    }
}