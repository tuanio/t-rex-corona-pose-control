checkAuthorization();   

async function checkPassword(requestJson) {
    let url = `${backendUrl}/login`;
    let req = await fetch(url, {
        method: "POST",
        credentials: "include",
        body: JSON.stringify(requestJson),
        cache: "no-cache",
    });
    let res = await req.json();
    alert(res['msg']);
    if (res['code'] === 1) {
        localStorage.setItem('Authorization', res['data']['access_token']);
        localStorage.setItem('username', requestJson['username']);
        window.location.href = `${frontendUrl}/index.html`;
    }
}

(async () => {
    let submitLogin = await document.querySelector("button#submit-login");
    submitLogin.addEventListener("click", (e) => {
        e.preventDefault();
    
        let username = document.querySelector("#username").value;
        let password = document.querySelector("#password").value;
    
        requestJson = {
            username: username,
            password: password
        }
        checkPassword(requestJson);
    });
})();
