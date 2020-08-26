
const NUMBER_OF_ITERATIONS = 10000000;

window.addEventListener('DOMContentLoaded', function () {
    const buttonRunTask = document.querySelector('#buttonRunTask');
    const buttonRunTaskAsync = document.querySelector('#buttonRunTaskAsync');
    const worker = new Worker('../../../js/learn-js/asynchronous/run-task.js');

    worker.onmessage = function(ev) {
        console.log('worker.onmessage = ', ev.data);
        
        let p = document.createElement('p');
        p.textContent = `Created after ${ev.data.result} ms of click!`;
        document.body.appendChild(p);
    }

    buttonRunTask.addEventListener('click', runTask);
    buttonRunTaskAsync.addEventListener('click', () => {
        worker.postMessage('Go!');

        let p = document.createElement('p');
        p.textContent = `Created on click!`;
        document.body.appendChild(p);
    });
});

function runTask() {

    const start = performance.now();

    let myDate;
    for (let i = 0; i < NUMBER_OF_ITERATIONS; i++) {
        let date = new Date();
        myDate = date;
    }

    console.log('myDate', myDate);

    const end = performance.now();

    let p = document.createElement('p');
    p.textContent = `This is a newly-added paragraph after ${(end - start).toFixed(1)} ms`;
    document.body.appendChild(p);
}