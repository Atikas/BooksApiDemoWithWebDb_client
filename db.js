
initial_books = [
    { id: 1, title: "Foundation", authors: [1], genres: ["Science Fiction"], year: 1951 },
    { id: 2, title: "The Hobbit", authors: [2], genres: ["Fantasy"], year: 1937 },
    { id: 3, title: "Dune", authors: [3], genres: ["Science Fiction"], year: 1965 },
    { id: 4, title: "I, Robot", authors: [1], genres: ["Science Fiction"], year: 1950 },
    { id: 5, title: "Neuromancer", authors: [4], genres: ["Cyberpunk", "Science Fiction"], year: 1984 },
    { id: 6, title: "Dune: House Atreides", authors: [3, 5], genres: ["Science Fiction"], year: 1999 },
    { id: 7, title: "Dune: The Butlerian Jihad", authors: [3, 5], genres: ["Science Fiction"], year: 2002 },
    { id: 8, title: "Good Omens", authors: [6, 7], genres: ["Fantasy", "Comedy"], year: 1990 },
    { id: 9, title: "The Mote in God's Eye", authors: [8, 9], genres: [], year: 1974 },
    { id: 10, title: "The Turing Option", authors: [10, 11], genres: ["Science Fiction"], year: 1992 },
    { id: 11, title: "The Three-Body Problem", authors: [12], genres: ["Science Fiction"], year: 2008 }
];
initial_authors = [
    { id: 1, name: "Isaac Asimov" },
    { id: 2, name: "J.R.R. Tolkien" },
    { id: 3, name: "Frank Herbert" },
    { id: 4, name: "William Gibson" },
    { id: 5, name: "Brian Herbert" },
    { id: 6, name: "Neil Gaiman" },
    { id: 7, name: "Terry Pratchett" },
    { id: 8, name: "Larry Niven" },
    { id: 9, name: "Jerry Pournelle" },
    { id: 10, name: "Harry Harrison" },
    { id: 11, name: "Marvin Minsky" },
    { id: 12, name: "Cixin Liu" }
]

class SessionStorageDb {



    saveDataToSessionStorageIfNotExist = () => {
        if (!sessionStorage.getItem("db_books")) {
            sessionStorage.setItem("db_books", JSON.stringify(initial_books));
        }
        if (!sessionStorage.getItem("db_authors")) {
            sessionStorage.setItem("db_authors", JSON.stringify(initial_authors));
        }
    }
    clear = () => {
        sessionStorage.removeItem("db_books");
        sessionStorage.removeItem("db_authors");
        this.saveDataToSessionStorageIfNotExist();
    }

    //BOOKS
    getBooks = () => {
        return JSON.parse(sessionStorage.getItem("db_books"));
    }
    getBook = (id) => {
        const books = JSON.parse(sessionStorage.getItem("db_books"));
        return books.find(b => b.id === id);
    }
    createBook = (book) => {
        const books = JSON.parse(sessionStorage.getItem("db_books"));
        book.id = books.sort((a, b) => a.id - b.id).slice(-1)[0].id + 1;
        books.push(book);
        sessionStorage.setItem("db_books", JSON.stringify(books));
        return book.id;
    }
    updateBook = (id, book) => {
        const books = JSON.parse(sessionStorage.getItem("db_books"));
        const index = books.findIndex(b => b.id === id);
        book.id = id;
        books[index] = book;
        sessionStorage.setItem("db_books", JSON.stringify(books));
    }
    deleteBook = (id) => {
        const books = JSON.parse(sessionStorage.getItem("db_books"));
        const index = books.findIndex(b => b.id === id);
        books.splice(index, 1);
        sessionStorage.setItem("db_books", JSON.stringify(books));
    }


    //AUtHORS
    getAuthors = () => {
        return JSON.parse(sessionStorage.getItem("db_authors"));
    }
    getAuthor = (id) => {
        const authors = JSON.parse(sessionStorage.getItem("db_authors"));
        return authors.find(a => a.id === id);
    }
    createAuthor = (author) => {
        const authors = JSON.parse(sessionStorage.getItem("db_authors"));
        author.id = authors.sort((a, b) => a.id - b.id).slice(-1)[0].id + 1;
        authors.push(author);
        sessionStorage.setItem("db_authors", JSON.stringify(authors));
        return author.id;
    }
    updateAuthor = (id, author) => {
        const authors = JSON.parse(sessionStorage.getItem("db_authors"));
        const index = authors.findIndex(a => a.id === id);
        author.id = id;
        authors[index] = author;
        sessionStorage.setItem("db_authors", JSON.stringify(authors));
    }
    deleteAuthor = (id) => {
        const authors = JSON.parse(sessionStorage.getItem("db_authors"));
        const index = authors.findIndex(a => a.id === id);
        authors.splice(index, 1);
        sessionStorage.setItem("db_authors", JSON.stringify(authors));
    }

}