checkAuthorization();
var count = 0;

let updateHighScore = async () => {
  let val = await document.querySelector("#highest-score");
  let req = await fetch(`${backendUrl}/get-highscore`, {
    method: 'GET',
    headers: {
      'Authorization': "Bearer " + getAccessToken(),
      'Access-Control-Allow-Origin': backendUrl,
      'credentials': 'include',
      'cache': 'no-cache'
    }
  });
  let res = await req.json();
  val.innerHTML = await res['data']['score'];
};

updateHighScore();

let btnPlay = document.querySelector("button#btn-play");
btnPlay.addEventListener("click", () => {
  btnPlay.innerText = localStorage.getItem('username') + " is playing ...";
  btnPlay.disabled = true;
});

// Hiệu ứng đám mây
async function ring(state = 0) {
  let run = await document.querySelector('img#state-run');
  let jump = await document.querySelector('img#state-jump');
  let dead = await document.querySelector('img#state-dead');
  let brain = await document.querySelector('img#brain');

  // Chưa chơi
  if (state == 0) {
    jump.style.display = 'none';
    run.style.display = 'none';
    dead.style.display = 'none';
  }
  // Đang nhảy
  else if (state == 1) {
    jump.style.display = 'block';
    jump.style.animation = 'shake-up 0.5s infinite';
    run.style.display = 'none';
    dead.style.display = 'none';
  }
  // Đang chạy
  else if (state == 2) {
    jump.style.display = 'none';
    run.style.display = 'block';
    run.style.animation = 'shake-near 0.5s infinite';
    dead.style.display = 'none';
  }
  // Đang chết
  else {
    jump.style.display = 'none';
    run.style.display = 'none';
    dead.style.display = 'block';
  }

}

ring(0);

(async () => {
  let account_btn = document.querySelector('#account-img');
  let account_info = document.querySelector('#form-box');
  if (account_btn) {
    account_btn.addEventListener("click", () => {
      if (count % 2 == 0) {
        account_info.style.display = 'block';
      } else {
        account_info.style.display = 'none';
      }
      count += 1;
    });
  }
})();

setInterval(() => { // chặn nút chơi của người dùng
  let btnPlay = document.querySelector("button#btn-play");
  if (localStorage.getItem('userDisabled') == 'true') {
    btnPlay.disabled = true;
  } else {
    btnPlay.disabled = false;
  }
}, 500)

// async function account() {
//   let loc_account = await document.getElementByIdt('account');
//   if (loc_account.onclick == true) {
//     account_info();
//   }
// }