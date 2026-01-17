const discord_link = document.getElementById("discord-link");
const hard_to_read = document.getElementById("hardtoread");
const alliwantaudio = new Audio("/home/assets/audio/alliwant.mp3");
var is_hard_to_read = false;

interface SlideData {
	src: string;
	caption: string;
}

interface ElementBounds {
	left: number;
	top: number;
	right: number;
	bottom: number;
	width: number;
	height: number;
}

interface RandPos {
	x: number;
	y: number;
}

class ElRando {
	private container: HTMLElement;
	private padding: number = 10;
	private max_attempts: number = 100;
	private existing_elements: HTMLElement[] = [];

	constructor(container_id: string, padding: number = 10) {
		const container = document.getElementById(container_id);

		if (!container) {
			throw new Error(`container with ID "${container_id}" not found`);
		}

		this.container = container;
		this.padding = padding;
	}

	private intersects(
		bounds_one: ElementBounds,
		bounds_two: ElementBounds,
	): boolean {
		return !(
			bounds_one.right <= bounds_two.left ||
			bounds_one.left >= bounds_two.right ||
			bounds_one.bottom <= bounds_two.top ||
			bounds_one.top >= bounds_two.bottom
		);
	}

	private get_bounds_at_pos(
		el: HTMLElement,
		x: number,
		y: number,
	): ElementBounds {
		const rect = el.getBoundingClientRect();
		return {
			left: x,
			top: y,
			right: x + rect.width,
			bottom: y + rect.height,
			width: rect.width,
			height: rect.height,
		};
	}

	private gen_rand_pos(el_width: number, el_height: number): RandPos {
		const container_rect = this.container.getBoundingClientRect();
		const max_x = container_rect.width - el_width - this.padding;
		const max_y = container_rect.height - el_height - this.padding;
		const x = Math.floor(Math.random() * max_x) + this.padding;
		const y = Math.floor(Math.random() * max_y) + this.padding;

		return { x, y };
	}

