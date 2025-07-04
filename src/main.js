"use strict";
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
    static random_font_for_class(cls, interval_ms, fonts = DEFAULT_FONTS) {
        const elements = document.getElementsByClassName(cls);
        if (elements.length === 0) {
            console.warn(`No elements with class "${cls}" found.`);
            return { stop: () => { } };
        }
        const change_font = () => {
            const rand_font = fonts[Math.floor(Math.random() * fonts.length)];
            Array.from(elements).forEach(element => {
                element.style.fontFamily = rand_font;
            });
            console.log(`Changed font to: ${rand_font}`);
        };
        change_font();
        const interval_id = setInterval(change_font, interval_ms * 1000);
        return {
            stop: () => clearInterval(interval_id)
        };
    }
    static random_font_for_id(id, interval_ms, fonts = null) {
        const font_list = (fonts?.length ? fonts : DEFAULT_FONTS);
        const element = document.getElementById(id);
        if (!element) {
            console.warn(`Element with id "${id}" not found.`);
            return { stop: () => { } };
        }
        const change_font = () => {
            const random_font = font_list[Math.floor(Math.random() * font_list.length)];
            element.style.fontFamily = random_font;
            console.log(`Changed font to: ${random_font}`);
        };
        change_font();
        const interval_id = setInterval(change_font, interval_ms * 1000);
        return {
            stop: () => clearInterval(interval_id)
        };
    }
    static generate_random_color() {
        const letters = "0123456789ABCDEF";
        return "#" + Array.from({ length: 6 }, () => letters[Math.floor(Math.random() * 16)]).join("");
    }
    static start_color_change(element_id, interval_ms = 300) {
        const element = document.getElementById(element_id);
        if (!element) {
            console.error(`Element with ID "${element_id}" not found.`);
            return { stop: () => { } };
        }
        const apply_color = () => {
            element.style.backgroundColor = this.generate_random_color();
            element.style.color = this.generate_random_color();
        };
        apply_color();
        const interval_id = setInterval(apply_color, interval_ms);
        return {
            stop: () => clearInterval(interval_id)
        };
    }
    static woke_mind_virus(image_id, speed_ms = 10, intensity = 5) {
        const image = document.getElementById(image_id);
        if (!image) {
            console.error(`No image found with ID: ${image_id}`);
            return { stop: () => { } };
        }
        const original_filter = image.style.filter;
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
            new MouseEvent('mousedown', { view: window, bubbles: true, cancelable: true, clientX: x, clientY: y }),
            new MouseEvent('mouseup', { view: window, bubbles: true, cancelable: true, clientX: x, clientY: y }),
            new MouseEvent('click', { view: window, bubbles: true, cancelable: true, clientX: x, clientY: y })
        ];
        mouse_events.forEach(event => element.dispatchEvent(event));
    }
}
;
class AudioPlayerController {
    constructor({ player_id = "audio-player", play_button_id = "play-btn", pause_button_id = "pause-btn", stop_button_id = "stop-btn", volume_control_id = "volume", current_time_display_id = "current-time", duration_display_id = "duration", dance_image_id = "dance-gif", music_src = "bg-music-src", next_btn = "next", prev_btn = "prev", song_picker = "song-picker", shuffle_toggle = "shuffle-toggle", } = {}) {
        this.rainbow_effect = null;
        this.current_song_index = 0;
        this.is_shuffling = false;
        this.font_effects_enabled = true;
        this.color_effects_enabled = true;
        this.is_playing = false;
        this.custom_songs = [];
        this.shuffled_playlist = [];
        this.shuffle_index = 0;
        this.font_effect_handles = [];
        this.color_effect_handles = [];
        const player = document.getElementById(player_id);
        if (!player)
            throw new Error("Audio player element not found");
        this.player = player;
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
        this.shuffle_toggle = document.getElementById(shuffle_toggle);
        this.initialize();
        this.load_settings();
        this.load_custom_songs();
    }
    initialize() {
        this.populate_song_picker();
        this.setup_event_listeners();
        if (this.volume_control) {
            this.player.volume = Number(this.volume_control.value);
        }
    }
    shuffle_songs() {
        this.shuffled_playlist = [...SONGS].sort(() => Math.random() - 0.5);
        this.shuffle_index = 0;
    }
    init_shuffle_and_theme_btns() {
        const shuffle_btn = this.shuffle_toggle;
        shuffle_btn?.addEventListener("click", () => {
            this.is_shuffling = !this.is_shuffling;
            shuffle_btn.textContent = this.is_shuffling ? "Every Day I'm Shufflin'" : "No more shufflin :(";
            this.save_settings();
        });
        shuffle_btn && (shuffle_btn.textContent = this.is_shuffling ? "Every Day I'm Shufflin'" : "No more shufflin :(");
        if (this.is_shuffling) {
            this.shuffle_songs();
        }
    }
    setup_drag_drop() {
        const dropper = document.getElementById("custom-song-drop");
        if (!dropper)
            return;
        dropper.addEventListener("dragover", e => {
            e.preventDefault();
            dropper.classList.add("dragging");
        });
        dropper.addEventListener("dragleave", () => {
            dropper.classList.remove("dragging");
        });
        dropper.addEventListener("drop", e => {
            e.preventDefault();
            dropper.classList.remove("dragging");
            const files = Array.from(e.dataTransfer?.files || []);
            if (files.length > 0) {
                const url = URL.createObjectURL(files[0]);
                this.player.src = url;
                this.player.play();
                document.getElementById("song-name").textContent = `Song: ${files[0].name}`;
                this.custom_songs.push(url);
                this.save_custom_songs();
                this.update_song_picker();
            }
        });
    }
    update_song_name() {
        const song = this.player.src.split("/").pop();
        document.getElementById("song-name").textContent = `🎶 Now Playing: ${decodeURIComponent(song ?? "Unknown")}`;
    }
    populate_song_picker() {
        if (!this.song_picker)
            return;
        SONGS.forEach(song => {
            const option = document.createElement("option");
            option.value = song;
            option.textContent = `Song: ${song}`;
            this.song_picker.appendChild(option);
        });
        this.song_picker.addEventListener("change", () => this.handle_song_change());
    }
    setup_event_listeners() {
        this.play_button?.addEventListener("click", () => this.handle_play());
        this.pause_button?.addEventListener("click", () => this.handle_pause());
        this.stop_button?.addEventListener("click", () => this.handle_stop());
        this.volume_control?.addEventListener("input", () => this.handle_volume_change());
        this.player.addEventListener("timeupdate", () => this.update_time_display());
        this.player.addEventListener("ended", () => this.handle_playback_end());
        this.next_btn?.addEventListener("click", () => this.handle_next_song());
        this.prev_btn?.addEventListener("click", () => this.handle_prev_song());
    }
    handle_play() {
        this.is_playing = true;
        this.player.play();
        if (this.dance_image) {
            this.dance_image.style.display = "block";
            this.dance_image.src = "assets/epicsauce.gif";
            this.rainbow_effect = DomEffects.woke_mind_virus("dance-gif", 5, 3);
        }
        this.update_song_name();
    }
    handle_pause() {
        this.is_playing = false;
        this.player.pause();
        if (this.dance_image) {
            this.dance_image.src = "assets/brocollie.png";
            this.rainbow_effect?.stop();
            this.rainbow_effect = null;
        }
    }
    handle_stop() {
        this.is_playing = false;
        this.player.pause();
        this.player.currentTime = 0;
        this.change_song_source(0);
        if (this.dance_image) {
            this.dance_image.src = "assets/brocollie.png";
            this.dance_image.style.display = "block";
            this.rainbow_effect?.stop();
            this.rainbow_effect = null;
        }
    }
    handle_volume_change() {
        if (this.volume_control) {
            this.player.volume = Number(this.volume_control.value);
        }
    }
    update_time_display() {
        const current_mins = Math.floor(this.player.currentTime / 60);
        const current_secs = Math.floor(this.player.currentTime % 60).toString().padStart(2, "0");
        if (this.current_time_display) {
            this.current_time_display.textContent = `${current_mins}:${current_secs}`;
        }
        if (!isNaN(this.player.duration) && this.duration_display) {
            const duration_mins = Math.floor(this.player.duration / 60);
            const duration_secs = Math.floor(this.player.duration % 60).toString().padStart(2, "0");
            this.duration_display.textContent = `${duration_mins}:${duration_secs}`;
        }
    }
    handle_playback_end() {
        if (this.dance_image) {
            this.dance_image.src = "assets/brocollie.png";
        }
        this.rainbow_effect?.stop();
        this.rainbow_effect = null;
        this.handle_next_song();
    }
    handle_next_song() {
        if (this.is_shuffling) {
            if (this.shuffled_playlist.length === 0 || this.shuffle_index >= this.shuffled_playlist.length) {
                this.shuffle_songs();
            }
            const next_song = this.shuffled_playlist[this.shuffle_index++];
            this.current_song_index = SONGS.indexOf(next_song);
            this.player.src = next_song;
        }
        else {
            this.current_song_index = (this.current_song_index + 1) % SONGS.length;
            this.player.src = SONGS[this.current_song_index];
        }
        this.update_song_name();
        if (this.is_playing) {
            this.player.play();
        }
    }
    handle_prev_song() {
        this.current_song_index = (this.current_song_index - 1 + SONGS.length) % SONGS.length;
        this.change_song_source(this.current_song_index);
        this.update_time_display();
        if (this.is_playing) {
            this.player.pause();
            this.player.play();
        }
        this.update_song_name();
    }
    change_song_source(index) {
        if (this.music_src) {
            this.player.src = SONGS[index];
            this.music_src.value = SONGS[index];
        }
        this.update_song_name();
    }
    handle_song_change() {
        const selected_song = this.song_picker?.value;
        if (!selected_song)
            return;
        this.player.src = selected_song;
        this.music_src && (this.music_src.value = selected_song);
        this.current_song_index = SONGS.indexOf(selected_song);
        this.update_time_display();
        this.player.play();
        this.update_song_name();
    }
    load_settings() {
        const settings = localStorage.getItem("settings");
        if (settings) {
            const parsed = JSON.parse(settings);
            this.font_effects_enabled = parsed.font_effects !== false;
            this.color_effects_enabled = parsed.color_effects !== false;
            this.is_shuffling = parsed.shuffle || false;
            if (this.volume_control) {
                this.volume_control.value = parsed.volume || '0.75';
                this.player.volume = Number(this.volume_control.value);
            }
        }
    }
    save_settings() {
        localStorage.setItem("settings", JSON.stringify({
            font_effects: this.font_effects_enabled,
            color_effects: this.color_effects_enabled,
            shuffle: this.is_shuffling,
            volume: this.volume_control?.value || '0.75'
        }));
    }
    load_custom_songs() {
        const songs = localStorage.getItem("custom_songs");
        if (songs) {
            this.custom_songs = JSON.parse(songs);
            this.update_song_picker();
        }
    }
    save_custom_songs() {
        localStorage.setItem("custom_songs", JSON.stringify(this.custom_songs));
    }
    update_song_picker() {
        if (!this.song_picker)
            return;
        this.song_picker.innerHTML = '';
        SONGS.forEach(song => {
            const option = document.createElement("option");
            option.value = song;
            option.textContent = `Song: ${song.split('/').pop()}`;
            this.song_picker.append(option);
        });
        this.custom_songs.forEach(song => {
            const option = document.createElement("option");
            option.value = song;
            option.textContent = `Custom: ${song.split('/').pop()}`;
            this.song_picker.appendChild(option);
        });
    }
    apply_font_effects() {
        const class_selectors = [
            "epic-tracks-player", "dance", "player-controls",
            "volume-control", "time-display", "track-switcher",
            "options-bar"
        ];
        const id_selectors = [
            "dance-gif", "audio-player", "play-btn",
            "pause-btn", "stop-btn", "volume",
            "e", "p", "i", "cspace", "t", "r", "a", "c", "k", "s",
            "spaceone", "spacetwo", "spacethree", "spacefour",
            "volume", "volume-label", "current-time", "duration",
            "prev", "next", "song-picker", "shuffle-toggle", "theme-toggle"
        ];
        this.font_effect_handles = [
            ...class_selectors.map(cls => DomEffects.random_font_for_class(cls, 0.3, EXTENDED_FONTS)),
            ...id_selectors.map(id => DomEffects.random_font_for_id(id, 0.5, EXTENDED_FONTS))
        ];
    }
    remove_font_effects() {
        this.font_effect_handles.forEach(handle => handle.stop());
        this.font_effect_handles = [];
    }
    apply_color_effects() {
        const id_selectors = [
            "dance-gif", "audio-player", "play-btn",
            "pause-btn", "stop-btn", "volume",
            "e", "p", "i", "cspace", "t", "r", "a", "c", "k", "s",
            "spaceone", "spacetwo", "spacethree", "spacefour",
            "volume", "volume-label", "current-time", "duration",
            "prev", "next", "song-picker", "shuffle-toggle", "theme-toggle"
        ];
        this.color_effect_handles = id_selectors.map(id => DomEffects.start_color_change(id, 200));
    }
    remove_color_effects() {
        this.color_effect_handles.forEach(handle => handle.stop());
        this.color_effect_handles = [];
    }
}
function initialize_effects() {
    const audio_controller = new AudioPlayerController();
    const font_effects_toggle = document.getElementById("font-effects-toggle");
    const color_effects_toggle = document.getElementById("color-effects-toggle");
    font_effects_toggle?.addEventListener("click", () => {
        audio_controller.font_effects_enabled = !audio_controller.font_effects_enabled;
        font_effects_toggle.textContent = `Font Effects: ${audio_controller.font_effects_enabled ? 'On' : 'Off'}`;
        if (audio_controller.font_effects_enabled) {
            audio_controller.apply_font_effects();
        }
        else {
            audio_controller.remove_font_effects();
        }
        audio_controller.save_settings();
    });
    color_effects_toggle?.addEventListener("click", () => {
        audio_controller.color_effects_enabled = !audio_controller.color_effects_enabled;
        color_effects_toggle.textContent = `Color Effects: ${audio_controller.color_effects_enabled ? 'On' : 'Off'}`;
        if (audio_controller.color_effects_enabled) {
            audio_controller.apply_color_effects();
        }
        else {
            audio_controller.remove_color_effects();
        }
        audio_controller.save_settings();
    });
    font_effects_toggle && (font_effects_toggle.textContent = `Font Effects: ${audio_controller.font_effects_enabled ? 'On' : 'Off'}`);
    color_effects_toggle && (color_effects_toggle.textContent = `Color Effects: ${audio_controller.color_effects_enabled ? 'On' : 'Off'}`);
    audio_controller.init_shuffle_and_theme_btns();
    audio_controller.setup_drag_drop();
}
document.addEventListener("DOMContentLoaded", initialize_effects);
