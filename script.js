document.addEventListener("DOMContentLoaded", function() {
  const player = document.getElementById("audio-player");
  const play_btn = document.getElementById("play-btn");
  const pause_btn = document.getElementById("pause-btn");
  const stop_btn = document.getElementById("stop-btn");
  const volume_ctrl = document.getElementById("volume");
  const curr_time_disp = document.getElementById("current-time");
  const dur_disp = document.getElementById("duration");
  const danceline = document.getElementById("dance-gif");

  play_btn.addEventListener("click", () => {
    player.play();
    danceline.style.display = "block";
    danceline.src = "assets/epicsauce.gif";
  });

  pause_btn.addEventListener("click", () => {
    player.pause();
    danceline.src = "assets/brocollie.png";
  });

  stop_btn.addEventListener("click", () => {
    player.pause();
    player.currentTime = 0;
    danceline.src = "assets/brocollie.png";
    danceline.style.display = "block";
  });

  volume_ctrl.addEventListener("input", () => {
    player.volume = volume_ctrl.value;
  });

  player.addEventListener("timeupdate", () => {
    const curr_mins = Math.floor(player.currentTime / 60);
    const curr_secs = Math.floor(player.currentTime % 60).toString().padStart(2, '0');
    curr_time_disp.textContent = `${curr_mins}:${curr_secs}`;

    if (!isNaN(player.duration)) {
      const dur_mins = Math.floor(player.duration / 60);
      const dur_secs = Math.floor(player.duration % 60).toString().padStart(2, '0');

      dur_disp.textContent = `${dur_mins}:${dur_secs}`;
    }
  });

  player.addEventListener("ended", () => {
    danceline.src = "assets/brocollie.png";
  });

  player.volume = volume_ctrl.value;
});
