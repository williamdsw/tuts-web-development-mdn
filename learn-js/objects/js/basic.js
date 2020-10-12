
const person = {
    name: ['Robert', 'Smith'],
    age: 61,
    gender: 'male',
    interests: ['Batman', 'Goth', 'Forest', 'Make-up'],
    other: {
        height: 1.75,
        weight: 80,
        occupations: ['Singer', 'Guitarrist', 'Composer']
    },

    bio: function () {
        return `${this.name.join(' ')} is ${this.age} years old! He likes ${this.interests.join(', ')}.`;
    },

    otherInfo: function() {
        return `\nHeight: ${this.other.height} cm.\n Weight: ${this.other.weight} kg.\n Occupations: ${this.other.occupations.join(', ')}.`;
    },

    greeting: function() { alert(`Hi! I'm ${this.name[0]}`) }
};

window.addEventListener('DOMContentLoaded', () => {
    const info = document.querySelector('#info');
    const buttonGreeting = document.querySelector('button');

    console.log ('person', person);

    if (info) {
        info.textContent = person.bio();
        info.textContent += person.otherInfo();
    }

    if (buttonGreeting) {
        buttonGreeting.addEventListener('click', () => person.greeting ());
    }
});