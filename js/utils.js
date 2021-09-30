// var frontendUrl = 'http://127.0.0.1:5501';
var frontendUrl = 'https://corona-runner.vercel.app'
// var backendUrl = 'http://127.0.0.1:5000';
var backendUrl = 'https://backend-runner.herokuapp.com';
var loginUrl = frontendUrl + '/login.html';

function getAccessToken() {
    return localStorage.getItem('Authorization');
}

function getAsdf() {
    return localStorage.getItem('asdf');
}

async function checkAuthorization() {
    // tạm thời return true để không check đăng nhập
    // return true;
    //
    let accessToken = getAccessToken();
    if (accessToken !== null) {
        let req = await fetch(`${backendUrl}/auth?kkk=` + getAsdf(), {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + accessToken
            }
        });
        let res = await req.json();
        if (res['code'] === 1) {
            localStorage.setItem('asdf', res['data']['asdf']);
        }
        if (res['data']['user_disabled'] == true) {
            if (localStorage.getItem('is_super') == 'true') {
                localStorage.setItem('userDisabled', false);
            } else {
                localStorage.setItem('userDisabled', true)
            }
        } else {
            localStorage.setItem('userDisabled', false);
        }
        if (res['msg'] == "Missing Authorization Header") {
            if (window.location.href !== loginUrl) {
                alert('4');
                window.location.href = loginUrl;
            }
            return false;
        } else if (res['msg'] === 'Tài khoản hiện tại') {
            if (window.location.href !== frontendUrl + '/') {
                alert('5');
                window.location.href = frontendUrl;
            }
            return true;
        }
    } else {
        if (window.location.href !== loginUrl) {
            window.location.href = loginUrl;
            alert('6');
            return false;
        }
    } 
    return true;
}

if (window.location.href == frontendUrl + '/index.html' || window.location.href == frontendUrl + '/' || window.location.href == loginUrl) {
    alert(window.location.href);
    setInterval(checkAuthorization, 3000);
}
document.onkeydown = function (evt) {
    if (evt.keyCode === 123) return false;

    if (evt.ctrlKey && evt.keyCode == 'U'.charCodeAt(0)) return false;
    if (evt.ctrlKey && evt.shiftKey && evt.keyCode == 'I'.charCodeAt(0)) return false;
    if (evt.ctrlKey && evt.shiftKey && evt.keyCode == 'J'.charCodeAt(0)) return false;
    if (evt.ctrlKey && evt.shiftKey && evt.keyCode == 'C'.charCodeAt(0)) return false;
    if (evt.ctrlKey && evt.shiftKey && evt.keyCode == 'E'.charCodeAt(0)) return false;
    if (evt.ctrlKey && evt.shiftKey && evt.keyCode == 'K'.charCodeAt(0)) return false;
    if (evt.ctrlKey && evt.shiftKey && evt.keyCode == 'M'.charCodeAt(0)) return false;
    if (evt.ctrlKey && evt.shiftKey && evt.keyCode == 'Z'.charCodeAt(0)) return false;

    if (evt.shiftKey && evt.keyCode === 115) return false;
    if (evt.shiftKey && evt.keyCode === 116) return false;
    if (evt.shiftKey && evt.keyCode === 117) return false;
    if (evt.shiftKey && evt.keyCode === 118) return false;
    if (evt.shiftKey && evt.keyCode === 119) return false;
    if (evt.shiftKey && evt.keyCode === 120) return false;
};