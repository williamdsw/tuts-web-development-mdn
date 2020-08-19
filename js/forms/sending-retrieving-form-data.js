
(function() {
    
    const inputFiles = document.getElementById('inputFiles');
    const fileNames = document.getElementById('fileNames');

    inputFiles.addEventListener('change', () => {
        fileNames.innerHTML = '';
        for (const file of inputFiles.files) {
            fileNames.innerHTML += `${file.name}, `;
        }
    });

})();