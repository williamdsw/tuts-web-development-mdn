
let selectWeather = null;
let inputTemperature = null;
let paragraph = null;
let selectTheme = null;
let html = null;
let selectMonth = null;
let listDays = null;
const now = new Date();

(function () {
    selectWeather = document.querySelector('#selectWeather');
    inputTemperature = document.querySelector('#inputTemperature');
    paragraph = document.querySelector('p');
    selectTheme = document.querySelector('#selectTheme');
    html = document.querySelector('html');
    selectMonth = document.querySelector('#selectMonth');
    listDays = document.querySelector('#days');

    selectWeather.addEventListener('change', setWeather);
    selectTheme.addEventListener('change', changeTheme);
    selectMonth.addEventListener('change', buildCalendar);
    selectMonth.value = now.getMonth() + 1;
    
    let event = new Event('change');
    selectMonth.dispatchEvent(event);

})();

function setWeather() {
    const choice = selectWeather.value;
    const temperature = parseInt(inputTemperature.value);

    if (choice === 'sunny') {
        if (temperature < 86) {
            paragraph.textContent = 'It is ' + temperature + ' degrees outside — nice and sunny. Let\'s go out to the beach, or the park, and get an ice cream.';
        } else if (temperature >= 86) {
            paragraph.textContent = 'It is ' + temperature + ' degrees outside — REALLY HOT! If you want to go outside, make sure to put some sunscreen on.';
        }
    } 
    else if (choice === 'rainy') {
        paragraph.textContent = 'Rain is falling outside; take a rain coat and an umbrella, and don\'t stay out for too long.';
    } 
    else if (choice === 'snowing') {
        paragraph.textContent = 'The snow is coming down — it is freezing! Best to stay in with a cup of hot chocolate, or go build a snowman.';
    } 
    else if (choice === 'overcast') {
        paragraph.textContent = 'It isn\'t raining, but the sky is grey and gloomy; it could turn any minute, so take a rain coat just in case.';
    } 
    else {
        paragraph.textContent = '';
    }
}

function changeTheme() {
    const theme = selectTheme.value;
    html.style.backgroundColor = (theme === 'light' ? 'white' : 'black') ;
    html.style.color = (theme === 'light' ? 'black' : 'white') ;
}

function buildCalendar() {
    const choice = selectMonth.value;

    if (choice !== '') {
        let date = new Date();
        const year = date.getFullYear();
        date = new Date(year, parseInt(choice), 0);
        const numberOfDays = date.getDate();
        
        listDays.innerHTML = '';
        for (let i = 1; i <= numberOfDays; i++) {
            let temp = new Date(year, parseInt(choice) -1);
            temp.setDate(i);
            const day = temp.toString().substr(0, 3);

            const li = document.createElement('li');
            li.innerText = `${i} - ${day}`;

            if (now.getDate() === i && parseInt(choice) === now.getMonth() + 1) {
                li.className = 'today';
            }

            listDays.appendChild(li);
        }
    }
}