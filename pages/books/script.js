var books = [
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
document.addEventListener("DOMContentLoaded", function () {
    render_books();
});
function render_books() {
    var books_list = document.querySelector(".books-list ul");
    if (!books_list) {
        console.error("books list element not found");
        return;
    }
    books_list.innerHTML = "";
    books.forEach(function (book) {
        var book_card = create_book_card(book);
        books_list.appendChild(book_card);
    });
}
function create_book_card(book) {
    var li = document.createElement("li");
    li.className = "book-card";
    var link = document.createElement("a");
    link.className = "book-link";
    link.href = book.url;
    link.textContent = book.title;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    var img = document.createElement("img");
    img.className = "book-image";
    img.src = book.image;
    img.alt = book.title;
    img.loading = "lazy";
    li.appendChild(link);
    li.appendChild(img);
    return li;
}
function add_book(title, url, image) {
    books.push({ title: title, url: url, image: image });
    render_books();
}
function rm_book(index) {
    if (index >= 0 && index < books.length) {
        books.splice(index, 1);
        render_books();
    }
}
window.add_book = add_book;
window.rm_book = rm_book;
