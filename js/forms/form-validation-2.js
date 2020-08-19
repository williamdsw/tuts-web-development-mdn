
(function () {

    // Assign

    const form = document.getElementsByTagName('form')[0];
    const inputEmail = document.getElementById('inputEmail');
    const inputOtherEmail = document.getElementById('inputOtherEmail');
    const spanEmailError = document.querySelector('#inputOtherEmail + span.error');

    // Event Listeners

    inputEmail.addEventListener('input', () => {
        if (inputEmail.validity.typeMismatch) {
            inputEmail.setCustomValidity('I am expecting an e-mail address!');
        }
        else {
            inputEmail.setCustomValidity('');
        }
    });

    inputOtherEmail.addEventListener('input', () => {
        if (inputOtherEmail.validity.valid) {
            spanEmailError.innerHTML = '';
            spanEmailError.className = 'error';
        }
        else {
            showError(inputOtherEmail, spanEmailError);
        }
    });

    form.addEventListener('submit', (ev) => {
        if (!email.validity.valid) {
            showError(inputOtherEmail, spanEmailError);
            event.preventDefault();
        }
    });

})();

function showError(emailInput, spanError) {
    if (emailInput.validity.valueMissing) {
        spanError.textContent = 'You need to enter an e-mail address.';
    }
    else if (emailInput.validity.typeMismatch) {
        spanError.textContent = 'Entered value needs to be an e-mail address.';
    }
    else if (emailInput.validity.tooShort) {
        const minLength = emailInput.minLength;
        const length = emailInput.value.length;
        spanError.textContent = `Email should be at least ${minLength} characters; you entered ${length}.`;
    }

    spanError.className = 'error active';
}