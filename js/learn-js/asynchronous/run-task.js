

onmessage = function () {
    const start = performance.now();

    let myDate;
    for (let i = 0; i < 10000000; i++) {
        let date = new Date();
        myDate = date;
    }

    console.log('myDate', myDate);

    const end = performance.now();

    postMessage({ myDate, result: (end - start)});
}