
window.addEventListener('DOMContentLoaded', () => {

    const inputText = document.querySelector('#inputText');
    const textareaOutput = document.querySelector('#textareaOutput');
    const textEncoder = new TextEncoder();

    inputText.addEventListener('input', function () {
        if (this.value !== '') {
            const encoded = textEncoder.encode(this.value);
            textareaOutput.value = encoded;
        }
    });
});
