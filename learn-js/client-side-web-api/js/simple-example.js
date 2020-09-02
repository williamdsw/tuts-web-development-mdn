
document.addEventListener('DOMContentLoaded', () => {
    documentNodesExamples();
    windowExamples(window.innerWidth, window.innerHeight);

    window.addEventListener('resize', () => windowExamples(window.innerWidth, window.innerHeight));
});

function documentNodesExamples() {
    const link = document.querySelector('a');
    link.textContent = 'this project!';
    link.href = 'https://github.com/williamdsw/tuts-web-development-mdn';

    const section = document.querySelector('section');
    const paragraph = document.createElement('p');
    paragraph.textContent = 'We hope you enjoyed the ride!!!';
    section.appendChild(paragraph);

    const text = document.createTextNode(`- Year that's my project!`);
    const linkParagraph = document.querySelector('p');
    linkParagraph.appendChild(text);

    const buttonRemove = document.querySelector('#buttonRemove');
    buttonRemove.addEventListener('click', () => {
        if (linkParagraph.parentElement !== null) {
            section.removeChild(linkParagraph);
        }

        if (paragraph.parentElement !== null) {
            paragraph.remove();
        }
    });

    const buttonChangeStyle = document.querySelector('#buttonChangeStyle');
    buttonChangeStyle.addEventListener('click', () => {
        if (paragraph.parentElement !== null) {
            paragraph.style.color = 'white';
            paragraph.style.backgroundColor = 'black';
            paragraph.style.padding = '10px';
            paragraph.style.width = '250px';
            paragraph.style.textAlign = 'center';
        }
    });

    const buttonChangeClass = document.querySelector('#buttonChangeClass');
    buttonChangeClass.addEventListener('click', () => {
        if (paragraph.parentElement !== null) {
            paragraph.setAttribute('class', 'highlight');
        }
    });
}

function windowExamples(width, height) {
    const div = document.querySelector('div');
    div.style.width = `${width}px`;
    div.style.height = `${height}px`;
}
