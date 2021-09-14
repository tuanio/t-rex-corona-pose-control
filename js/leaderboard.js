(async () => {
    let adminBoard = await document.querySelector("div.countdown");
    if (localStorage.getItem('is_super') != 'true') {
        adminBoard.style.display = 'none';
    }
})();

let timeReq = 1000


function changeIn4(data, div) {
    div.querySelector('img').setAttribute('src', data['gender'] ? './assets/girl.png' : './assets/boy.png')
    div.querySelector('p.link').innerHTML = '@' + data['username']
    div.querySelector('p.points').innerHTML = data['score'].toString()
    return div
}

async function getLeaderboard() {
    let req = await fetch(`${backendUrl}/get-leaderboard`)
    let res = await req.json()

    let data = res['data']['data']

    if (data[0] != null) {
        let div = document.querySelector('div.person.first')
        div = changeIn4(data[0], div)
    }

    if (data[1] !=null) {
        let div = document.querySelector('div.person.second')
        div = changeIn4(data[1], div)
    }

    if (data[2] != null) {
        let div = document.querySelector('div.person.third')
        div = changeIn4(data[2], div)
    }

    if (data[3] != null) {
        let div = document.querySelector('div.info.flex4')
        div = changeIn4(data[3], div)
    }

    if (data[4] != null) {
        let div = document.querySelector('div.info.flex5')
        div = changeIn4(data[4], div)
    }

    if (data[5] != null) {
        let div = document.querySelector('div.info.flex6')
        div = changeIn4(data[5], div)
    }

    if (data[6] != null) {
        let div = document.querySelector('div.info.flex7')
        div = changeIn4(data[6], div)
    }

    if (data[7] != null) {
        let div = document.querySelector('div.info.flex8')
        div = changeIn4(data[7], div)
    }

    if (data[8] != null) {
        let div = document.querySelector('div.info.flex9')
        div = changeIn4(data[8], div)
    }

    if (data[9] != null) {
        let div = document.querySelector('div.info.flex10')
        div = changeIn4(data[9], div)
    }
}

setInterval(getLeaderboard, timeReq)

