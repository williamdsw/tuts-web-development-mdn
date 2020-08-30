
const game = {
    name: "Devil May Cry 3: Dante's Awakening",
    release: 2005,
    genre: `Hack and Slash`,
    developer: {
        name: 'Capcom',
        country: 'Japan'
    },
    platforms: [
        'PlayStation 2', 'Microsoft Windows', 'PlayStation 3', 
        'Xbox 360', 'PlayStation 4', 'Xbox One', 'Nintendo Switch' 
    ]
};

const bands = [
    { name: 'Black Sabbath', genre: 'Heavy Metal' },
    { name: 'Helloween', genre: 'Power Metal' },
    { name: 'Venom', genre: 'Black Metal' },
    { name: 'AC/DC', genre: 'Hard Rock' },
    { name: 'Sex Pistols', genre: 'Punk Rock' },
];


window.addEventListener('DOMContentLoaded', () => {
    const inputText = document.querySelector('#inputText');
    const buttonLog = document.querySelector('#buttonLog');
    const buttonInfo = document.querySelector('#buttonInfo');
    const buttonWarn = document.querySelector('#buttonWarn');
    const buttonError = document.querySelector('#buttonError');
    const buttonStylish = document.querySelector('#buttonStylish');
    const buttonGroup = document.querySelector('#buttonGroup');
    const buttonTimer = document.querySelector('#buttonTimer');
    const buttonTrace = document.querySelector('#buttonTrace');
    const buttonClear = document.querySelector('#buttonClear');
    const buttonDir = document.querySelector('#buttonDir');
    const buttonDirXml = document.querySelector('#buttonDirXml');
    const buttonProfile = document.querySelector('#buttonProfile');
    const buttonTable = document.querySelector('#buttonTable');

    const message = 'This is %cMy stilish message!';
    const styles = 'color: yellow; font-style: italic; background-color: blue; padding: 2px';

    buttonLog.addEventListener('click', () => console.log(inputText.value));
    buttonInfo.addEventListener('click', () => console.info(inputText.value));
    buttonWarn.addEventListener('click', () => console.warn(inputText.value));
    buttonError.addEventListener('click', () => console.error(inputText.value));
    buttonStylish.addEventListener('click', () => console.log(message, styles));
    buttonGroup.addEventListener('click', printGroup);
    buttonTimer.addEventListener('click', printTimer);
    buttonTrace.addEventListener('click', printTrace);
    buttonClear.addEventListener('click', () => console.clear());
    buttonDir.addEventListener('click', () => console.dir(game));
    buttonDirXml.addEventListener('click', () => console.dirxml(game));
    buttonTable.addEventListener('click', () => console.table(bands));

    if ('profile' in console) {
        buttonProfile.addEventListener('click', () => {
            console.profile('Profile');

            setTimeout(() => {
                console.profileEnd('Profile');
            }, 5000);
        });
    }
    else {
        buttonProfile.style.display = 'none';
    }
    
});

function printGroup() {
    console.group('First Group!');
    console.log('A');
    console.log('B');
    console.log('C');
    console.groupEnd();
    console.group('Second Group!');
    console.log('D');
    console.groupEnd();
}

function printTimer() {
    console.time('answer time');
    alert('Click to continue');
    console.timeLog('answer time');
    alert('Do a bunch of other stuff...');
    console.timeStamp('answer time');
    alert('other stuff...');
    console.timeEnd('answer time');
}

function printTrace() {
    function bar() {
        console.trace();
    }

    bar();
}