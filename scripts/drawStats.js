function recordStorage() {
    const recordTime = localStorage.getItem('record_time');
    const playerTime = timeFormatter(Date.now() - timeStart);

    if(recordTime && recordTime >= playerTime) {
        pResult.innerHTML = 'Superaste el record!';
    } else {
        pResult.innerHTML = 'No superaste el record';
    }

    if(!recordTime) {
        pResult.innerHTML = ('Este es tu primer record');
    }

    localStorage.setItem('record_time', playerTime);

    
}

function showLives() {
    const heartsArray = Array(lives).fill(emojis['HEART']); // [1,2,3]

    /* Clearing the span element. */
    spanLives.innerHTML = "";

    /* Adding the hearts to the span element. */
    heartsArray.forEach(heart => {
        spanLives.append(heart);
    });
}

function showTime() {
    const milliInterval = Date.now() - timeStart;
    spanTime.innerHTML = timeFormatter(milliInterval);
}

function timeFormatter(millisecondsInterval) {
    const msToSec = (millisecondsInterval) / 1000;
    
    const milliseconds = (String(msToSec - Math.floor(msToSec)).split('.')[1]).substring(0,2);
    let seconds = Math.floor(millisecondsInterval / 1000);
    let minutes = Math.floor(seconds / 60);

    seconds = (seconds % 60) < 10 ? `0${seconds % 60}` : seconds % 60;
    minutes = (minutes % 60) < 10 ? `0${minutes % 60}` : minutes % 60;

    return `${minutes}:${seconds}:${milliseconds}`;
}

function showRecord() {
    const record = localStorage.getItem('record_time')
    if(record === null) {
        spanRecord.innerHTML = 'Aun no hay un record'
    } else {
        spanRecord.innerHTML = record;
    }
    
}