
window.addEventListener('DOMContentLoaded', () => {

    // Fields

    let backwardInterval = null;
    let forwardInterval = null;

    // Element refs
    const player = document.querySelector('.player');
    const video = document.querySelector('video');
    const controls = document.querySelector('.controls');

    const playButton = document.querySelector('.play');
    const stopButton = document.querySelector('.stop');
    const muteButton = document.querySelector('.mute');
    const backwardButton = document.querySelector('.backward');
    const forwardButton = document.querySelector('.forward');
    const fullScreenButton = document.querySelector('.fullscreen');

    const timerWrapper = document.querySelector('.timer');
    const timerCurrent = document.querySelector('.timer span.current');
    const timerDuration = document.querySelector('.timer span.duration');
    const timerBar = document.querySelector('.timer div');

    if (player && video && controls) {
        if (playButton && stopButton && muteButton && backwardButton && forwardButton && fullScreenButton) {
            if (timerWrapper && timerCurrent && timerDuration && timerBar) {

                video.removeAttribute('controls');
                controls.style.visibility = 'visible';
                timerDuration.textContent = getFormattedTime(video.duration);

                console.log('video', video);

                // Event Listeners
                playButton.addEventListener('click', playOrPause);
                stopButton.addEventListener('click', stop);
                muteButton.addEventListener('click', toggleMute);
                backwardButton.addEventListener('click', backward);
                forwardButton.addEventListener('click', forward);
                fullScreenButton.addEventListener('click', toggleFullScreen);

                video.addEventListener('ended', stop);
                video.addEventListener('timeupdate', updateTime);

                // Inner functions 

                function playOrPause() {
                    clearIntervals();

                    if (video.paused) {
                        timerDuration.textContent = getFormattedTime(video.duration);
                        playButton.setAttribute('data-icon', 'u');
                        playButton.setAttribute('title', 'pause');
                        video.play();
                    }
                    else {
                        playButton.setAttribute('data-icon', 'P');
                        playButton.setAttribute('title', 'play');
                        video.pause();
                    }
                }

                function stop() {
                    video.pause();
                    video.currentTime = 0;
                    playButton.setAttribute('data-icon', 'P');
                    clearIntervals();
                }

                function backward() {
                    clearInterval(forwardInterval);
                    forwardButton.classList.remove('active');

                    if (backwardButton.classList.contains('active')) {
                        backwardButton.classList.remove('active');
                        clearInterval(backwardInterval);
                        video.play();
                    }
                    else {
                        backwardButton.classList.add('active');
                        video.pause();
                        backwardInterval = setInterval(() => {
                            if (video.currentTime <= 3) {
                                stop();
                            }
                            else {
                                video.currentTime -= 3;
                            }
                        }, 200);
                    }
                }

                function forward() {
                    clearInterval(backwardInterval);
                    backwardButton.classList.remove('active');

                    if (forwardButton.classList.contains('active')) {
                        forwardButton.classList.remove('active');
                        clearInterval(forwardInterval);
                        video.play();
                    }
                    else {
                        forwardButton.classList.add('active');
                        video.pause();
                        forwardInterval = setInterval(() => {
                            if (video.currentTime >= (video.duration - 3)) {
                                stop();
                            }
                            else {
                                video.currentTime += 3;
                            }
                        }, 200);
                    }
                }

                function getFormattedTime(time) {
                    time = (time && !isNaN (time) ? time : 0);

                    const hours = Math.floor(time / 3600);
                    const minutes = Math.floor(time / 60);
                    const seconds = Math.floor(time - minutes * 60);

                    const formattedHours = (minutes < 10 ? '0' + hours : hours);
                    const formattedMinutes = (minutes < 10 ? '0' + minutes : minutes);
                    const formattedSeconds = (seconds < 10 ? '0' + seconds : seconds);

                    if (hours >= 1) {
                        return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
                    }

                    return `${formattedMinutes}:${formattedSeconds}`;
                }

                function updateTime() {

                    // minutes : seconds indicator
                    timerCurrent.textContent = getFormattedTime(video.currentTime);

                    // progress bar
                    const barLength = timerWrapper.clientWidth * (video.currentTime / video.duration);
                    timerBar.style.width = `${barLength}px`;
                }

                function clearIntervals () {
                    backwardButton.classList.remove('active');
                    forwardButton.classList.remove('active');
                    clearInterval(backwardInterval);
                    clearInterval(forwardInterval);
                }

                function toggleFullScreen() {
                    if (document.fullscreenEnabled) {
                        if (!document.fullscreenElement) {
                            player.requestFullscreen();
                            video.style.width = video.style.height = '100%';
                        }
                        else {
                            if (document.exitFullscreen) {
                                document.exitFullscreen();
                            }
                        }
                    }
                    else {
                        alert(`You browser doesn't support Fullscreen or isn't enabled!`);
                    }
                }

                function toggleMute() {
                    video.muted = !video.muted;
                    muteButton.setAttribute('title', video.muted ? 'unmute' : 'mute');
                }
            }
        }
    }
});