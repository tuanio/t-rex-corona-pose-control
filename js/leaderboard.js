let timeReq = 1000

async function changeIn4(data, div) {
    div.querySelector('img').setAttribute('src', data['gender'] ? './assets/girl.png' : './assets/boy.png')
    div.querySelector('p.link').innerHTML = '@' + data['username']
    div.querySelector('p.points').innerHTML = data['score'].toString()

    return div
}

async function getLeaderboard() {
    let req = await fetch(`${backendUrl}/get-leaderboard`)
    let res = await req.json()

    let data = res['data']['data']
    console.log(data)

    if (data.length >= 1) {
        let div = document.querySelector('div.person.first')
        div = changeIn4(data[0], div)
    }

    if (data.length >= 2) {
        let div = document.querySelector('div.person.second')
        div = changeIn4(data[1], div)
    }

    if (data.length >= 3) {
        let div = document.querySelector('div.person.second')
        div = changeIn4(data[2], div)
    }

    // if (data.length >= 4) {
    //     for (let i = 3; i < data.length; i++) {
    //         let infoFlex = await document.querySelector('div.info.flex' + i.toString())
    //         infoFlex[i] = changeIn4(data[i], infoFlex)
    //     }
    // }
}

document.addEventListener("DOMContentLoaded", function() {
    setInterval(getLeaderboard, timeReq)
});