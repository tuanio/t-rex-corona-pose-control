// set course value 
(async () => {
    function li_template(val) {
        let li = document.createElement("LI");
        let a = document.createElement("A");
        a.classList.add("dropdown-item");
        a.classList.add("course-a");
        a.setAttribute("href", "javascript:void(0);");
        let text = document.createTextNode(val);
        a.appendChild(text);
        li.appendChild(a);
        li.addEventListener("click", () => {
            let textToggle = document.querySelector("#inputToggle");
            textToggle.value = val;
        });
        return li;
    }

    let ul = await document.querySelector("ul#course-dropdown");
    let listVal = ["K17", "K16", "K15", "K14", "K13", "Khác"];
    listVal.map((el) => {
        ul.appendChild(li_template(el));
    });
})();

function checkRePassword() {
    let password = document.querySelector("#password").value;
    let repassword = document.querySelector("#re-password").value;
    if (password != repassword) {
        $("#re-password").tooltip("show");
        return false;
    } else {
        $("#re-password").tooltip("hide");
        return true;
    }
    return true;
}

function checkUsernameSize() {
    let username = document.querySelector("#username").value;
    if (username.length >= 30) {
        $("#username").tooltip("show");
    } else {
        $("#username").tooltip("hide");
    }
    return true;
}

(async () => {

    let submitRegister = await document.querySelector("#submit-register");
    submitRegister.addEventListener("click", async () => {
        let username = await document.querySelector("#username").value;
        let password = await document.querySelector("#password").value;
        
        let genderGirl = await document.querySelector("#gender-girl");
        let current = await document.querySelector(".active");
        let gender = false ^ (genderGirl == current);
        // true is girl, false is boy
        let course = await document.querySelector("#inputToggle").value;
        
        let requestJson = {
            username,
            password,
            gender,
            course
        };

        let req = await fetch(backendUrl + '/register', {
            method: "POST",
            credentials: "include",
            body: JSON.stringify(requestJson),
            cache: "no-cache",
        });
        let res = await req.json();
        alert(res['msg'])
        if (res['code'] === 1) {
            window.location.href = frontendUrl + '/login.html'
        }
    });
})();