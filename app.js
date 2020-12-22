const http = require('http');
const express = require("express");
const bodyParser = require('body-parser');
const fs = require('fs');

// config
const HOST_NAME = '127.0.0.1';
const PORT = 3000;

// data stores
const libraryData = fs.readFileSync('library.json');
const library = JSON.parse(libraryData);
const requests = new Set();

// helper functions
const bookHasTitle = title => book => book.title === title;
const bookHasId = id => book => book.id === id;
const isValidEmail = (email) => {
  if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)) {
    return true;
  }
  return false;
}

// data store api
const requestBook = (title, email) => {
  if (!isValidEmail(email)) {
    return 'Please enter a valid email address.';
  }
  const book = library.find(bookHasTitle(title));
  if (!book) {
    return 'Sorry - that book is not registered in the library.';
  }
  const available = !requests.has(book);
  requests.add(book);
  return {
    ...book,
    available,
    timestamp: (new Date()).toISOString(),
  };
};

const deleteRequest = (id) => {
  const book = library.find(bookHasId(id));
  if (!book) {
    return 'That book is not registered in the library - no requests to delete.';
  }
  requests.delete(book);
  return {};
}

const getRequest = (id) => {
  if (!id) {
    return Array.from(requests);
  }
  const book = library.find(bookHasId(id));
  if (!book) {
    return 'That book is not registered in the library, so there are no requests for it.';
  }
  if (!requests.has(book)) {
    return `No requests currently for book with id ${id}.`;
  }
  return book;
};

// express app
const app = express();

app.use(bodyParser.json());

app.get("/", function(req, res) {
  res.send('Welcome to the Library API. See the README for testing instructions.');
});

app.post("/request", (req, res) => {
  const {
    email,
    title
  } = req.body || {};
  if (!email || !title) {
    res.send('Error - Please specify both "email" and "title" fields in your request.');
    return;
  }
  res.send(requestBook(title, email));
});

app.get("/request", (req, res) => {
  res.send(getRequest());
});

app.get("/request/:id", (req, res) => {
  res.send(getRequest(parseInt(req.params.id)));
});

app.delete("/request/:id", (req, res) => {
  res.send(deleteRequest(parseInt(req.params.id)));
});

app.listen(PORT, () => {
  console.log(`library-api server is running at ${HOST_NAME} on port ${PORT}`);
});
