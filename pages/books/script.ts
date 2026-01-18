interface Book {
	title: string;
	url: string;
	image: string;
}

const books: Book[] = [
	{
		title: "One Piece",
		url: "https://en.wikipedia.org/wiki/One_Piece",
		image: "/books/assets/images/onepiece.jpg",
	},
	{
		title: "Dune",
		url: "https://en.wikipedia.org/wiki/Dune_(2021_film)",
		image: "/books/assets/images/dune.jpg",
	},
];

document.addEventListener("DOMContentLoaded", () => {
	render_books();
});

function render_books(): void {
	const books_list = document.querySelector(".books-list ul");

	if (!books_list) {
		console.error("books list element not found");
		return;
	}

	books_list.innerHTML = "";

	books.forEach((book) => {
		const book_card = create_book_card(book);
		books_list.appendChild(book_card);
	});
}

function create_book_card(book: Book): HTMLLIElement {
	const li = document.createElement("li");
	li.className = "book-card";

	const link = document.createElement("a");
	link.className = "book-link";
	link.href = book.url;
	link.textContent = book.title;
	link.target = "_blank";
	link.rel = "noopener noreferrer";

	const img = document.createElement("img");
	img.className = "book-image";
	img.src = book.image;
	img.alt = book.title;
	img.loading = "lazy";

	li.appendChild(link);
	li.appendChild(img);

	return li;
}

function add_book(title: string, url: string, image: string): void {
	books.push({ title, url, image });
	render_books();
}

function rm_book(index: number): void {
	if (index >= 0 && index < books.length) {
		books.splice(index, 1);
		render_books();
	}
}

(window as any).add_book = add_book;
(window as any).rm_book = rm_book;
