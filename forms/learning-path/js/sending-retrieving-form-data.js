
window.addEventListener('DOMContentLoaded', () => {
    const inputFiles = document.querySelector('#inputFiles');
    const fileNames = document.querySelector('#fileNames');

    if (inputFiles && fileNames) {
        inputFiles.addEventListener('change', () => {
            fileNames.innerHTML = '';
            for (const file of inputFiles.files) {
                fileNames.innerHTML += `${file.name}, `;
            }
        });
    }
});