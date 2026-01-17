var discord_link = document.getElementById("discord-link");
var hard_to_read = document.getElementById("hardtoread");
var alliwantaudio = new Audio("/home/assets/audio/alliwant.mp3");
var is_hard_to_read = false;
var ElRando = /** @class */ (function () {
    function ElRando(container_id, padding) {
        if (padding === void 0) { padding = 10; }
        this.padding = 10;
        this.max_attempts = 100;
        this.existing_elements = [];
        var container = document.getElementById(container_id);
        if (!container) {
            throw new Error("container with ID \"".concat(container_id, "\" not found"));
        }
        this.container = container;
        this.padding = padding;
    }
    ElRando.prototype.intersects = function (bounds_one, bounds_two) {
        return !(bounds_one.right <= bounds_two.left ||
            bounds_one.left >= bounds_two.right ||
            bounds_one.bottom <= bounds_two.top ||
            bounds_one.top >= bounds_two.bottom);
    };
    ElRando.prototype.get_bounds_at_pos = function (el, x, y) {
        var rect = el.getBoundingClientRect();
        return {
            left: x,
            top: y,
            right: x + rect.width,
            bottom: y + rect.height,
            width: rect.width,
            height: rect.height,
        };
    };
    ElRando.prototype.gen_rand_pos = function (el_width, el_height) {
        var container_rect = this.container.getBoundingClientRect();
        var max_x = container_rect.width - el_width - this.padding;
        var max_y = container_rect.height - el_height - this.padding;
        var x = Math.floor(Math.random() * max_x) + this.padding;
        var y = Math.floor(Math.random() * max_y) + this.padding;
        return { x: x, y: y };
    };
    ElRando.prototype.find_valid_pos = function (el) {
        var rect = el.getBoundingClientRect();
        for (var attempt = 0; attempt < this.max_attempts; attempt++) {
            var pos = this.gen_rand_pos(rect.width, rect.height);
            var bounds = this.get_bounds_at_pos(el, pos.x, pos.y);
            var has_collision = false;
            for (var _i = 0, _a = this.existing_elements; _i < _a.length; _i++) {
                var existing_el = _a[_i];
                var existing_rect = existing_el.getBoundingClientRect();
                var container_rect = this.container.getBoundingClientRect();
                var existing_bounds = {
                    left: existing_rect.left - container_rect.left,
                    top: existing_rect.top - container_rect.top,
                    right: existing_rect.right - container_rect.left,
                    bottom: existing_rect.bottom - container_rect.top,
                    width: existing_rect.width,
                    height: existing_rect.height,
                };
                if (this.intersects(bounds, existing_bounds)) {
                    has_collision = true;
                    break;
                }
            }
            if (!has_collision) {
                return pos;
            }
        }
        console.warn("Could not find valid position for element after ".concat(this.max_attempts, " attempts"));
        return null;
    };
    ElRando.prototype.randomize = function () {
        var _this = this;
        var elements = Array.from(this.container.children);
        var container_style = window.getComputedStyle(this.container);
        if (container_style.position === "static") {
            this.container.style.position = "relative";
        }
        this.existing_elements = [];
        elements.forEach(function (el) {
            el.style.position = "absolute";
            var pos = _this.find_valid_pos(el);
            if (pos) {
                el.style.left = "".concat(pos.x, "px");
                el.style.top = "".concat(pos.y, "px");
                _this.existing_elements.push(el);
            }
            else {
                console.warn("Using fallback positioning for element");
            }
        });
    };
    ElRando.prototype.set_max_attempts = function (attempts) {
        this.max_attempts = attempts;
    };
    ElRando.prototype.set_padding = function (padding) {
        this.padding = padding;
    };
    return ElRando;
}());
var ScreenRando = /** @class */ (function () {
    function ScreenRando(padding) {
        if (padding === void 0) { padding = 10; }
        this.elements = [];
        this.padding = 10;
        this.max_attempts = 200;
        this.placed_elements = [];
        this.padding = padding;
    }
    ScreenRando.prototype.intersects = function (bounds_one, bounds_two) {
        return !(bounds_one.right <= bounds_two.left ||
            bounds_one.left >= bounds_two.right ||
            bounds_one.bottom <= bounds_two.top ||
            bounds_one.top >= bounds_two.bottom);
    };
    ScreenRando.prototype.get_bounds_at_pos = function (width, height, x, y) {
        return {
            left: x,
            top: y,
            right: x + width,
            bottom: y + height,
            width: width,
            height: height,
        };
    };
    ScreenRando.prototype.gen_rand_pos = function (el_width, el_height) {
        var max_x = window.innerWidth - el_width - this.padding;
        var max_y = window.innerHeight - el_height - this.padding;
        var x = Math.floor(Math.random() * max_x) + this.padding;
        var y = Math.floor(Math.random() * max_y) + this.padding;
        return { x: x, y: y };
    };
    ScreenRando.prototype.find_valid_pos = function (el) {
        var rect = el.getBoundingClientRect();
        for (var attempt = 0; attempt < this.max_attempts; attempt++) {
            var pos = this.gen_rand_pos(rect.width, rect.height);
            var bounds = this.get_bounds_at_pos(rect.width, rect.height, pos.x, pos.y);
            var has_collision = false;
            for (var _i = 0, _a = this.placed_elements; _i < _a.length; _i++) {
                var placed_bounds = _a[_i];
                if (this.intersects(bounds, placed_bounds)) {
                    has_collision = true;
                    break;
                }
            }
            if (!has_collision) {
                return pos;
            }
        }
        console.warn("Could not find valid position for element after ".concat(this.max_attempts, " attempts"));
        return null;
    };
    ScreenRando.prototype.add_element = function (el) {
        this.elements.push(el);
    };
    ScreenRando.prototype.randomize = function () {
        var _this = this;
        this.placed_elements = [];
        this.elements.forEach(function (el) {
            el.style.position = "fixed";
            el.style.zIndex = "9999";
            var pos = _this.find_valid_pos(el);
            if (pos) {
                el.style.left = "".concat(pos.x, "px");
                el.style.top = "".concat(pos.y, "px");
                var rect = el.getBoundingClientRect();
                _this.placed_elements.push(_this.get_bounds_at_pos(rect.width, rect.height, pos.x, pos.y));
            }
            else {
                console.warn("Using fallback positioning for element");
            }
        });
    };
    ScreenRando.prototype.set_max_attempts = function (attempts) {
        this.max_attempts = attempts;
    };
    ScreenRando.prototype.set_padding = function (padding) {
        this.padding = padding;
    };
    return ScreenRando;
}());
var ImageCarousel = /** @class */ (function () {
    function ImageCarousel(container_id, slides) {
        this.curr_idx = 0;
        this.slide_elements = [];
        var el = document.getElementById(container_id);
        if (!el) {
            throw new Error("element with id \"".concat(container_id, "\" not found"));
        }
        this.container = el;
        this.slides = slides;
        this.init();
    }
    ImageCarousel.prototype.init = function () {
        var _this = this;
        this.container.classList.add("carousel-container");
        var fragment = document.createDocumentFragment();
        this.slides.forEach(function (slide, idx) {
            var slide_el = document.createElement("div");
            slide_el.classList.add("carousel-slide");
            if (idx === 0) {
                slide_el.classList.add("active");
            }
            var img = document.createElement("img");
            img.src = slide.src;
            img.alt = slide.caption;
            img.classList.add("carousel-image");
            if (idx === 0) {
                img.setAttribute("fetchpriority", "high");
            }
            else {
                img.loading = "lazy";
            }
            var caption = document.createElement("div");
            caption.classList.add("carousel-caption");
            caption.textContent = slide.caption;
            slide_el.append(img, caption);
            _this.slide_elements.push(slide_el);
            fragment.appendChild(slide_el);
        });
        this.container.appendChild(fragment);
        this.create_controls();
    };
    ImageCarousel.prototype.create_controls = function () {
        var _this = this;
        var nav = document.createElement("nav");
        nav.classList.add("carousel-nav");
        var prev_btn = document.createElement("button");
        var next_btn = document.createElement("button");
        prev_btn.classList.add("carousel-btn", "carousel-btn-prev");
        prev_btn.setAttribute("aria-label", "Previous slide");
        prev_btn.textContent = "<";
        prev_btn.onclick = function () { return _this.move(-1); };
        next_btn.classList.add("carousel-btn", "carousel-btn-next");
        next_btn.setAttribute("aria-label", "Next slide");
        next_btn.textContent = ">";
        next_btn.onclick = function () { return _this.move(1); };
        nav.append(prev_btn, next_btn);
        this.container.appendChild(nav);
    };
    ImageCarousel.prototype.move = function (direction) {
        this.slide_elements[this.curr_idx].classList.remove("active");
        this.curr_idx =
            (this.curr_idx + direction + this.slides.length) %
                this.slides.length;
        this.slide_elements[this.curr_idx].classList.add("active");
    };
    return ImageCarousel;
}());
function randomize_case(input) {
    return Array.from(input)
        .map(function (char) {
        return Math.random() < 0.5 ? char.toLowerCase() : char.toUpperCase();
    })
        .join("");
}
function animate_title(base_title, interval_ms) {
    if (interval_ms === void 0) { interval_ms = 200; }
    var interval_id = setInterval(function () {
        document.title = randomize_case(base_title);
    }, interval_ms);
    return function () {
        clearInterval(interval_id);
        document.title = base_title;
    };
}
var stop_title_anim = animate_title("the motherfucking bearodactyl", 200);
var things_i_like = [
    { src: "/home/assets/images/reggie.png", caption: "Reggie (of course)" },
    { src: "/home/assets/images/rust.gif", caption: "Rust (the language)" },
    { src: "/home/assets/images/spaghetti.png", caption: "Spaghetti" },
    { src: "/home/assets/images/op.png", caption: "One Piece" },
];
document.addEventListener("DOMContentLoaded", function () {
    new ImageCarousel("things-i-like", things_i_like);
    // Randomize sidebar badges across the entire screen
    var sidebar_links = document.querySelectorAll(".sidebar-links a");
    if (sidebar_links.length > 0) {
        var screen_randomizer_1 = new ScreenRando(15);
        sidebar_links.forEach(function (link) {
            screen_randomizer_1.add_element(link);
        });
        screen_randomizer_1.randomize();
    }
});
discord_link === null || discord_link === void 0 ? void 0 : discord_link.addEventListener("click", function () {
    navigator.clipboard.writeText("@thebearodactyl");
});
function set_css_var(v, val) {
    document.documentElement.style.setProperty(v, val);
}
hard_to_read === null || hard_to_read === void 0 ? void 0 : hard_to_read.addEventListener("click", function () {
    is_hard_to_read = !is_hard_to_read;
    if (is_hard_to_read) {
        alliwantaudio.play();
        set_css_var("--bg-color", "#B0BF1A");
        set_css_var("--text-color", "#2E6F40");
        set_css_var("--text-size", "1px");
    }
    else {
        alliwantaudio.pause();
        set_css_var("--bg-color", "#191724");
        set_css_var("--text-color", "#E0DEF4");
        set_css_var("--text-size", "16px");
    }
});
