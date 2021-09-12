var frontendUrl = 'http://127.0.0.1:5500';
var backendUrl = 'http://127.0.0.1:5000';
var loginUrl = frontendUrl + '/login.html';

function getAccessToken() {
    return localStorage.getItem('Authorization');
}

async function checkAuthorization() {
    let req = await fetch(`${backendUrl}/auth`, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + getAccessToken()
        }
    });
    let res = await req.json();
    if (res['msg'] == "Missing Authorization Header") {
        if (window.location.href !== loginUrl) {
            window.location.href = loginUrl;
        }
        return false;
    }
    if (res['msg'] !== 'Tài khoản hiện tại') {
        return false;
    } 
    if (window.location.href !== frontendUrl) {
        window.location.href = frontendUrl;
    }
    return true;
}