	private find_valid_pos(el: HTMLElement): RandPos | null {
		const rect = el.getBoundingClientRect();

		for (let attempt = 0; attempt < this.max_attempts; attempt++) {
			const pos = this.gen_rand_pos(rect.width, rect.height);
			const bounds = this.get_bounds_at_pos(el, pos.x, pos.y);
			let has_collision = false;

			for (const existing_el of this.existing_elements) {
				const existing_rect = existing_el.getBoundingClientRect();
				const container_rect = this.container.getBoundingClientRect();

				const existing_bounds: ElementBounds = {
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
		console.warn(
			`Could not find valid position for element after ${this.max_attempts} attempts`,
		);
		return null;
	}

	public randomize(): void {
		const elements = Array.from(this.container.children) as HTMLElement[];
		const container_style = window.getComputedStyle(this.container);

		if (container_style.position === "static") {
			this.container.style.position = "relative";
		}

		this.existing_elements = [];

		elements.forEach((el) => {
			el.style.position = "absolute";

			const pos = this.find_valid_pos(el);

			if (pos) {
				el.style.left = `${pos.x}px`;
				el.style.top = `${pos.y}px`;
				this.existing_elements.push(el);
			} else {
				console.warn("Using fallback positioning for element");
			}
		});
	}

	public set_max_attempts(attempts: number): void {
		this.max_attempts = attempts;
	}

	public set_padding(padding: number): void {
		this.padding = padding;
	}
}

class ScreenRando {
	private elements: HTMLElement[] = [];
	private padding: number = 10;
	private max_attempts: number = 200;
	private placed_elements: ElementBounds[] = [];

	constructor(padding: number = 10) {
		this.padding = padding;
	}

	private intersects(
		bounds_one: ElementBounds,
		bounds_two: ElementBounds,
	): boolean {
		return !(
			bounds_one.right <= bounds_two.left ||
			bounds_one.left >= bounds_two.right ||
			bounds_one.bottom <= bounds_two.top ||
			bounds_one.top >= bounds_two.bottom
		);
	}

	private get_bounds_at_pos(
		width: number,
		height: number,
		x: number,
		y: number,
	): ElementBounds {
		return {
			left: x,
			top: y,
			right: x + width,
			bottom: y + height,
			width: width,
			height: height,
		};
	}

	private gen_rand_pos(el_width: number, el_height: number): RandPos {
		const max_x = window.innerWidth - el_width - this.padding;
		const max_y = window.innerHeight - el_height - this.padding;
		const x = Math.floor(Math.random() * max_x) + this.padding;
		const y = Math.floor(Math.random() * max_y) + this.padding;

		return { x, y };
	}

	private find_valid_pos(el: HTMLElement): RandPos | null {
		const rect = el.getBoundingClientRect();

		for (let attempt = 0; attempt < this.max_attempts; attempt++) {
			const pos = this.gen_rand_pos(rect.width, rect.height);
			const bounds = this.get_bounds_at_pos(
				rect.width,
				rect.height,
				pos.x,
				pos.y,
			);
			let has_collision = false;

			for (const placed_bounds of this.placed_elements) {
				if (this.intersects(bounds, placed_bounds)) {
					has_collision = true;
					break;
				}
			}

			if (!has_collision) {
				return pos;
			}
		}
		console.warn(
			`Could not find valid position for element after ${this.max_attempts} attempts`,
		);
		return null;
	}

	public add_element(el: HTMLElement): void {
		this.elements.push(el);
	}

	public randomize(): void {
		this.placed_elements = [];

		this.elements.forEach((el) => {
			el.style.position = "fixed";
			el.style.zIndex = "9999";

			const pos = this.find_valid_pos(el);

			if (pos) {
				el.style.left = `${pos.x}px`;
				el.style.top = `${pos.y}px`;

				const rect = el.getBoundingClientRect();
				this.placed_elements.push(
					this.get_bounds_at_pos(
						rect.width,
						rect.height,
						pos.x,
						pos.y,
					),
				);
			} else {
				console.warn("Using fallback positioning for element");
			}
		});
	}

	public set_max_attempts(attempts: number): void {
		this.max_attempts = attempts;
	}

	public set_padding(padding: number): void {
		this.padding = padding;
	}
}

class ImageCarousel {
	private container: HTMLElement;
	private slides: SlideData[];
	private curr_idx: number = 0;
	private slide_elements: HTMLElement[] = [];

	constructor(container_id: string, slides: SlideData[]) {
		const el = document.getElementById(container_id);

		if (!el) {
			throw new Error(`element with id "${container_id}" not found`);
		}

		this.container = el;
		this.slides = slides;
		this.init();
	}

	private init(): void {
		this.container.classList.add("carousel-container");
		const fragment = document.createDocumentFragment();

		this.slides.forEach((slide, idx) => {
			const slide_el = document.createElement("div");
			slide_el.classList.add("carousel-slide");

			if (idx === 0) {
				slide_el.classList.add("active");
			}

			const img = document.createElement("img");
			img.src = slide.src;
			img.alt = slide.caption;
			img.classList.add("carousel-image");

			if (idx === 0) {
				img.setAttribute("fetchpriority", "high");
			} else {
				img.loading = "lazy";
			}

			const caption = document.createElement("div");
			caption.classList.add("carousel-caption");
			caption.textContent = slide.caption;

			slide_el.append(img, caption);
			this.slide_elements.push(slide_el);
			fragment.appendChild(slide_el);
		});

		this.container.appendChild(fragment);
		this.create_controls();
	}

	private create_controls(): void {
		const nav = document.createElement("nav");
		nav.classList.add("carousel-nav");

		const prev_btn = document.createElement("button");
		const next_btn = document.createElement("button");

		prev_btn.classList.add("carousel-btn", "carousel-btn-prev");
		prev_btn.setAttribute("aria-label", "Previous slide");
		prev_btn.textContent = "<";
		prev_btn.onclick = () => this.move(-1);

		next_btn.classList.add("carousel-btn", "carousel-btn-next");
		next_btn.setAttribute("aria-label", "Next slide");
		next_btn.textContent = ">";
		next_btn.onclick = () => this.move(1);

		nav.append(prev_btn, next_btn);
		this.container.appendChild(nav);
	}

	private move(direction: number): void {
		this.slide_elements[this.curr_idx].classList.remove("active");

		this.curr_idx =
			(this.curr_idx + direction + this.slides.length) %
			this.slides.length;

		this.slide_elements[this.curr_idx].classList.add("active");
	}
}

function randomize_case(input: string): string {
	return Array.from(input)
		.map((char) =>
			Math.random() < 0.5 ? char.toLowerCase() : char.toUpperCase(),
		)
		.join("");
}

function animate_title(
	base_title: string,
	interval_ms: number = 200,
): () => void {
	const interval_id: ReturnType<typeof setInterval> = setInterval(() => {
		document.title = randomize_case(base_title);
	}, interval_ms);

	return () => {
		clearInterval(interval_id);
		document.title = base_title;
	};
}

const stop_title_anim = animate_title("the motherfucking bearodactyl", 200);

const things_i_like: SlideData[] = [
	{ src: "/home/assets/images/reggie.png", caption: "Reggie (of course)" },
	{ src: "/home/assets/images/rust.gif", caption: "Rust (the language)" },
	{ src: "/home/assets/images/spaghetti.png", caption: "Spaghetti" },
	{ src: "/home/assets/images/op.png", caption: "One Piece" },
];

document.addEventListener("DOMContentLoaded", () => {
	new ImageCarousel("things-i-like", things_i_like);

	// Randomize sidebar badges across the entire screen
	const sidebar_links = document.querySelectorAll(".sidebar-links a");
	if (sidebar_links.length > 0) {
		const screen_randomizer = new ScreenRando(15);
		sidebar_links.forEach((link) => {
			screen_randomizer.add_element(link as HTMLElement);
		});
		screen_randomizer.randomize();
	}
});

discord_link?.addEventListener("click", () => {
	navigator.clipboard.writeText("@thebearodactyl");
});

function set_css_var(v: string, val: string): void {
	document.documentElement.style.setProperty(v, val);
}

hard_to_read?.addEventListener("click", () => {
	is_hard_to_read = !is_hard_to_read;

	if (is_hard_to_read) {
		alliwantaudio.play();
		set_css_var("--bg-color", "#B0BF1A");
		set_css_var("--text-color", "#2E6F40");
		set_css_var("--text-size", "1px");
	} else {
		alliwantaudio.pause();
		set_css_var("--bg-color", "#191724");
		set_css_var("--text-color", "#E0DEF4");
		set_css_var("--text-size", "16px");
	}
});
