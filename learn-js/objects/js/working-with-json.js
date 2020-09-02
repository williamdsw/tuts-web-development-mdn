
// CLASSES

class Person {

    constructor() {}

    get name() {
        return this._name;
    }

    set name(name) {
        this._name = name;
    }

    get age() {
        return this._age;
    }

    set age(age) {
        this._age = age;
    }
}

// FUNCTIONS

window.addEventListener('DOMContentLoaded', () => {

    const buttonLoadJson = document.getElementById('buttonLoadJson');
    const buttonGenerate = document.getElementById('buttonGenerate');

    buttonLoadJson.addEventListener('click', () => {
        buttonLoadJson.disabled = true;
        loadJSON('../../json/team.json');
    });

    buttonGenerate.addEventListener('click', dataToJSON);
});

function loadJSON (url) {

    if (window.fetch) {
        fetch(url).then((response) => {
            if (response.ok) {
                response.json().then((json) => {
                    dealWithContent(json);
                });
            }
            else {
                dealWithContent('Error on finding JSON');
            }
        }).catch(() => {
            dealWithContent('Error on fetch');
        });
    }
    else {
        
        let request = new XMLHttpRequest();
        request.onreadystatechange = () => {
            if (request.status == 200 && request.readyState === 4) {
                if (request.responseText !== null && request.responseText !== '') {
                    dealWithContent(JSON.parse(request.responseText));
                }
                else {
                    dealWithContent('Error on finding JSON');
                }
            }
        };

        request.onerror = () => {
            dealWithContent('Error on XMLHttpRequest');
        };

        request.open('GET', url, true);
        request.send();
    }
}

function dealWithContent(content) {

    const jsonError = document.getElementById('jsonError');
    const divInfo = document.querySelector('.hidden');

    if (typeof(content) === 'string') {
        jsonError.textContent = content;
    }
    else {
        jsonError.textContent = '';
        divInfo.classList.toggle('hidden');

        const inputName = document.getElementById('inputName');
        const inputCountry = document.getElementById('inputCountry');
        const inputStadium = document.getElementById('inputStadium');
        const inputCapacity = document.getElementById('inputCapacity');
        const inputFounded = document.getElementById('inputFounded');
        const tableBestPlayers = document.querySelector('#tableBestPlayers tbody');

        inputName.value = (content.name !== undefined ? content.name : '');
        inputCountry.value = (content.country !== undefined ? content.country : '');
        inputStadium.value = (content.stadium !== undefined ? content.stadium : '');
        inputCapacity.value = (content.capacity !== undefined ? content.capacity.toFixed(3) : '');
        inputFounded.value = (content.founded !== undefined ? content.founded : '');

        if (content.bestPlayers !== undefined) {
            for (const player of content.bestPlayers) {
                let row = 
                `<tr>
                    <td> ${player.number !== undefined ? player.number : ''} </td>
                    <td> ${player.position !== undefined ? player.position : ''} </td>
                    <td> ${player.nation !== undefined ? player.nation : ''} </td>
                    <td> ${player.player !== undefined ? player.player : ''} </td>
                 </tr>
                `;

                tableBestPlayers.innerHTML += row;
            }
        }
    }
}

function dataToJSON () {

    const inputFirstName = document.getElementById('inputFirstName');
    const inputLastName = document.getElementById('inputLastName');
    const inputAge = document.getElementById('inputAge');
    const jsonOutput = document.getElementById('jsonOutput');

    const person = new Person();
    if (inputFirstName.value !== '' && inputLastName.value !== '') {
        person.name = {
            first: inputFirstName.value,
            last: inputLastName.value,
        };
    }
    else {
        person.name = { first: 'Robert', last: 'Smith' };
    }

    person.age = (inputAge.value !== '' ? inputAge.value : 30);

    const json = JSON.stringify(person);
    jsonOutput.textContent = json;
}