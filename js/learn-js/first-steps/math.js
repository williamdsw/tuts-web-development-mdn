
// FIELDS

let myInteger = 5;
let myFloat = 6.667;
let myDecimal = 1.766421234324242313;
let otherDecimal = myDecimal.toFixed(2);
let myNumber = '33';
let sum = myInteger + myInteger;
let minus = myFloat - myInteger;
let multi = myInteger * 3;
let division = myInteger / 2;
let modulus = myInteger % 2;
let exponent = myInteger ** 2;

// FUNCTIONS

(function(){
    const p = document.createElement('p');
    p.innerHTML += `myInteger: ${myInteger} <br>`;
    p.innerHTML += `myFloat: ${myFloat} <br>`;
    p.innerHTML += `typeof myInteger: ${typeof myInteger} <br>`;
    p.innerHTML += `typeof myFloat: ${typeof myFloat} <br>`;
    p.innerHTML += `myDecimal: ${myDecimal} <br>`;
    p.innerHTML += `otherDecimal: ${otherDecimal} <br>`;
    p.innerHTML += `myNumber: ${myNumber} <br>`;
    p.innerHTML += `myNumber + 3: ${Number(myNumber) + 3} <br>`;
    p.innerHTML += `sum: ${sum} <br>`;
    p.innerHTML += `minus: ${minus} <br>`;
    p.innerHTML += `multi: ${multi} <br>`;
    p.innerHTML += `division: ${division} <br>`;
    p.innerHTML += `modulus: ${modulus} <br>`;
    p.innerHTML += `exponent: ${exponent} <br>`;

    document.body.appendChild(p);
})();