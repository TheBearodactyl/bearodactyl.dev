var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var DEFAULT_FONTS = [
    "Arial", "Verdana", "Helvetica", "Times New Roman",
    "Courier New", "Georgia", "Palatino", "Garamond",
    "Comic Sans MS", "Impact", "Lucida Sans", "Trebuchet MS"
];
var EXTENDED_FONTS = [
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
var SONGS = [
    "assets/epic_bg_music.flac",
    "assets/epic_bg_music_1.flac",
    "assets/epic_bg_music_2.flac",
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
var DomEffects = /** @class */ (function () {
    function DomEffects() {
    }
    DomEffects.random_font_for_class = function (cls, interval_ms, fonts) {
        if (fonts === void 0) { fonts = DEFAULT_FONTS; }
        var elements = document.getElementsByClassName(cls);
        if (elements.length === 0) {
            console.warn("No elements with class \"".concat(cls, "\" found."));
            return { stop: function () { } };
        }
        var change_font = function () {
            var rand_font = fonts[Math.floor(Math.random() * fonts.length)];
            Array.from(elements).forEach(function (element) {
                element.style.fontFamily = rand_font;
            });
            console.log("Changed font to: ".concat(rand_font));
        };
        change_font();
        var interval_id = setInterval(change_font, interval_ms * 1000);
        return {
            stop: function () { return clearInterval(interval_id); }
        };
    };
    DomEffects.random_font_for_id = function (id, interval_ms, fonts) {
        if (fonts === void 0) { fonts = null; }
        var font_list = ((fonts === null || fonts === void 0 ? void 0 : fonts.length) ? fonts : DEFAULT_FONTS);
        var element = document.getElementById(id);
        if (!element) {
            console.warn("Element with id \"".concat(id, "\" not found."));
            return { stop: function () { } };
        }
        var change_font = function () {
            var random_font = font_list[Math.floor(Math.random() * font_list.length)];
            element.style.fontFamily = random_font;
            console.log("Changed font to: ".concat(random_font));
        };
        change_font();
        var interval_id = setInterval(change_font, interval_ms * 1000);
        return {
            stop: function () { return clearInterval(interval_id); }
        };
    };
    DomEffects.generate_random_color = function () {
        var letters = "0123456789ABCDEF";
        return "#" + Array.from({ length: 6 }, function () {
            return letters[Math.floor(Math.random() * 16)];
        }).join("");
    };
    DomEffects.start_color_change = function (element_id, interval_ms) {
        var _this = this;
        if (interval_ms === void 0) { interval_ms = 300; }
        var element = document.getElementById(element_id);
        if (!element) {
            console.error("Element with ID \"".concat(element_id, "\" not found."));
            return { stop: function () { } };
        }
        var apply_color = function () {
            element.style.backgroundColor = _this.generate_random_color();
            element.style.color = _this.generate_random_color();
        };
        apply_color();
        var interval_id = setInterval(apply_color, interval_ms);
        return {
            stop: function () { return clearInterval(interval_id); }
        };
    };
    DomEffects.woke_mind_virus = function (image_id, speed_ms, intensity) {
        if (speed_ms === void 0) { speed_ms = 10; }
        if (intensity === void 0) { intensity = 5; }
        var image = document.getElementById(image_id);
        if (!image) {
            console.error("No image found with ID: ".concat(image_id));
            return { stop: function () { } };
        }
        var original_filter = image.style.filter;
        var hue = 0;
        var interval_id = setInterval(function () {
            hue = (hue + 1) % 360;
            image.style.filter = "hue-rotate(".concat(hue * intensity, "deg) saturate(1.2)");
        }, speed_ms);
        return {
            stop: function () {
                clearInterval(interval_id);
                image.style.filter = original_filter;
            }
        };
    };
    DomEffects.force_click = function (element) {
        if (!element) {
            console.warn('No element provided');
            return;
        }
        var rect = element.getBoundingClientRect();
        var x = rect.left + rect.width / 2;
        var y = rect.top + rect.height / 2;
        var mouse_events = [
            new MouseEvent('mousedown', { view: window, bubbles: true, cancelable: true, clientX: x, clientY: y }),
            new MouseEvent('mouseup', { view: window, bubbles: true, cancelable: true, clientX: x, clientY: y }),
            new MouseEvent('click', { view: window, bubbles: true, cancelable: true, clientX: x, clientY: y })
        ];
        mouse_events.forEach(function (event) { return element.dispatchEvent(event); });
    };
    return DomEffects;
}());
;
var AudioPlayerController = /** @class */ (function () {
    function AudioPlayerController(_a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.player_id, player_id = _c === void 0 ? "audio-player" : _c, _d = _b.play_button_id, play_button_id = _d === void 0 ? "play-btn" : _d, _e = _b.pause_button_id, pause_button_id = _e === void 0 ? "pause-btn" : _e, _f = _b.stop_button_id, stop_button_id = _f === void 0 ? "stop-btn" : _f, _g = _b.volume_control_id, volume_control_id = _g === void 0 ? "volume" : _g, _h = _b.current_time_display_id, current_time_display_id = _h === void 0 ? "current-time" : _h, _j = _b.duration_display_id, duration_display_id = _j === void 0 ? "duration" : _j, _k = _b.dance_image_id, dance_image_id = _k === void 0 ? "dance-gif" : _k, _l = _b.music_src, music_src = _l === void 0 ? "bg-music-src" : _l, _m = _b.next_btn, next_btn = _m === void 0 ? "next" : _m, _o = _b.prev_btn, prev_btn = _o === void 0 ? "prev" : _o, _p = _b.song_picker, song_picker = _p === void 0 ? "song-picker" : _p, _q = _b.shuffle_toggle, shuffle_toggle = _q === void 0 ? "shuffle-toggle" : _q;
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
        var player = document.getElementById(player_id);
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
    AudioPlayerController.prototype.initialize = function () {
        this.populate_song_picker();
        this.setup_event_listeners();
        if (this.volume_control) {
            this.player.volume = Number(this.volume_control.value);
        }
    };
    AudioPlayerController.prototype.shuffle_songs = function () {
        this.shuffled_playlist = __spreadArray([], SONGS, true).sort(function () { return Math.random() - 0.5; });
        this.shuffle_index = 0;
    };
    AudioPlayerController.prototype.init_shuffle_and_theme_btns = function () {
        var _this = this;
        var shuffle_btn = this.shuffle_toggle;
        shuffle_btn === null || shuffle_btn === void 0 ? void 0 : shuffle_btn.addEventListener("click", function () {
            _this.is_shuffling = !_this.is_shuffling;
            shuffle_btn.textContent = _this.is_shuffling ? "Every Day I'm Shufflin'" : "No more shufflin :(";
            _this.save_settings();
        });
        shuffle_btn && (shuffle_btn.textContent = this.is_shuffling ? "Every Day I'm Shufflin'" : "No more shufflin :(");
        if (this.is_shuffling) {
            this.shuffle_songs();
        }
    };
    AudioPlayerController.prototype.setup_drag_drop = function () {
        var _this = this;
        var dropper = document.getElementById("custom-song-drop");
        if (!dropper)
            return;
        dropper.addEventListener("dragover", function (e) {
            e.preventDefault();
            dropper.classList.add("dragging");
        });
        dropper.addEventListener("dragleave", function () {
            dropper.classList.remove("dragging");
        });
        dropper.addEventListener("drop", function (e) {
            var _a;
            e.preventDefault();
            dropper.classList.remove("dragging");
            var files = Array.from(((_a = e.dataTransfer) === null || _a === void 0 ? void 0 : _a.files) || []);
            if (files.length > 0) {
                var url = URL.createObjectURL(files[0]);
                _this.player.src = url;
                _this.player.play();
                document.getElementById("song-name").textContent = "Song: ".concat(files[0].name);
                _this.custom_songs.push(url);
                _this.save_custom_songs();
                _this.update_song_picker();
            }
        });
    };
    AudioPlayerController.prototype.update_song_name = function () {
        var song = this.player.src.split("/").pop();
        document.getElementById("song-name").textContent = "\uD83C\uDFB6 Now Playing: ".concat(decodeURIComponent(song !== null && song !== void 0 ? song : "Unknown"));
    };
    AudioPlayerController.prototype.populate_song_picker = function () {
        var _this = this;
        if (!this.song_picker)
            return;
        SONGS.forEach(function (song) {
            var option = document.createElement("option");
            option.value = song;
            option.textContent = "Song: ".concat(song);
            _this.song_picker.appendChild(option);
        });
        this.song_picker.addEventListener("change", function () { return _this.handle_song_change(); });
    };
    AudioPlayerController.prototype.setup_event_listeners = function () {
        var _this = this;
        var _a, _b, _c, _d, _e, _f;
        (_a = this.play_button) === null || _a === void 0 ? void 0 : _a.addEventListener("click", function () { return _this.handle_play(); });
        (_b = this.pause_button) === null || _b === void 0 ? void 0 : _b.addEventListener("click", function () { return _this.handle_pause(); });
        (_c = this.stop_button) === null || _c === void 0 ? void 0 : _c.addEventListener("click", function () { return _this.handle_stop(); });
        (_d = this.volume_control) === null || _d === void 0 ? void 0 : _d.addEventListener("input", function () { return _this.handle_volume_change(); });
        this.player.addEventListener("timeupdate", function () { return _this.update_time_display(); });
        this.player.addEventListener("ended", function () { return _this.handle_playback_end(); });
        (_e = this.next_btn) === null || _e === void 0 ? void 0 : _e.addEventListener("click", function () { return _this.handle_next_song(); });
        (_f = this.prev_btn) === null || _f === void 0 ? void 0 : _f.addEventListener("click", function () { return _this.handle_prev_song(); });
    };
    AudioPlayerController.prototype.handle_play = function () {
        this.is_playing = true;
        this.player.play();
        if (this.dance_image) {
            this.dance_image.style.display = "block";
            this.dance_image.src = "assets/epicsauce.gif";
            this.rainbow_effect = DomEffects.woke_mind_virus("dance-gif", 5, 3);
        }
        this.update_song_name();
    };
    AudioPlayerController.prototype.handle_pause = function () {
        var _a;
        this.is_playing = false;
        this.player.pause();
        if (this.dance_image) {
            this.dance_image.src = "assets/brocollie.png";
            (_a = this.rainbow_effect) === null || _a === void 0 ? void 0 : _a.stop();
            this.rainbow_effect = null;
        }
    };
    AudioPlayerController.prototype.handle_stop = function () {
        var _a;
        this.is_playing = false;
        this.player.pause();
        this.player.currentTime = 0;
        this.change_song_source(0);
        if (this.dance_image) {
            this.dance_image.src = "assets/brocollie.png";
            this.dance_image.style.display = "block";
            (_a = this.rainbow_effect) === null || _a === void 0 ? void 0 : _a.stop();
            this.rainbow_effect = null;
        }
    };
    AudioPlayerController.prototype.handle_volume_change = function () {
        if (this.volume_control) {
            this.player.volume = Number(this.volume_control.value);
        }
    };
    AudioPlayerController.prototype.update_time_display = function () {
        var current_mins = Math.floor(this.player.currentTime / 60);
        var current_secs = Math.floor(this.player.currentTime % 60).toString().padStart(2, "0");
        if (this.current_time_display) {
            this.current_time_display.textContent = "".concat(current_mins, ":").concat(current_secs);
        }
        if (!isNaN(this.player.duration) && this.duration_display) {
            var duration_mins = Math.floor(this.player.duration / 60);
            var duration_secs = Math.floor(this.player.duration % 60).toString().padStart(2, "0");
            this.duration_display.textContent = "".concat(duration_mins, ":").concat(duration_secs);
        }
    };
    AudioPlayerController.prototype.handle_playback_end = function () {
        var _a;
        if (this.dance_image) {
            this.dance_image.src = "assets/brocollie.png";
        }
        (_a = this.rainbow_effect) === null || _a === void 0 ? void 0 : _a.stop();
        this.rainbow_effect = null;
        this.handle_next_song();
    };
    AudioPlayerController.prototype.handle_next_song = function () {
        if (this.is_shuffling) {
            if (this.shuffled_playlist.length === 0 || this.shuffle_index >= this.shuffled_playlist.length) {
                this.shuffle_songs();
            }
            var next_song = this.shuffled_playlist[this.shuffle_index++];
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
    };
    AudioPlayerController.prototype.handle_prev_song = function () {
        this.current_song_index = (this.current_song_index - 1 + SONGS.length) % SONGS.length;
        this.change_song_source(this.current_song_index);
        this.update_time_display();
        if (this.is_playing) {
            this.player.pause();
            this.player.play();
        }
        this.update_song_name();
    };
    AudioPlayerController.prototype.change_song_source = function (index) {
        if (this.music_src) {
            this.player.src = SONGS[index];
            this.music_src.value = SONGS[index];
        }
        this.update_song_name();
    };
    AudioPlayerController.prototype.handle_song_change = function () {
        var _a;
        var selected_song = (_a = this.song_picker) === null || _a === void 0 ? void 0 : _a.value;
        if (!selected_song)
            return;
        this.player.src = selected_song;
        this.music_src && (this.music_src.value = selected_song);
        this.current_song_index = SONGS.indexOf(selected_song);
        this.update_time_display();
        this.player.play();
        this.update_song_name();
    };
    AudioPlayerController.prototype.load_settings = function () {
        var settings = localStorage.getItem("settings");
        if (settings) {
            var parsed = JSON.parse(settings);
            this.font_effects_enabled = parsed.font_effects !== false;
            this.color_effects_enabled = parsed.color_effects !== false;
            this.is_shuffling = parsed.shuffle || false;
            if (this.volume_control) {
                this.volume_control.value = parsed.volume || '0.75';
                this.player.volume = Number(this.volume_control.value);
            }
        }
    };
    AudioPlayerController.prototype.save_settings = function () {
        var _a;
        localStorage.setItem("settings", JSON.stringify({
            font_effects: this.font_effects_enabled,
            color_effects: this.color_effects_enabled,
            shuffle: this.is_shuffling,
            volume: ((_a = this.volume_control) === null || _a === void 0 ? void 0 : _a.value) || '0.75'
        }));
    };
    AudioPlayerController.prototype.load_custom_songs = function () {
        var songs = localStorage.getItem("custom_songs");
        if (songs) {
            this.custom_songs = JSON.parse(songs);
            this.update_song_picker();
        }
    };
    AudioPlayerController.prototype.save_custom_songs = function () {
        localStorage.setItem("custom_songs", JSON.stringify(this.custom_songs));
    };
    AudioPlayerController.prototype.update_song_picker = function () {
        var _this = this;
        if (!this.song_picker)
            return;
        this.song_picker.innerHTML = '';
        SONGS.forEach(function (song) {
            var option = document.createElement("option");
            option.value = song;
            option.textContent = "Song: ".concat(song.split('/').pop());
            _this.song_picker.append(option);
        });
        this.custom_songs.forEach(function (song) {
            var option = document.createElement("option");
            option.value = song;
            option.textContent = "Custom: ".concat(song.split('/').pop());
            _this.song_picker.appendChild(option);
        });
    };
    AudioPlayerController.prototype.apply_font_effects = function () {
        var class_selectors = [
            "epic-tracks-player", "dance", "player-controls",
            "volume-control", "time-display", "track-switcher",
            "options-bar"
        ];
        var id_selectors = [
            "dance-gif", "audio-player", "play-btn",
            "pause-btn", "stop-btn", "volume",
            "e", "p", "i", "cspace", "t", "r", "a", "c", "k", "s",
            "spaceone", "spacetwo", "spacethree", "spacefour",
            "volume", "volume-label", "current-time", "duration",
            "prev", "next", "song-picker", "shuffle-toggle", "theme-toggle"
        ];
        this.font_effect_handles = __spreadArray(__spreadArray([], class_selectors.map(function (cls) { return DomEffects.random_font_for_class(cls, 0.3, EXTENDED_FONTS); }), true), id_selectors.map(function (id) { return DomEffects.random_font_for_id(id, 0.5, EXTENDED_FONTS); }), true);
    };
    AudioPlayerController.prototype.remove_font_effects = function () {
        this.font_effect_handles.forEach(function (handle) { return handle.stop(); });
        this.font_effect_handles = [];
    };
    AudioPlayerController.prototype.apply_color_effects = function () {
        var id_selectors = [
            "dance-gif", "audio-player", "play-btn",
            "pause-btn", "stop-btn", "volume",
            "e", "p", "i", "cspace", "t", "r", "a", "c", "k", "s",
            "spaceone", "spacetwo", "spacethree", "spacefour",
            "volume", "volume-label", "current-time", "duration",
            "prev", "next", "song-picker", "shuffle-toggle", "theme-toggle"
        ];
        this.color_effect_handles = id_selectors.map(function (id) {
            return DomEffects.start_color_change(id, 200);
        });
    };
    AudioPlayerController.prototype.remove_color_effects = function () {
        this.color_effect_handles.forEach(function (handle) { return handle.stop(); });
        this.color_effect_handles = [];
    };
    return AudioPlayerController;
}());
function initialize_effects() {
    function death_to_america() {
        var dta = document.getElementById("death-to-america");
        if (!dta)
            return;
        window.addEventListener("scroll", function () {
            if (dta.style.display !== "block") {
                dta.style.display = "block";
                setTimeout(function () {
                    dta.style.opacity = "1";
                }, 50);
            }
        });
    }
    var audio_controller = new AudioPlayerController();
    var font_effects_toggle = document.getElementById("font-effects-toggle");
    var color_effects_toggle = document.getElementById("color-effects-toggle");
    font_effects_toggle === null || font_effects_toggle === void 0 ? void 0 : font_effects_toggle.addEventListener("click", function () {
        audio_controller.font_effects_enabled = !audio_controller.font_effects_enabled;
        font_effects_toggle.textContent = "Font Effects: ".concat(audio_controller.font_effects_enabled ? 'On' : 'Off');
        if (audio_controller.font_effects_enabled) {
            audio_controller.apply_font_effects();
        }
        else {
            audio_controller.remove_font_effects();
        }
        audio_controller.save_settings();
    });
    color_effects_toggle === null || color_effects_toggle === void 0 ? void 0 : color_effects_toggle.addEventListener("click", function () {
        audio_controller.color_effects_enabled = !audio_controller.color_effects_enabled;
        color_effects_toggle.textContent = "Color Effects: ".concat(audio_controller.color_effects_enabled ? 'On' : 'Off');
        if (audio_controller.color_effects_enabled) {
            audio_controller.apply_color_effects();
        }
        else {
            audio_controller.remove_color_effects();
        }
        audio_controller.save_settings();
    });
    font_effects_toggle && (font_effects_toggle.textContent = "Font Effects: ".concat(audio_controller.font_effects_enabled ? 'On' : 'Off'));
    color_effects_toggle && (color_effects_toggle.textContent = "Color Effects: ".concat(audio_controller.color_effects_enabled ? 'On' : 'Off'));
    audio_controller.init_shuffle_and_theme_btns();
    audio_controller.setup_drag_drop();
    death_to_america();
}
document.addEventListener("DOMContentLoaded", initialize_effects);
