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
async function ring(state) {
  let run = await document.querySelector('img#state-run');
  let jump = await document.querySelector('img#state-jump');
  let dead = await document.querySelector('img#state-dead');

  // Chưa chơi
  if (state == 0) {
    jump.style.display = 'none';
    run.style.display = 'none';
    dead.style.display = 'none';
  }
  // Đang nhảy
  else if (state == 1) {
    jump.style.display = 'block';
    run.style.display = 'none';
  }
  // Đang chạy
  else if (state == 2) {
    jump.style.display = 'none';
    run.style.display = 'block';
  }
  // Đang chết
  else {
    jump.style.display = 'none';
    run.style.display = 'none';
    dead.style.display = 'block';
  }

}
ring(2);

function account_info() {
  alert('Hello !');
}

// async function account() {
//   let loc_account = await document.getElementByIdt('account');
//   if (loc_account.onclick == true) {
//     account_info();
//   }
// }