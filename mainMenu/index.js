const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
const backMusic = document.getElementById("backgroundMusic");
backMusic.play();//begin playback of the media file
const toggleMusicButton = document.getElementById("button1");
toggleMusicButton.addEventListener("click", () => {
  backMusic.paused ? backMusic.play() : backMusic.pause();
});

canvas.width = 1024;
canvas.height = 576;