
window.addEventListener('DOMContentLoaded', () => {

    // Checks multibrowsers
    document.fullscreenElement = document.fullscreenElement || document.mozFullScreenElement || document.msFullscreenElement || document.webkitFullscreenElement;

    const video = document.querySelector('video');

    document.addEventListener('keypress', (ev) => {
        if (ev.keyCode === 13) {
            toggleFullScreen(document.documentElement);
        }
        else if (ev.keyCode === 112) {
            toggleFullScreen(video);
        }

    }, false);
});

function toggleFullScreen(element) {
    if (!document.fullscreenElement) {
        element.requestFullscreen();

        if (element.tagName && element.tagName === 'VIDEO') {
            if (element.paused) {
                element.play();
            }
        }
    }
    else {
        if (document.exitFullscreen) {
            document.exitFullscreen();

            if (element.tagName && element.tagName === 'VIDEO') {
                element.pause();
            }
        }
    }
}