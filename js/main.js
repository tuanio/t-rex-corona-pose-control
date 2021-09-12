checkAuthorization();

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

async function ring(state) {
  let run = await document.querySelector('img#state-run');
  let jump = await document.querySelector('img#state-jump');

  if (state == 1) {
    jump.style.display = 'block';
    run.style.display = 'none';
  }
  else {
    jump.style.display = 'none';
    run.style.display = 'block';
  }
}

ring(0);