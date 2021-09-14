var frontendUrl = 'http://127.0.0.1:5501';
// var backendUrl = 'http://127.0.0.1:5000';
var backendUrl = 'https://backend-runner.herokuapp.com';
var loginUrl = frontendUrl + '/login.html';

function getAccessToken() {
    return localStorage.getItem('Authorization');
}

async function checkAuthorization() {
    // tạm thời return true để không check đăng nhập
    // return true;
    //
    let accessToken = getAccessToken();
    if (accessToken !== null) {
        let req = await fetch(`${backendUrl}/auth`, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + accessToken
            }
        });
        let res = await req.json();
        if (res['msg'] == "Missing Authorization Header") {
            if (window.location.href !== loginUrl) {
                window.location.href = loginUrl;
            }
            return false;
        } else if (res['msg'] === 'Tài khoản hiện tại') {
            if (window.location.href !== frontendUrl + '/') {
                window.location.href = frontendUrl;
            }
            return true;
        }
    } else {
        if (window.location.href !== loginUrl) {
            window.location.href = loginUrl;
            return false;
        }
    } 
    return true;
}