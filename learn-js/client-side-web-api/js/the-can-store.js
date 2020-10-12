
// FIELDS

let main = null;
let categoryGroup = [];
let finalGroup = [];
let lastSearch = '';
let lastCategory = '';
let searchTerm = '';
let products = [];

// FUNCTIONS

window.addEventListener('DOMContentLoaded', () => {
    loadProducts();
    initialize();
});

function loadProducts() {
    if (window.fetch) {
        fetch('../../../json/products.json')
        .then(response => response.json())
        .then(json => products = json)
        .catch(error => onError);
    }
}

function onError (error) {
    console.log('fetch error', error.message);
    products = [];
}

function fetchBlob(product) {
    if (window.fetch) {
        const url = `../../../assets/images/the-can-store/${product.image}`;
        fetch(url)
        .then(response => response.blob())
        .then(blob => {
            const objectURL = URL.createObjectURL(blob);
            showProduct(objectURL, product);
        });
    }
}

function initialize() {
    const selectCategory = document.querySelector('#selectCategory');
    const inputSearchTerm = document.querySelector('#inputSearchTerm');
    const buttonSearch = document.querySelector('button');
    main = document.querySelector('main');

    if (selectCategory && inputSearchTerm && buttonSearch) {
        lastCategory = selectCategory.value;
        finalGroup = products;
        updateDisplay();

        categoryGroup = finalGroup = [];

        buttonSearch.addEventListener('click', (ev) => {
            searchTerm = inputSearchTerm.value;
            chooseCategory(ev, selectCategory.value);
        });
    }
}

function chooseCategory(ev, value) {
    ev.preventDefault();

    categoryGroup = [];
    finalGroup = [];

    if (value.lastCategory && searchTerm.trim() === lastSearch) {
        return;
    }
    else {
        lastCategory = value;
        lastSearch = searchTerm;

        if (lastCategory === 'All') {
            categoryGroup = products;
        }
        else {
            const lowerCase = lastCategory.toLowerCase();
            products.forEach(product => {
                if (product.type === lowerCase) {
                    categoryGroup.push(product);
                }
            });
        }

        selectProducts();
    }
}

function selectProducts() {
    if (searchTerm.trim() === '') {
        finalGroup = categoryGroup;
    } 
    else {
        const lowerCase = searchTerm.trim().toLowerCase();
        categoryGroup.forEach(category => {
            if (category.name.indexOf(lowerCase) !== -1) {
                finalGroup.push(category);
            }
        });
    }

    updateDisplay();
}

function updateDisplay() {
    if (main) {
        while (main.firstChild) {
            main.removeChild(main.firstChild);
        }
    
        if (finalGroup.length === 0) {
            const paragraph = document.createElement('p');
            paragraph.textContent = 'No results to display!';
            main.appendChild(paragraph);
        }
        else {
            finalGroup.forEach(product => fetchBlob(product));
        }
    }
}

function showProduct(objectURL, product) {
    const section = document.createElement('section');
    const heading = document.createElement('h2');
    const paragraph = document.createElement('p');
    const image = document.createElement('img');

    section.setAttribute('class', product.type);

    let name = product.name;
    name = name.replace(name.charAt(0), name.charAt(0).toUpperCase());
    heading.textContent = name;

    paragraph.textContent = `$ ${product.price.toFixed(2)}`;

    image.src = objectURL;
    image.alt = name;

    main.appendChild(section);
    section.appendChild(heading);
    section.appendChild(paragraph);
    section.appendChild(image);
}
