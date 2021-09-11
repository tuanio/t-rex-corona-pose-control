let btnPlay = document.querySelector("button#btn-play");
btnPlay.addEventListener("click", () => {
  btnPlay.innerText = "Nguyen Van Anh Tuan is playing ...";
  btnPlay.disabled = true;
});