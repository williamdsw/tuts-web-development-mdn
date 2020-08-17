
(function(){
    const inputPrice = document.querySelector('#inputPrice');
    const output = document.querySelector('.price-output');

    output.textContent = inputPrice.value;

    inputPrice.addEventListener('input', () => {
        output.textContent = inputPrice.value;
    });
})();