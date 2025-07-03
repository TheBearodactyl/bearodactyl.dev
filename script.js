const DEFAULT_FONTS = [
  "Arial", "Verdana", "Helvetica", "Times New Roman",
  "Courier New", "Georgia", "Palatino", "Garamond",
  "Comic Sans MS", "Impact", "Lucida Sans", "Trebuchet MS"
];

const EXTENDED_FONTS = [
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

const SONGS = [
  "assets/epic_bg_music.flac",
  "assets/epic_bg_music_1.flac",
  "assets/songs/epic_music006.mp3",
  "assets/songs/epic_music012.mp3",
  "assets/songs/epic_music016.mp3",
  "assets/songs/epic_music017.mp3",
  "assets/songs/epic_music022.mp3",
  "assets/songs/epic_music027.mp3",
  "assets/songs/epic_music030.mp3",
  "assets/songs/epic_music031.mp3",
  "assets/songs/epic_music033.mp3",
  "assets/songs/epic_music038.mp3",
  "assets/songs/epic_music040.mp3",
  "assets/songs/epic_music041.mp3",
  "assets/songs/epic_music043.mp3",
  "assets/songs/epic_music045.mp3",
  "assets/songs/epic_music060.mp3",
  "assets/songs/epic_music061.mp3",
  "assets/songs/epic_music066.mp3",
];

class DomEffects {
  static random_font_for_class(target_class, interval_seconds, custom_font_list = null) {
    const font_list = custom_font_list?.length ? custom_font_list : DEFAULT_FONTS;
    const elements = document.getElementsByClassName(target_class);

    if (elements.length === 0) {
      console.warn(`No elements with class "${target_class}" found.`);
      return { stop: () => { } };
    }

    const change_font = () => {
      const random_font = font_list[Math.floor(Math.random() * font_list.length)];
      for (const element of elements) {
        element.style.fontFamily = random_font;
      }
      console.log(`Changed font to: ${random_font}`);
    };

    change_font();
    const interval_id = setInterval(change_font, interval_seconds * 1000);

    return {
      stop: () => {
        clearInterval(interval_id);
        console.log("Font changing stopped");
      }
    };
  }

  static random_font_for_id(target_id, interval_seconds, custom_font_list = null) {
    const font_list = custom_font_list?.length ? custom_font_list : DEFAULT_FONTS;
    const element = document.getElementById(target_id);

    if (!element) {
      console.warn(`Element with id "${target_id}" not found.`);
      return { stop: () => { } };
    }

    const change_font = () => {
      const random_font = font_list[Math.floor(Math.random() * font_list.length)];
      element.style.fontFamily = random_font;
      console.log(`Changed font to: ${random_font}`);
    };

    change_font();
    const interval_id = setInterval(change_font, interval_seconds * 1000);

    return {
      stop: () => {
        clearInterval(interval_id);
        console.log("Stopped randomizing fonts");
      }
    };
  }

  static generate_random_color() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  static start_color_change(element_id, interval_ms = 300) {
    const element = document.getElementById(element_id);
    if (!element) {
      console.error(`Element with ID "${element_id}" not found.`);
      return { stop: () => { } };
    }

    element.style.backgroundColor = this.generate_random_color();
    element.style.color = this.generate_random_color();
    const interval_id = setInterval(() => {
      element.style.backgroundColor = this.generate_random_color();
      element.style.color = this.generate_random_color();
    }, interval_ms);

    return {
      stop: () => {
        clearInterval(interval_id);
      }
    };
  }

  static rainbow_effect(image_id, speed_ms = 10, intensity = 5) {
    const image = document.getElementById(image_id);
    if (!image) {
      console.error(`No image found with ID: ${image_id}`);
      return { stop: () => { } };
    }

    const original_filter = image.style.filter || "";
    let hue = 0;

    const interval_id = setInterval(() => {
      hue = (hue + 1) % 360;
      image.style.filter = `hue-rotate(${hue * intensity}deg) saturate(1.2)`;
    }, speed_ms);

    return {
      stop: () => {
        clearInterval(interval_id);
        image.style.filter = original_filter;
      }
    };
  }

  static force_click(element) {
    if (!element) {
      console.warn('No element provided');
      return;
    }

    const rect = element.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    const mouse_events = [
      new MouseEvent('mousedown', {
        view: window,
        bubbles: true,
        cancelable: true,
        clientX: x,
        clientY: y
      }),
      new MouseEvent('mouseup', {
        view: window,
        bubbles: true,
        cancelable: true,
        clientX: x,
        clientY: y
      }),
      new MouseEvent('click', {
        view: window,
        bubbles: true,
        cancelable: true,
        clientX: x,
        clientY: y
      })
    ];

    mouse_events.forEach(event => element.dispatchEvent(event));
  }
}

class AudioPlayerController {
  constructor({
    player_id = "audio-player",
    play_button_id = "play-btn",
    pause_button_id = "pause-btn",
    stop_button_id = "stop-btn",
    volume_control_id = "volume",
    current_time_display_id = "current-time",
    duration_display_id = "duration",
    dance_image_id = "dance-gif",
    music_src = "bg-music-src",
    next_btn = "next",
    prev_btn = "prev",
    song_picker = "song-picker"
  } = {}) {
    this.player = document.getElementById(player_id);
    this.play_button = document.getElementById(play_button_id);
    this.pause_button = document.getElementById(pause_button_id);
    this.stop_button = document.getElementById(stop_button_id);
    this.volume_control = document.getElementById(volume_control_id);
    this.current_time_display = document.getElementById(current_time_display_id);
    this.duration_display = document.getElementById(duration_display_id);
    this.dance_image = document.getElementById(dance_image_id);
    this.music_src = document.getElementById(music_src);
    this.next_btn = document.getElementById(next_btn);
    this.prev_btn = document.getElementById(prev_btn);
    this.song_picker = document.getElementById(song_picker);
    this.rainbow_effect = null;

    this.initialize();
  }

  initialize() {
    if (!this.player) {
      console.error("Audio player element not found");
      return;
    }

    this.populate_song_picker();
    this.setup_event_listeners();
    this.player.volume = this.volume_control.value;
  }

  populate_song_picker() {
    SONGS.forEach(song => {
      const option = document.createElement("option");
      option.value = song;
      option.textContent = `Song: ${song}`
      this.song_picker.appendChild(option);
    });

    this.song_picker?.addEventListener("change", () => this.handle_song_change());
  }

  get_mp3_meta(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.readAsArrayBuffer(file);
      reader.onload = (event) => {
        const arr_buff = event.target.result;
        const dat_view = new DataView(arr_buff);

        if (dat_view.getUint8(0) === 0x49 && dat_view.getUint8(1) === 0x44 && dat_view.getUint8(2) === 0x33) {
          const size = (dat_view.getUint8(6) & 0x7F) << 21 |
            (dat_view.getUint8(7) & 0x7F) << 14 |
            (dat_view.getUint8(8) & 0x7F) << 7 |
            dat_view.getUint8(9) & 0x7F;

          // Loop through the ID3v2 tags
          let offset = 10; // Skip the header and size bytes
          while (offset + 10 <= size) {
            const frame_id = String.fromCharCode(dat_view.getUint8(offset),
              dat_view.getUint8(offset + 1),
              dat_view.getUint8(offset + 2),
              dat_view.getUint8(offset + 3));

            if (frame_id === 'TIT2') {
              const size = (dat_view.getUint8(offset + 4) & 0x7F) << 21 |
                (dat_view.getUint8(offset + 5) & 0x7F) << 14 |
                (dat_view.getUint8(offset + 6) & 0x7F) << 7 |
                dat_view.getUint8(offset + 7) & 0x7F;

              const encoding = dat_view.getUint8(offset + 8);
              let title = '';
              for (let i = offset + 9; i < offset + 9 + size; i++) {
                if (encoding === 0) {
                  title += String.fromCharCode(dat_view.getUint8(i));
                } else if (encoding === 3) {
                  let charCode = dat_view.getUint8(i);
                  if ((charCode & 0xE0) === 0xC0 && i + 1 < offset + 9 + size) {
                    title += String.fromCharCode(((charCode & 0x1F) << 6) | (dat_view.getUint8(++i) & 0x3F));
                  } else if ((charCode & 0xF0) === 0xE0 && i + 2 < offset + 9 + size) {
                    title += String.fromCharCode(((charCode & 0x0F) << 12) | ((dat_view.getUint8(++i) & 0x3F) << 6) | (dat_view.getUint8(++i) & 0x3F));
                  }
                }
              }

              resolve(title);
              return;
            }

            const frame_size = (dat_view.getUint8(offset + 4) & 0x7F) << 21 |
              (dat_view.getUint8(offset + 5) & 0x7F) << 14 |
              (dat_view.getUint8(offset + 6) & 0x7F) << 7 |
              dat_view.getUint8(offset + 7) & 0x7F;
            offset += 10 + frame_size;
          }

          resolve(null);
        } else {
          reject('Not an ID3v2 tagged MP3 file');
        }
      };

      reader.onerror = (error) => {
        reject(error);
      };
    });
  }

  setup_event_listeners() {
    this.play_button?.addEventListener("click", () => this.handle_play());
    this.pause_button?.addEventListener("click", () => this.handle_pause());
    this.stop_button?.addEventListener("click", () => this.handle_stop());
    this.volume_control?.addEventListener("input", () => this.handle_volume_change());
    this.player?.addEventListener("timeupdate", () => this.update_time_display());
    this.player?.addEventListener("ended", () => this.handle_playback_end());
    this.next_btn?.addEventListener("click", () => this.handle_next_song());
    this.prev_btn?.addEventListener("click", () => this.handle_prev_song());
    this.current_song_index = 0;
  }

  handle_play() {
    this.player.play();
    if (this.dance_image) {
      this.dance_image.style.display = "block";
      this.dance_image.src = "assets/epicsauce.gif";
      this.rainbow_effect = DomEffects.rainbow_effect("dance-gif", 5, 3);
    }
  }

  handle_pause() {
    this.player.pause();
    if (this.dance_image) {
      this.dance_image.src = "assets/brocollie.png";
      if (this.rainbow_effect) {
        this.rainbow_effect.stop();
        this.rainbow_effect = null;
      }
    }
  }

  handle_stop() {
    this.player.pause();
    this.player.currentTime = 0;
    this.change_song_source(0);
    if (this.dance_image) {
      this.dance_image.src = "assets/brocollie.png";
      this.dance_image.style.display = "block";
      if (this.rainbow_effect) {
        this.rainbow_effect.stop();
        this.rainbow_effect = null;
      }
    }
  }

  handle_volume_change() {
    this.player.volume = this.volume_control.value;
  }

  update_time_display() {
    const current_mins = Math.floor(this.player.currentTime / 60);
    const current_secs = Math.floor(this.player.currentTime % 60).toString().padStart(2, "0");
    this.current_time_display.textContent = `${current_mins}:${current_secs}`;

    if (!isNaN(this.player.duration)) {
      const duration_mins = Math.floor(this.player.duration / 60);
      const duration_secs = Math.floor(this.player.duration % 60).toString().padStart(2, "0");
      this.duration_display.textContent = `${duration_mins}:${duration_secs}`;
    }
  }

  handle_playback_end() {
    if (this.dance_image) {
      this.dance_image.src = "assets/brocollie.png";
    }
    if (this.rainbow_effect) {
      this.rainbow_effect.stop();
      this.rainbow_effect = null;
    }
  }

  handle_next_song() {
    this.current_song_index = (this.current_song_index + 1) % SONGS.length;
    this.change_song_source(this.current_song_index);
    this.update_time_display();
    this.player.pause();
    this.player.play();
  }

  handle_prev_song() {
    this.current_song_index = (this.current_song_index - 1 + SONGS.length) % SONGS.length;
    this.change_song_source(this.current_song_index);
    this.update_time_display();
    this.player.pause();
    this.player.play();
  }

  change_song_source(index) {
    if (this.player && this.music_src) {
      this.player.src = SONGS[index];
      this.music_src.value = SONGS[index];
    }
  }

  handle_song_change() {
    const selected_song = this.song_picker.value;
    if (this.player && this.music_src) {
      this.player.src = selected_song;
      this.music_src.value = selected_song;
      this.current_song_index = SONGS.indexOf(selected_song);
      this.update_time_display();
    }
    this.player.play();
  }
}

function initialize_effects() {
  const class_selectors = [
    "epic-tracks-player", "dance", "player-controls",
    "volume-control", "time-display", "track-switcher"
  ];

  const id_selectors = [
    "dance-gif", "audio-player", "play-btn",
    "pause-btn", "stop-btn", "volume",
    "e", "p", "i", "cspace", "t", "r", "a", "c", "k", "s",
    "spaceone", "spacetwo", "spacethree", "spacefour",
    "volume", "volume-label", "current-time", "duration",
    "prev", "next"
  ];

  class_selectors.forEach(selector => {
    DomEffects.random_font_for_class(selector, 0.3, EXTENDED_FONTS);
  });

  id_selectors.forEach(selector => {
    DomEffects.random_font_for_id(selector, 0.5, EXTENDED_FONTS);
    DomEffects.start_color_change(selector, 200);
  });

  new AudioPlayerController();
}

document.addEventListener("DOMContentLoaded", initialize_effects);
