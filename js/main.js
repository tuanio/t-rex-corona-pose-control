let btnPlay = document.querySelector("button#btn-play");
btnPlay.addEventListener("click", () => {
  btnPlay.innerText = "Nguyen Van Anh Tuan is playing ...";
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