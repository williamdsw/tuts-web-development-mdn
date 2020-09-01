
window.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    const inputUrl = document.querySelector('#inputUrl');
    const inputUsername = document.querySelector('#inputUsername');
    const inputPassword = document.querySelector('#inputPassword');
    const info = document.querySelector('#info');

    form.addEventListener('submit', (ev) => {
        ev.preventDefault();

        const address = new URL(inputUrl.value);

        if (inputUsername.value !== '') {
            address.username = inputUsername.value;
        }

        if (inputPassword.value !== '') {
            address.password = inputPassword.value;
        }

        console.log('address', address);

        info.innerHTML = '';
        info.innerHTML += `<p> Host: ${address.host} </p>`;
        info.innerHTML += `<p> Href: ${address.href} </p>`;
        info.innerHTML += `<p> Origin: ${address.origin} </p>`;
        info.innerHTML += `<p> Protocol: ${address.protocol} </p>`;
        info.innerHTML += `<p> Path Name: ${address.pathname} </p>`;
        info.innerHTML += `<p> User Name: ${address.username} </p>`;
        info.innerHTML += `<p> Password: ${address.password} </p>`;
        info.innerHTML += `<p> Port: ${address.port} </p>`;
    });

    buildUrlParametersTable();
});

function buildUrlParametersTable() {
    const urlParametersMain = document.querySelector('#urlParametersMain');

    const url = new URL(document.location.href);
    console.log('url', url);

    if (url.search !== '') {
        const table = document.createElement('table');
        const tableHeader = document.createElement('thead');
        const tableBody = document.createElement('tbody');
        const tableHeaderRow = document.createElement('tr');
        const tableBodyRow = document.createElement('tr');

        url.searchParams.sort();
        const keys = url.searchParams.keys();

        for (const key of keys) {
            
            // Header - Footer
            const tableHeaderCell = document.createElement('td');
            tableHeaderCell.innerText = key;
            tableHeaderRow.appendChild(tableHeaderCell);

            // Body
            const tableBodyCell = document.createElement('td');
            const value = url.searchParams.get(key);
            tableBodyCell.textContent = value;
            tableBodyRow.appendChild(tableBodyCell);
        }
        
        tableBody.appendChild(tableBodyRow);
        tableHeader.appendChild(tableHeaderRow);
        table.appendChild(tableHeader);
        table.appendChild(tableBody);
        urlParametersMain.appendChild(table);
    }
    else {
        const p = document.createElement('p');
        p.textContent = 'No parameters informed!'
        urlParametersMain.appendChild(p);
    }
}