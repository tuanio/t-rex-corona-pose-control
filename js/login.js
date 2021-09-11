let submitLogin = document.querySelector("button#submit-login");

function checkPassword(requestJson) {
    let url = `${backendUrl}/login`;
    fetch(url, {
        method: "POST",
        credentials: "include",
        body: JSON.stringify(requestJson),
        cache: "no-cache",
    })
        .then(res => res.json())
        .then((res) => {
            console.log(res);
        })
        .catch((error) => {
            console.log("error: ", error);
        });
}

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