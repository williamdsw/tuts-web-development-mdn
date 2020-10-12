
// Custom prototype functions

NodeList.prototype.forEach = function (callback) {
    Array.prototype.forEach.call (this, callback);
};

// Event Listeners

window.addEventListener('load', function() {
    document.body.classList.remove('no-widget');
    document.body.classList.add('widget');

    let selectList = document.querySelectorAll('.select');
    if (selectList.length !== 0) {
        selectList.forEach(function (select){
            let optionList = select.querySelectorAll('.option');
            if (optionList.length !== 0) {
                let selectedIndex = getIndex(select);

                select.tabIndex = 0;
                select.previousElementSibling.tabIndex = -1;

                updateValue(select, selectedIndex);

                optionList.forEach(function (option, index) {
                    option.addEventListener('mouseover', function () {
                        highlightOption(select, option);
                    })

                    option.addEventListener('click', function (ev) {
                        updateValue(select, index);
                    });
                });

                select.addEventListener('click', function (ev) {
                    toggleOptionList(select);
                });

                select.addEventListener('focus', function (ev) {
                    activeSelect(select, selectList);
                });

                select.addEventListener('blur', function (ev) {
                    deactivateSelect(select);
                });

                select.addEventListener('keyup', function (ev) {

                    let length = optionList.length;
                    let index = getIndex(select);

                    // DOWN ARROW
                    if (ev.keyCode === 40 && index < length - 1) index++;

                    // UP ARROW
                    if (ev.keyCode === 38 && index > 0) index--;

                    updateValue(select, index);

                    // ENTER
                    if (ev.keyCode === 13) {
                        toggleOptionList(select);
                    }

                    // ESQ
                    if (ev.keyCode === 27) {
                        deactivateSelect(select);
                    }
                });
            }
        });
    }
});

// Functions

function deactivateSelect (select) {
    if (!select) return;

    if (!select.classList.contains('active')) return;

    let optionList = select.querySelector('.option-list');
    if (optionList.length !== 0) {
        optionList.classList.add('hidden');
        optionList.classList.remove('active');    
    }
}

function activeSelect (select, selectList) {
    if (!select) return;

    if (select.classList.contains('active')) return;

    if (selectList.length !== 0) {
        selectList.forEach(deactivateSelect);
    }
    
    select.classList.add('active');
}

function toggleOptionList (select) {
    if (!select) return;

    let optionList = select.querySelector('.option-list');
    if (optionList.length !== 0) {
        optionList.classList.toggle('hidden');
    }
}

function highlightOption(select, option) {
    if (!select || !option) return;

    let optionList = select.querySelectorAll('.option');

    if (optionList.length !== 0) {
        optionList.forEach(function (item){
            item.classList.remove('highlight');
        });
    }

    option.classList.add('highlight');
}

function updateValue(select, index) {
    if (!select || !index) return;

    let nativeWidget = select.previousElementSibling;
    let value = select.querySelector('.value');
    let optionList = select.querySelectorAll('.option');

    if (optionList.length !== 0) {
        optionList.forEach(function (option) {
            option.setAttribute('aria-selected', 'false');
        });
    
        optionList[index].setAttribute('aria-selected', 'true');
    
        nativeWidget.selectedIndex = index;
        value.innerHTML = optionList[index].innerHTML;
        highlightOption(select, optionList[index]);
    }
}

function getIndex(select) {
    if (!select) return;

    let nativeWidget = select.previousElementSibling;
    return nativeWidget.selectedIndex;
}