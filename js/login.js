async function checkPassword(requestJson) {
    let url = `${backendUrl}/login`;
    let req = await fetch(url, {
        method: "POST",
        body: JSON.stringify(requestJson),
        cache: "no-cache",
    });
    let res = await req.json();
    alert(res['msg']);
    if (res['code'] === 1) {
        localStorage.setItem('Authorization', res['data']['access_token']);
        localStorage.setItem('username', requestJson['username']);
        localStorage.setItem('is_super', res['data']['is_super']);
        localStorage.setItem('userDisabled', false); // mặc định sẽ không chặn
        window.location.href = `${frontendUrl}/index.html`;
    }
}

(async () => {
    let submitLogin = await document.querySelector("button#submit-login");
    submitLogin.addEventListener("click", (e) => {
    
        let username = document.querySelector("#username").value;
        let password = document.querySelector("#password").value;
    
        requestJson = {
            username: username,
            password: password
        }
        checkPassword(requestJson);
    });
})();

// redirect to 
(async () => {
    let redirectRegisterBtn = await document.querySelector("#redirect-register-btn");
    redirectRegisterBtn.addEventListener("click", () => {
        window.location.href = frontendUrl + "/register.html";
    });
})();
