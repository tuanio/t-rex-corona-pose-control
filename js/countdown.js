let hours = 0
let minutes = 5
let seconds = 0
let timeinterval = undefined

function getTimeRemaining(endtime) {
    const total = Date.parse(endtime) - Date.parse(new Date());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / (1000 * 60 * 60)) % 24);

    return {
        total,
        hours,
        minutes,
        seconds
    };
}

function initializeClock(id, endtime) {
    const clock = document.getElementById(id);
    const hoursSpan = clock.querySelector('.hours');
    const minutesSpan = clock.querySelector('.minutes');
    const secondsSpan = clock.querySelector('.seconds');

    function updateClock() {
        const t = getTimeRemaining(endtime);

        hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
        minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
        secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);

        if (t.total <= 0) {
            clearInterval(timeinterval);
        }
    }
    
    updateClock();
    timeinterval = setInterval(updateClock, 1000);
}


function startClock() {
    console.log("Start clock")
    let deadline = new Date(Date.parse(new Date()) + (3600 * hours + 60 * minutes + seconds) * 1000);
    initializeClock('clockdiv', deadline)

    // let accessToken = getAccessToken();
    // if (accessToken !== null) {
    //     let req = await fetch(`${backendUrl}/auth`, {
    //         method: 'GET',
    //         headers: {
    //             'Authorization': 'Bearer ' + accessToken
    //         }
    //     });
    // }

    
}

function stopClock() {
    console.log("Stop clock")
}

function resetClock() {
    console.log("Reset clock")
}