let bookID = 1;
let myLibary = [];

const form = document.getElementById('addbook');
const inputTitle = document.getElementById('btitle');
const inputAuthor = document.getElementById('bauthor');
const inputNumber = document.getElementById('bnumber');
const inputRead = document.getElementById('bread');


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
  let book = new Book(title, author, pages, read);

  addBook(book);
  e.preventDefault();
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

console.log(myLibary);