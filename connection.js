//const uri = "https://localhost:7025/dataHub";
const uri = "https://atikas-space-exploration-api-abbng4buggadcxav.northeurope-01.azurewebsites.net/dataHub";

const connection = new signalR.HubConnectionBuilder()
    .withUrl(uri)
    .build();

const startConnection = () => connection.start().then(() => {
    const connectionId = connection.connectionId;
    const connectionIdSpan = document.getElementById("connection-id");
    const connectionIdContainer = document.getElementById("connection-id-container");
    const connectBtn = document.getElementById("connect-btn");
    connectionIdSpan.textContent = `${connectionId}`;
    connectionIdContainer.classList.remove("alert-secondary");
    connectionIdContainer.classList.remove("alert-danger");
    connectionIdContainer.classList.add("alert-success");
    connectBtn.style.display = "none";
}).catch(err => console.error(err));


connection.onclose(() => {
    const connectionIdSpan = document.getElementById("connection-id");
    const connectionIdContainer = document.getElementById("connection-id-container");
    const connectBtn = document.getElementById("connect-btn");
    connectionIdSpan.textContent = "Connection lost";
    connectionIdContainer.classList.remove("alert-secondary");
    connectionIdContainer.classList.remove("alert-success");
    connectionIdContainer.classList.add("alert-danger");
    connectBtn.style.display = "inline-block";
});


//####### Books #######
connection.on("GetBooks", () => {
    sendAllBooksData();
});
connection.on("GetBook", (id) => {
    sendOneBookData(id);
});
connection.on("PostBook", (book) => {
    const id = sessionStorageDb.createBook(book);
    displayDatabase();
    sendOneBookData(id);
});
connection.on("PutBook", (id, book) => {
    sessionStorageDb.updateBook(id, book);
    displayDatabase();
});
connection.on("DeleteBook", (id) => {
    sessionStorageDb.deleteBook(id);
    displayDatabase();
});
const sendAllBooksData = () => {
    const books = sessionStorageDb.getBooks();
    connection.invoke("AllBooksDataMessage", connection.connectionId, books).catch(err => console.error(err));
}
const sendOneBookData = (id) => {
    const book = sessionStorageDb.getBook(id);
    connection.invoke("OneBookDataMessage", connection.connectionId, book).catch(err => console.error(err));
}

//####### Authors #######
connection.on("GetAuthors", () => {
    sendAllAuthorsData();
});
connection.on("GetAuthor", (id) => {
    sendOneAuthorData(id);
});
connection.on("PostAuthor", (author) => {
    const id = sessionStorageDb.createAuthor(author);
    displayDatabase();
    sendOneAuthorData(id);
});
connection.on("PutAuthor", (id, author) => {
    sessionStorageDb.updateAuthor(id, author);
    displayDatabase();
});
connection.on("DeleteAuthor", (id) => {
    sessionStorageDb.deleteAuthor(id);
    displayDatabase();
});
const sendAllAuthorsData = () => {
    const authors = sessionStorageDb.getAuthors();
    connection.invoke("AllAuthorsDataMessage", connection.connectionId, authors).catch(err => console.error(err));
}
const sendOneAuthorData = (id) => {
    const author = sessionStorageDb.getAuthor(id);
    connection.invoke("OneAuthorDataMessage", connection.connectionId, author).catch(err => console.error(err));
}
