function random_font_for_class(target_class, interval_seconds, custom_font_list = null) {
  const default_fonts = [
    "Arial", "Verdana", "Helvetica", "Times New Roman",
    "Courier New", "Georgia", "Palatino", "Garamond",
    "Comic Sans MS", "Impact", "Lucida Sans", "Trebuchet MS"
  ];

  const font_list = custom_font_list && custom_font_list.length ? custom_font_list : default_fonts;
  const elements = document.getElementsByClassName(target_class);

  if (elements.length === 0) {
    console.warn(`No elements with class "${target_class}" found.`);
    return;
  }

  function change_font() {
    const rand_font = font_list[Math.floor(Math.random() * font_list.length)]

    for (let i = 0; i < elements.length; i++) {
      elements[i].style.fontFamily = rand_font;
    }

    console.log(`Changed fond to: ${rand_font}`);
  }

  change_font();
  const int_id = setInterval(change_font, interval_seconds * 1000);

  return function stop() {
    clearInterval(int_id);
    console.log("Font changing stopped");
  }
}

function random_font_for_id(target_id, interval_seconds, custom_font_list = null) {
  const default_fonts = [
    "Arial", "Verdana", "Helvetica", "Times New Roman",
    "Courier New", "Georgia", "Palatino", "Garamond",
    "Comic Sans MS", "Impact", "Lucida Sans", "Trebuchet MS"
  ];

  const font_list = custom_font_list && custom_font_list.length ? custom_font_list : default_fonts;
  const element = document.getElementById(target_id);

  if (!element) {
    console.warn(`Element with id "${target_id}" not found.`);
    return;
  }

  function change_font() {
    const rand_font = font_list[Math.floor(Math.random() * font_list.length)];
    element.style.fontFamily = rand_font;
    console.log(`Changed font to: ${rand_font}`);
  }

  change_font();

  const int_id = setInterval(change_font, interval_seconds * 1000);

  return function stop() {
    clearInterval(int_id);
    console.log("Stopped randomizing fonts");
  };
}

function gen_random_col() {
  const letters = "0123456789ABCDEF";
  let color = "#";

  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }

  return color;
}

function start_col_change(element_id, interval = 30) {
  const element = document.getElementById(element_id);

  if (!element) {
    console.error(`Element with ID "${element_id}" not found.`);
    return;
  }

  element.style.backgroundColor = gen_random_col();

  const color_interval = setInterval(() => {
    element.style.backgroundColor = gen_random_col();
  }, interval);

  return function stop() {
    clearInterval(color_interval);
  }
}

function rainbow_effect(img_id, speed = 10, intensity = 1) {
  const image = document.getElementById(img_id);

  if (!image) {
    console.error(`No image found with ID: ${img_id}`);
    return;
  }

  const orig_filter = image.style.filter || "";
  let hue = 0;

  const effect = setInterval(() => {
    hue = (hue + 1) % 360;
    image.style.filter = `hue-rotate(${hue * intensity}deg) saturate(1.2)`
  }, speed);

  return {
    stop: () => {
      clearInterval(effect);
      image.style.filter = orig_filter;
    }
  }
}

const fonts = [
  "Papyrus", "Comic Sans", "Brush Script MT", "Arial", "Arial Black", "Arial Narrow",
  "Arial Rounded MT Bold", "Avante Garde", "Calibri", "Candara", "Century Gothic",
  "Franklin Gothic Medium", "Futura", "Geneva", "Gill Sans", "Helvetica", "Impact",
  "Lucida Grande", "Optima", "Segoe UI", "Tahoma", "Trebuchet MS", "Verdana",
  "Big Caslon", "Bodoni MT", "Book Antiqua", "Calisto MT", "Cambria", "Didot",
  "Garamond", "Georgia", "Goudy Old Style", "Hoefler Text", "Lucida Bright", "Palatino",
  "Perpetua", "Rockwell", "Rockwell Extra Bold", "Baskerville", "Times New Roman",
  "Consolas", "Courier New", "Lucida Console", "Lucida Sans Typewriter", "Monaco",
  "Andale Mono", "Copperplate"
];

const classes = [
  "epic-tracks-player", "dance", "player-controls", "volume-control", "time-display"
];

const ids = [
  "dance-gif", "audio-player", "play-btn", "pause-btn", "stop-btn", "volume", "current-time", "duration"
];

for (const cls of classes) {
  random_font_for_class(cls, 0.3, fonts);
}

for (const id of ids) {
  random_font_for_id(id, 0.3, fonts);
  start_col_change(id, 300);
}

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
    rainbow_effect("dance-gif", 5, 3);
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
    const curr_secs = Math.floor(player.currentTime % 60).toString().padStart(2, "0");
    curr_time_disp.textContent = `${curr_mins}:${curr_secs}`;

    if (!isNaN(player.duration)) {
      const dur_mins = Math.floor(player.duration / 60);
      const dur_secs = Math.floor(player.duration % 60).toString().padStart(2, "0");

      dur_disp.textContent = `${dur_mins}:${dur_secs}`;
    }
  });

  player.addEventListener("ended", () => {
    danceline.src = "assets/brocollie.png";
  });

  player.volume = volume_ctrl.value;
});
