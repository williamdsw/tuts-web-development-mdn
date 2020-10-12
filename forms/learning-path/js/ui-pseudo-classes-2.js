
document.addEventListener('DOMContentLoaded', () => {

    const checkboxBilling = document.querySelector('#checkboxBilling');
    const inputShippingName = document.querySelector('#inputShippingName');
    const inputShippingAddress = document.querySelector('#inputShippingAddress');
    const inputShippingZipCode = document.querySelector('#inputShippingZipCode');
    const inputConfirmName = document.querySelector('#inputConfirmName');
    const textareaConfirmAddress = document.querySelector('#textareaConfirmAddress');
    const inputConfirmZipCode = document.querySelector('#inputConfirmZipCode');

    if (checkboxBilling) {
        checkboxBilling.addEventListener('change', toggleBilling);
    }

    if (inputShippingName) {
        inputShippingName.addEventListener('input', () => inputConfirmName.value = inputShippingName.value);
    }

    if (inputShippingAddress) {
        inputShippingAddress.addEventListener('input', () => textareaConfirmAddress.innerText = inputShippingAddress.value);
    }

    if (inputShippingZipCode) {
        inputShippingZipCode.addEventListener('input', () => inputConfirmZipCode.value = inputShippingZipCode.value);
    }

}, false);

function toggleBilling() {
    const listBillingInputs = document.querySelectorAll('#billing input[type="text"]');
    const listBillingLabels = document.querySelectorAll('.billing-label');

    if (listBillingInputs.length === listBillingLabels.length) {
        for (let index = 0; index < listBillingInputs.length; index++) {
            const input = listBillingInputs[index];
            const label = listBillingLabels[index];
    
            input.disabled = !input.disabled;
            label.classList.toggle('disabled-label');
        }
    }
}