
(function () {
    const progressBar = document.getElementById('progressBar');
    const meter = document.getElementById('meter');
    const buttonResetProgress = document.getElementById('buttonResetProgress');
    const buttonResetMeter = document.getElementById('buttonResetMeter');
    const buttonSimulateProgress = document.getElementById('buttonSimulateProgress');
    const buttonSimulateMeter = document.getElementById('buttonSimulateMeter');
    const myOutput = document.getElementById('myOutput');
    const otherOutput = document.getElementById('otherOutput');

    myOutput.innerHTML = `${progressBar.value} | ${progressBar.max}`;
    otherOutput.innerHTML = `Min: ${meter.min} | Low: ${meter.low} | High: ${meter.high} | Optimum: ${meter.optimum} | Value: ${meter.value} | Max: ${meter.max}`;

    buttonResetProgress.addEventListener('click', () => {
        progressBar.value = 0;
        myOutput.innerHTML = `${progressBar.value} | ${progressBar.max}`;
    })

    buttonResetMeter.addEventListener('click', () => {
        meter.value = 0;
        otherOutput.innerHTML = `Min: ${meter.min} | Low: ${meter.low} | High: ${meter.high} | Optimum: ${meter.optimum} | Value: ${meter.value} | Max: ${meter.max}`;
    })

    buttonSimulateProgress.addEventListener('click', simulateProgress);
    buttonSimulateMeter.addEventListener('click', simulateMeter);

    function simulateProgress() {
        buttonResetProgress.disabled = buttonSimulateProgress.disabled = true;
        progressBar.value = 0;

        const timer = setInterval(() => {
            progressBar.value += 1;
            myOutput.innerHTML = `${progressBar.value} | ${progressBar.max}`;

            if (progressBar.value == progressBar.max) {
                buttonResetProgress.disabled = buttonSimulateProgress.disabled = false;
                clearInterval(timer);
            }

        }, 100);
    }

    function simulateMeter() {
        buttonResetMeter.disabled = buttonSimulateMeter.disabled = true;
        meter.value = 0;

        const timer = setInterval(() => {
            meter.value += 1;
            otherOutput.innerHTML = `Min: ${meter.min} | Low: ${meter.low} | High: ${meter.high} | Optimum: ${meter.optimum} | Value: ${meter.value} | Max: ${meter.max}`;

            if (meter.value == meter.max) {
                buttonResetMeter.disabled = buttonSimulateMeter.disabled = false;
                clearInterval(timer);
            }

        }, 50);
    }

})();