
/**
 * ECMAScript 2015
 */


class AnotherPerson {
    constructor(first, last, age, gender, interests) {
        this.name = { first, last },
        this.age = age,
        this.gender = gender,
        this.interests = interests;
    }

    greeting() {
        return `Hi! I'm ${this.name.first}`;
    };

    farewell() {
        return `${this.name.first} has left the building. Bye for now!`;
    }
}

class AnotherTeacher extends AnotherPerson {
    constructor(first, last, age, gender, interests, subject, grade) {
        super(first, last, age, gender, interests);
        this._subject = subject;
        this.grade = grade;
    }

    get subject() {
        return this._subject;
    }

    set subject(value) {
        this._subject = value;
    }
}

window.addEventListener('DOMContentLoaded', () => {
    const output3 = document.getElementById('output3');
    const output4 = document.getElementById('output4');
    const output5 = document.getElementById('output5');
    const output6 = document.getElementById('output6');

    if (output3 && output4) {
        const person = new AnotherPerson('Jared', 'Leto', 44, 'Male', ['Rock', 'Cinema', 'Space']);
        output3.innerText = person.greeting();
        output4.innerText = person.farewell();
    }

    if (output5 && output6) {
        const teacher = new AnotherTeacher('David', 'Coverdale', 67, 'Male', ['Classic Music', 'Cars'], 'Vocals', 'Music');
        output5.innerText = teacher.greeting();
        output6.innerText = teacher.farewell();

        console.log('old subject: ', teacher.subject);
        teacher.subject = 'Other';
        console.log('new subject: ', teacher.subject);
    }
});