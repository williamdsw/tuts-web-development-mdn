
// FIELDS

let inputFirstName = null;
let inputLastName = null;
let inputAge = null;
let selectGender = null;
let inputInterests = null;
let form = null;
let submit = null;
let output = null;

// FUNCTIONS

function Person (firstName, lastName, age, gender, interests) {
    this.name = { first: firstName, last: lastName },
    this.age = age,
    this.gender = gender,
    this.interests = interests,

    this.pronoun = function () {
        return gender === 'Male' ? 'He' : 'She';
    }

    this.bio = function () {
        return `${this.name.first} ${this.name.last} is ${this.age} years old. ${this.pronoun()} likes ${interests.join(', ')}.`;
    },

    this.greeting = function () {
        alert(`Hi! I'm ${this.name.first}.`);
    }
}

window.addEventListener('DOMContentLoaded', function (){
    inputFirstName = document.getElementById('inputFirstName');
    inputLastName = document.getElementById('inputLastName');
    inputAge = document.getElementById('inputAge');
    selectGender = document.getElementById('selectGender');
    inputInterests = document.getElementById('inputInterests');
    form = document.querySelector('form');
    submit = document.querySelector('#buttonSubmit');
    output = document.querySelector('#output');
    const button = document.querySelector('#buttonCreatePerson');

    button.addEventListener('click', validateForm);
});

function validateForm() {
    if (form.checkValidity()) {
        const person = new Person(inputFirstName.value, inputLastName.value, inputAge.value, selectGender.value, inputInterests.value.split(','));
        output.textContent = person.bio();
        person.greeting();

        // Other ways to create objects
        const other = new Object({
            name: { first: inputFirstName.value, last: inputLastName.value },
            age: parseInt(inputAge.value),
            gender: selectGender.value,
            interests: inputInterests.value.split(',')
        });

        const another = Object.create(other);

        console.log('other', other);
        console.log('another', another);
    }
    else {
        submit.click();
    }
}