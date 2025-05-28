const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  return res.send(books);
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  let isbn = req.params.isbn
  let book = books[isbn]  //assuming the isbn is the books object key at level 1. Would have liked a property...
  if (book) {
        return res.send(book);
  } else {
        return res.status(404).send("Book isbn " + isbn + " not found");
  }
  
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
    let author = req.params.author
    for (let key in books) {
        let book = books[key];
        if (book.author==author) {
            return res.send(book)   //Yeah...it should really return an array, but the task says "THE BOOK" (not a plural) so returning the first one
        }
    }
    return res.status(404).send("Book having author " + author + " not found");
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  let title = req.params.title
  for (let key in books) {
      let book = books[key];
      if (book.title==title) {
          return res.send(book)   
      }
  }
  return res.status(404).send("Book titled " + title + " not found");
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
    let isbn = req.params.isbn
    let book = books[isbn]  //assuming the isbn is the books object key at level 1. Would have liked a property...
    if (book) {
          return res.send(book.reviews);
    } else {
          return res.status(404).send("Book isbn " + isbn + " not found");
    }
});

module.exports.general = public_users;
