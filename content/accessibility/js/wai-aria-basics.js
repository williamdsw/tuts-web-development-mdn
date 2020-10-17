
// Fields

let quotes = [];
let blockquoteParagraph = null;

// Helper Functions / Event Listeners

window.addEventListener('DOMContentLoaded', () => {
    console.info('Loaded!');

    blockquoteParagraph = document.querySelector('blockquote p');

    loadFile();
});

function loadFile () {
    const url = '../files/quotes.txt';
    fetch (url).then (response => {
        if (response.ok) {
            response.text().then(text => {
                quotes = text.split('\n');
                showQuote();
                const intervalId = setInterval(showQuote, 5000);

            }).catch (error => dealWithRequestError(error));
        }
        else {
            dealWithRequestError('Some error!');
        }

    }).catch (error => dealWithRequestError(error));
}

function dealWithRequestError (error) {
    console.error ('message', error);

    if (error.message) {
        blockquoteParagraph.textContent = error.message;
        return;
    }

    blockquoteParagraph.textContent = error;
}

function showQuote() {
    if (blockquoteParagraph) {
        const index = Math.floor(Math.random() * quotes.length);
        blockquoteParagraph.textContent = quotes[index];
    }
}