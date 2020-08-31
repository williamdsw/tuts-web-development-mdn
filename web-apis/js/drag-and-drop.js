
window.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.card');
    const cardList = document.querySelector('.card-list');
    const filesList = document.querySelector('.files-list');

    cards.forEach(card => card.addEventListener('dragstart', onDragStart));
    cardList.addEventListener('dragover', onDragOver);
    cardList.addEventListener('drop', onDrop);

    filesList.addEventListener('dragenter', function(ev) {
        ev.stopPropagation();
        ev.preventDefault();
        this.innerHTML = '';
    });

    filesList.addEventListener('dragover', function(ev) {
        ev.stopPropagation();
        ev.preventDefault();
    });

    filesList.addEventListener('drop', function(ev) {
        ev.stopPropagation();
        ev.preventDefault();

        console.log('ondrop ev', ev);

        const dataTransfer = ev.dataTransfer;
        if (dataTransfer) {
            const files = dataTransfer.files;
            if (files.length !== 0) {
                console.log('files', files);

                this.innerHTML = '';

                for (const file of files) {

                    if (file.type.indexOf('image') !== -1) {
                        const objectUrl = URL.createObjectURL(file);
                        const container = document.createElement('div');
                        const image = document.createElement('img');
                        const description = document.createElement('p');

                        container.setAttribute('class', 'image-container');

                        image.src = objectUrl;
                        image.alt = file.name;
                        description.textContent = file.name;

                        container.appendChild(image);
                        container.appendChild(description);
                        this.appendChild(container);
                    }
                }
            }
            else {
                this.innerHTML = '<h1> Drag your files from explorer here ! </h1>';
            }
        }
    });
});

function onDragStart(ev) {
    console.log('on drag start - ev', ev);

    ev.dataTransfer.setData('text/plain', ev.target.id);
    ev.dataTransfer.setData('text/html', ev.target.outerHTML);
    ev.dataTransfer.setData('text/uri-list', ev.target.ownerDocument.location.href);
    ev.dataTransfer.dropEffect = 'move';
}

function onDragOver(ev) {
    console.log('on drag over - ev', ev);

    ev.preventDefault();
    ev.dataTransfer.dropEffect = 'move';
}

function onDrop(ev) {
    console.log('on drop - ev', ev);

    ev.preventDefault();

    const data = ev.dataTransfer.getData('text/plain');
    ev.target.appendChild(document.getElementById(data));
}

