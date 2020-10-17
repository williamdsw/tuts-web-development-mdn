
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
    const output1 = document.querySelector('#output1');
    const output2 = document.querySelector('#output2');

    if (output1 && output2) {
        Person.prototype.farewell = function () {
            alert(`${this.name.first} has left the building. Bye for now!`);
        }

        const person = new Person('Bruce', 'Wayne', 22, 'Male', 'Justice, Revenge, Justice League, The Cure'.split(','));
        const other = new person.constructor('Clark', 'Kent', 23, 'Male', 'Earth, Parents, Louis Lane'.split(','));

        output1.textContent = person.bio();
        output2.textContent = other.bio();

        console.log('valueOf', person.valueOf());
        console.log('getPrototypeOf', Object.getPrototypeOf(person));
        console.log('prototype', Person.prototype);
        console.log('constructor', person.constructor);
        console.log('other', other);
        console.log('constructor.name', other.constructor.name);

        person.farewell();
        other.farewell();
    }
});