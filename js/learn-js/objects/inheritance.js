
// CLASSES

function Person (first, last, age, gender, interests) {
    this.name = { first, last },
    this.age = age,
    this.gender = gender,
    this.interests = interests
}

Person.prototype.greeting = function () {
    return `Hi! I'm ${this.name.first}`;
};

function Teacher(first, last, age, gender, interests, subject) {

    // inherits
    Person.call(this, first, last, age, gender, interests);

    this.subject = subject;
}

// Inherits prototypes functions
Teacher.prototype = Object.create(Person.prototype);

// defines constructor
Object.defineProperty(Teacher.prototype, 'constructor', {
    value: Teacher,
    enumerable: false,
    writable: true
});

Teacher.prototype.greeting = function () {
    let prefix = '';
    let localGender = this.gender.toLowerCase();

    if (localGender.toLowerCase() === 'male' || localGender.startsWith('m')) {
        prefix = 'Mr.';
    }
    else if (this.gender.toLowerCase() === 'female' || localGender.startsWith('f')) {
        prefix = 'Ms.';
    }

    return `Hello. My name is ${prefix} ${this.name.last}, and I teach ${this.subject}.`;
}

function Student(first, last, age, genre, interests) {
    Person.call(this, first, last, age, genre, interests);
}

Student.prototype = Object.create(Person.prototype);

Object.defineProperty(Student.prototype, 'constructor', {
    value: Student,
    enumerable: false,
    writable: true
});

Student.prototype.greeting = function () {
    return `Yo! I'm ${this.name.first}`;
};

// FUNCTIONS

window.addEventListener('DOMContentLoaded', function (){
    const output1 = document.getElementById('output1');
    const output2 = document.getElementById('output2');

    const teacher = new Teacher('Dave', 'Mustaine', 33, 'Male', 'Metallica, Old Metal, Baseball'.split(','), 'Guitar');
    const student = new Student('Kirk', 'Hammett', 28, 'Male', 'Metallica, Joe Satriani, Horror Movies'.split(','));

    output1.innerText = teacher.greeting();
    output2.innerText = student.greeting();

    console.log('teacher', teacher);
    console.log('student', student);
});