let bookID = 1;
let myLibary = [];

const form = document.getElementById('addbook');
const inputTitle = document.getElementById('btitle');
const inputAuthor = document.getElementById('bauthor');
const inputNumber = document.getElementById('bnumber');
const inputRead = document.getElementById('bread');
const bookslist = document.getElementById('bookslist');
const fieldset = document.querySelector('.fieldset');

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.id = bookID++;
}


form.addEventListener('submit', function (e) {
  e.preventDefault();
  let title = inputTitle.value;
  let author = inputAuthor.value;
  let pages = inputNumber.value;
  let read = inputRead.checked;
  if(title === '', author === '', pages === '') {
    showMessage('alert', 'Please fill in all fields');
    return
  }
  let newBook = new Book(title, author, pages, read);
  addBook(newBook);
  viewAddBook(newBook);
  showMessage('success', 'Book Added.')
  inputTitle.value = "";
  inputAuthor.value = "";
  inputNumber.value = "";
  inputRead.checked = false;
})


bookslist.addEventListener('click', function (e) {
  let target = e.target;
  let targetRow = target.parentElement.parentElement;
  if (target.classList.contains('readmode')) {
    changeRead(targetRow.id);
    let hasRead = target.classList.contains('read');
    target.textContent = hasRead ? 'Not read' : 'Read';
    target.className = hasRead ? 'button readmode notread secondary' : 'button readmode read success';
  } else if (target.classList.contains('deletebook')) {
    deleteBook(targetRow.id);
    targetRow.remove();
    showMessage('success', 'Book removed.')
  }
})

function addBook(book) {
  myLibary.push(book);
}

function deleteBook(id) {
  myLibary.forEach(function (book, index) {
    if (book.id == id) {
      myLibary.splice(index, 1);
    }
  })
}

function changeRead(id) {
  myLibary.forEach(function (book) {
    if (book.id == id) {
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
  readMode.className = book.read ? 'button readmode read success' : 'button readmode notread secondary';
  read.appendChild(readMode);
  row.appendChild(read);
  let remove = document.createElement('td');
  let removeButton = document.createElement('button');
  removeButton.innerHTML = 'Remove Book';
  removeButton.className = 'deletebook button alert';
  remove.appendChild(removeButton);
  row.appendChild(remove);
  bookslist.appendChild(row);
}

function showMessage(className, message) {
  let div = document.createElement('div');
  div.className = `callout ${className}`;
  div.innerHTML = `<h6>${message}</h6>`;
  fieldset.insertBefore(div, form);
  setTimeout(function(){
    document.querySelector('.callout').remove();
  } , 4000)
}
let lorem = new Book('Title', 'authooor', 11134, true);

viewAddBook(lorem);
viewAddBook(lorem);
viewAddBook(lorem);
viewAddBook(lorem);