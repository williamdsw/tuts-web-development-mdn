
// FIELDS

let inputCustomName = null;
let inputRadioUS = null;
let inputRadioUK = null;
let buttonRandomize = null;
let paragraphStory = null;

const names = ['Willy the Goblin', 'Big Daddy', 'Father Christmas'];
const places = ['the soup kitchen', 'Disneyland', 'the White House'];
const actions = ['spontaneously combusted', 'melted into a puddle on the sidewalk', 'turned into a slug and crawled away'];
const story = 'It was :weight: outside, so :name: went for a walk. When they got to :place:, they stared in horror for a few moments, then :action:. :custom_name: saw the whole thing, but was not surprised — :name: weights :temperature:, and it was a hot day.';

// FUNCTIONS

document.addEventListener('DOMContentLoaded', () => {
    inputCustomName = document.getElementById('inputCustomName');
    inputRadioUS = document.getElementById('inputRadioUS');
    inputRadioUK = document.getElementById('inputRadioUK');
    buttonRandomize = document.querySelector('.randomize');
    paragraphStory = document.querySelector('.story');

    buttonRandomize.addEventListener('click', generateStory);
});

function generateStory() {

    const name = getRandomValueFromArray(names);
    const place = getRandomValueFromArray(places);
    const action = getRandomValueFromArray(actions);
    const customName = (inputCustomName.value !== '' ? inputCustomName.value : 'Bob');

    let weight = '';
    let temperature = '';
    if (inputRadioUK.checked) {
        weight = Math.round(300 * 0.0714286) + ' stone'
        temperature = Math.round((94 - 32) * (5 / 9)) + ' centigrade';
    }
    else if (inputRadioUS) {
        weight = '94 fahrenheit';
        temperature = '300 pounds';
    }

    let newStory = story.replace(/:name:/g, name);
    newStory = newStory.replace(/:place:/g, place);
    newStory = newStory.replace(/:action:/g, action);
    newStory = newStory.replace(/:custom_name:/g, customName);
    newStory = newStory.replace(/:weight:/g, weight);
    newStory = newStory.replace(/:temperature:/g, temperature);

    paragraphStory.textContent = newStory;
    paragraphStory.style.visibility = 'visible';
}

function getRandomValueFromArray(array) {
    const random = Math.floor(Math.random() * array.length);
    return array[random];
}