let bookID = 1;
let myLibary = [];

const form = document.getElementById('addbook');
const inputTitle = document.getElementById('btitle');
const inputAuthor = document.getElementById('bauthor');
const inputNumber = document.getElementById('bnumber');
const inputRead = document.getElementById('bread');
const bookslist = document.getElementById('bookslist');

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.id = bookID++;
}


form.addEventListener('submit', function(e){
  let title = inputTitle.value;
  let author = inputAuthor.value;
  let pages = inputNumber.value;
  let read = inputRead.checked;
  let newBook = new Book(title, author, pages, read);
  addBook(newBook);
  viewAddBook(newBook);
  inputTitle.value = "";
  inputAuthor.value = "";
  inputNumber.value = "";
  inputRead.checked = false;
  e.preventDefault();
})


bookslist.addEventListener('click', function(e){
  let target = e.target;
  let targetRow = target.parentElement.parentElement;
  if (target.classList.contains('readmode')) {
    changeRead(targetRow.id);
    let hasRead = target.classList.contains('read');
    target.textContent = hasRead ? 'Not read' : 'Read';
    target.className = hasRead ? 'readmode notread' : 'readmode read';

    

  } else if (target.classList.contains('deletebook')) {
    deleteBook(targetRow.id);
    targetRow.remove();
  }

})



function addBook(book) {
  myLibary.push(book);
  
}

function deleteBook(id) {
  myLibary.forEach(function(book, index) {
    if(book.id == id) {
      myLibary.splice(index, 1);
    }
  })
}

function changeRead(id) {
  myLibary.forEach(function(book) {
    if(book.id == id) {
      book.read = !book.read;
    }
  })
}

function viewAddBook(book) {
  let row = document.createElement('tr');
  row.id = book.id;

  let title = document.createElement('td');
  title.textContent = book.title;
  row.appendChild(title);

  let author = document.createElement('td');
  author.textContent = book.author;
  row.appendChild(author);

  let pages = document.createElement('td');
  pages.textContent = book.pages;
  row.appendChild(pages);

  let read = document.createElement('td');
  let readMode = document.createElement('button');
  readMode.textContent = book.read ? 'Read' : 'Not read';
  readMode.className = book.read ? 'readmode read' : 'readmode notread';
  read.appendChild(readMode);
  row.appendChild(read);

  let remove = document.createElement('td');
  let remodeButton = document.createElement('button');
  remodeButton.textContent = 'Remove Book';
  remodeButton.className = 'deletebook';
  remove.appendChild(remodeButton);
  row.appendChild(remove);

  bookslist.appendChild(row);
}