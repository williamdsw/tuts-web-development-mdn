
window.addEventListener('DOMContentLoaded', () => {

    // Assign

    const form = document.querySelectorAll('form')[0];
    const inputEmail = document.querySelector('#inputEmail');
    const inputOtherEmail = document.querySelector('#inputOtherEmail');
    const spanEmailError = document.querySelector('#inputOtherEmail + span.error');

    // Event Listeners

    if (inputEmail) {
        inputEmail.addEventListener('input', function () {
            if (this.validity.typeMismatch) {
                this.setCustomValidity('I am expecting an e-mail address!');
            }
            else {
                this.setCustomValidity('');
            }
        });
    }

    if (inputOtherEmail) {
        inputOtherEmail.addEventListener('input', function() {
            if (this.validity.valid) {
                spanEmailError.innerHTML = '';
                spanEmailError.className = 'error';
            }
            else {
                showError(this, spanEmailError);
            }
        });
    }

    if (form) {
        form.addEventListener('submit', (event) => {
            if (!email.validity.valid) {
                showError(inputOtherEmail, spanEmailError);
                event.preventDefault();
            }
        });
    }
});

function showError(emailInput, spanError) {
    if (!emailInput || !spanError) {
        return;
    }

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