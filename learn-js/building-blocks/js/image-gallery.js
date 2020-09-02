
const baseImageUrl = '../../../assets/images/gallery/'
const imagesUrls = [ 'pic1.jpg', 'pic2.jpg', 'pic3.jpg', 'pic4.jpg', 'pic5.jpg' ];

window.addEventListener('DOMContentLoaded', () => {
    const thumbnailBar = document.querySelector('.thumbnail-bar');
    const displayedImage = document.querySelector('.displayed-image');
    const buttonDarken = document.querySelector('button.dark');
    const overlay = document.querySelector('#overlay');

    for (const url of imagesUrls) {
        const img = document.createElement('img');
        img.src = baseImageUrl + url;
        img.alt = url;
        img.title = url;

        img.addEventListener('click', () => {
            displayedImage.src = img.src;
            displayedImage.alt = img.alt;
            displayedImage.title = img.title;
        });

        thumbnailBar.appendChild(img);
    }

    buttonDarken.addEventListener('click', function () {
        overlay.classList.toggle('overlay');
    });
});