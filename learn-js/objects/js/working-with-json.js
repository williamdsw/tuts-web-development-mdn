
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

    const buttonLoadJson = document.querySelector('#buttonLoadJson');
    const buttonGenerate = document.querySelector('#buttonGenerate');

    if (buttonLoadJson) {
        buttonLoadJson.addEventListener('click', function() {
            this.disabled = true;
            loadJSON('../../../json/team.json');
        });
    }

    if (buttonGenerate) {
        buttonGenerate.addEventListener('click', dataToJSON);
    }
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

    const jsonError = document.querySelector('#jsonError');
    const divInfo = document.querySelector('.hidden');

    if (jsonError && divInfo) {
        if (typeof(content) === 'string') {
            jsonError.textContent = content;
        }
        else {
            jsonError.textContent = '';
            divInfo.classList.toggle('hidden');
    
            const inputName = document.querySelector('#inputName');
            const inputCountry = document.querySelector('#inputCountry');
            const inputStadium = document.querySelector('#inputStadium');
            const inputCapacity = document.querySelector('#inputCapacity');
            const inputFounded = document.querySelector('#inputFounded');
            const tableBestPlayers = document.querySelector('#tableBestPlayers tbody');

            if (inputName && inputCountry && inputStadium && inputCapacity &&
                inputFounded && tableBestPlayers) {

                inputName.value = (content.name ? content.name : '');
                inputCountry.value = (content.country ? content.country : '');
                inputStadium.value = (content.stadium ? content.stadium : '');
                inputCapacity.value = (content.capacity ? content.capacity.toFixed(3) : '');
                inputFounded.value = (content.founded ? content.founded : '');

                if (content.bestPlayers) {
                    for (const player of content.bestPlayers) {
                        let row =
                            `<tr>
                                <td> ${player.number ? player.number : ''} </td>
                                <td> ${player.position ? player.position : ''} </td>
                                <td> ${player.nation ? player.nation : ''} </td>
                                <td> ${player.player ? player.player : ''} </td>
                             </tr>
                            `;

                        tableBestPlayers.innerHTML += row;
                    }
                }

            }
        }
    }
}

function dataToJSON () {

    const inputFirstName = document.querySelector('#inputFirstName');
    const inputLastName = document.querySelector('#inputLastName');
    const inputAge = document.querySelector('#inputAge');
    const jsonOutput = document.querySelector('#jsonOutput');

    if (inputFirstName && inputLastName && inputAge && jsonOutput) {
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
}