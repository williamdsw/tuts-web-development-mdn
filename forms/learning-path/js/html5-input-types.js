
window.addEventListener('DOMContentLoaded', () => {
    const inputPrice = document.querySelector('#inputPrice');
    const output = document.querySelector('.price-output');

    if (output && inputPrice) {
        output.textContent = inputPrice.value;

        inputPrice.addEventListener('input', function() {
            output.textContent = this.value;
        });
    }
});