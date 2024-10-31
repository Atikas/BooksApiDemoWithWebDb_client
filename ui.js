
const displayDatabase = () => {
    fillBooksTable();
    fillAuthorsTable();
}

const resetDatabase = () => {
    sessionStorageDb.clear();
    displayDatabase();
}



const fillBooksTable = () => {
    let books = sessionStorageDb.getBooks();
    let authors = sessionStorageDb.getAuthors();
    const booksTable = document.querySelector("#books-table-tbody");
    if (booksTable) 
        booksTable.remove();
    
    const table = document.querySelector("#books-table");
    const tbody = document.createElement("tbody");
    tbody.id = "books-table-tbody";
    tbody.innerHTML = books.map(book => {
      
        return `<tr>
            <td>${book.id}</td>
            <td>${book.title}</td>
            <td>${book.authors.map(id => authors.find((a) => a.id == id).name).join(", ")}</td>
            <td>${book.genres}</td>
            <td>${book.year}</td>
        </tr>`;
    }).join("");
    table.appendChild(tbody);
};

const fillAuthorsTable = () => {
    let authors = sessionStorageDb.getAuthors();
    const authorsTable = document.querySelector("#authors-table-tbody");
    if (authorsTable) 
        authorsTable.remove();
    
    const table = document.querySelector("#authors-table");
    const tbody = document.createElement("tbody");
    tbody.id = "authors-table-tbody";
    tbody.innerHTML = authors.map(author => {
        return `<tr>
            <td>${author.id}</td>
            <td>${author.name}</td>
        </tr>`;
    }).join("");
    table.appendChild(tbody);
};