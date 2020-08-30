
// FIELDS

const SIZE = 1024 * 1024 * 5;
let fileSystem = null;

let inputFileName = null;
let textAreaContent = null;
let fileList = null;
let messageBox = null;

// FUNCTIONS

window.addEventListener('load', () => {
    console.log('loaded!');

    // requestFileSystem = Chrome | Opera
    window.requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem;
    //window.requestFileSystem(window.TEMPORARY, 1024 * 1024, onSuccess, onError);
    if (window.requestFileSystem) {
        initFileSystem();
    }
    else {
        alert("Sorry! Your browser doesn't support the FileSystem API!");
        return;
    }

    console.log('window.requestFileSystem', window.requestFileSystem);


    // Elements ref
    inputFileName = document.querySelector('#inputFileName');
    textAreaContent = document.querySelector('#textAreaContent');
    fileList = document.querySelector('#listFiles');
    messageBox = document.querySelector('#messageBox');
});

function initFileSystem() {
    navigator.webkitPersistentStorage.requestQuota(SIZE, function (grantedSize) {
        window.requestFileSystem(window.PERSISTENT, grantedSize, function (fs) {
            fileSystem = fs;
            setupFormEventListener();
            listFiles();
        }, onError);
    }, onError);
}

function saveFile(fileName, content) {
    fileSystem.root.getFile(fileName, { create: true }, (fileEntry) => {
        fileEntry.createWriter((fileWriter) => {
            fileWriter.addEventListener('writeend', (ev) => {
                listFiles();

                inputFileName.value = '';
                textAreaContent.value = '';

                messageBox.innerHTML = 'File saved!';
            });

            fileWriter.addEventListener('error', (ev) => {
                console.error('Write error', ev.toString());
                messageBox.innerHTML = 'An error occurred and your file could not be saved!';
            });

            const contentBlob = new Blob([content], { type: 'text/plain' });
            fileWriter.write(contentBlob);
        }, onError);
    }, onError);
}

function errorHandler(error) {
    switch(error) {
        case FileError.SECURITY_ERR: return 'Security Error';
        case FileError.NOT_FOUND_ERR: return 'Not Found Error';
        case FileError.QUOTA_EXCEEDED_ERR: return 'Quota Exceeded Error';
        case FileError.INVALID_MODIFICATION_ERR: return 'Invalid Modification Error';
        case FileError.INVALID_STATE_ERR: return 'Invalid State Error';
        default: return 'Unknown Error';
    }
}

function onError(ev) {
    console.log('error', ev);
}

function setupFormEventListener() {
    const form = document.querySelector('form');

    form.addEventListener('submit', (ev) => {
        ev.preventDefault();
        const fileName = inputFileName.value;
        const content = textAreaContent.value;

        saveFile(fileName, content);
    });
}

function listFiles() {
    const directoryReader = fileSystem.root.createReader();
    let entries = [];

    const fetchEntries = () => {
        directoryReader.readEntries ((result) => {
            if (!result.length) {
                displayEntries(entries.sort().reverse());
            }
            else {
                entries = entries.concat(result);
                fetchEntries();
            }
        }, onError);
    };

    fetchEntries();
}

function displayEntries(entries) {
    fileList.innerHTML = '';
    entries.forEach((entry) => {
        const li = document.createElement('li');

        // Edit
        const editLink = document.createElement('a');
        editLink.innerHTML = entry.name;
        editLink.className = 'edit-file';
        li.appendChild(editLink);

        // Delete
        const deleteLink = document.createElement('a');
        deleteLink.innerHTML = '[x]';
        deleteLink.className = 'delete-file';
        li.appendChild(deleteLink);

        fileList.appendChild(li);

        editLink.addEventListener('click', (ev) => {
            ev.preventDefault();
            loadFile(entry.name);
        });

        deleteLink.addEventListener('click', (ev) => {
            ev.preventDefault();
            deleteFile(entry.name);
        });
    });
}

function loadFile(fileName) {
    fileSystem.root.getFile(fileName, {}, (fileEntry) => {
        fileEntry.file((file) => {
            const reader = new FileReader();
            reader.addEventListener('load', function() {
                inputFileName.value = fileName;
                textAreaContent.value = this.result;
            });

            reader.readAsText(file);
        }, onError);
    }, onError);
}

function deleteFile(fileName) {
    fileSystem.root.getFile(fileName, { create: false }, (fileEntry) => {
        fileEntry.remove((ev) => {
            listFiles();
            messageBox.innerHTML = 'File deleted';

        }, onError);
    }, onError);
}