
document.addEventListener('DOMContentLoaded', () => {
    const checkboxBilling = document.getElementById('checkboxBilling');
    const inputShippingName = document.getElementById('inputShippingName');
    const inputShippingAddress = document.getElementById('inputShippingAddress');
    const inputShippingZipCode = document.getElementById('inputShippingZipCode');
    const inputConfirmName = document.getElementById('inputConfirmName');
    const textareaConfirmAddress = document.getElementById('textareaConfirmAddress');
    const inputConfirmZipCode = document.getElementById('inputConfirmZipCode');

    checkboxBilling.addEventListener('change', toggleBilling);
    inputShippingName.addEventListener('input', () => inputConfirmName.value = inputShippingName.value);
    inputShippingAddress.addEventListener('input', () => textareaConfirmAddress.innerText = inputShippingAddress.value);
    inputShippingZipCode.addEventListener('input', () => inputConfirmZipCode.value = inputShippingZipCode.value);



}, false);

function toggleBilling() {
    const listBillingInputs = document.querySelectorAll('#billing input[type="text"]');
    const listBillingLabels = document.querySelectorAll('.billing-label');

    for (let index = 0; index < listBillingInputs.length; index++) {
        const input = listBillingInputs[index];
        const label = listBillingLabels[index];

        input.disabled = !input.disabled;
        label.classList.toggle('disabled-label');
    }
}