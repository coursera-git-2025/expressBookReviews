const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
    const username = req.body.username;
    const password = req.body.password;

    // Check if both username and password are provided
    if (username && password) {
        // Check if the user does not already exist
        if (!isValid(username)) {
            // Add the new user to the users array
            users.push({"username": username, "password": password});
            return res.status(200).json({message: "User successfully registered. Now you can login"});
        } else {
            return res.status(404).json({message: "User already exists!"});
        }
    }
    // Return error if username or password is missing
    return res.status(404).json({message: "Unable to register user."});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  let p = new Promise((resolve,reject) => {
    setTimeout(() => {
        console.log("insettimeout")
        let r = res.send(books)
        resolve(r)
    },2000)
  })
  p.then(()=>{console.log("promise resolved")})
  return p;
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  let isbn = req.params.isbn
  let p = new Promise((resolve,reject) => {
    setTimeout(() => {
        console.log("insettimeout")
        let book = books[isbn]  //assuming the isbn is the books object key at level 1. Would have liked a property...
        let r;
        if (book) {
                r = res.send(book);
        } else {
                r = res.status(404).send("Book isbn " + isbn + " not found");
        }
        resolve(r) 
    },2000)
  })
  p.then(()=>{console.log("promise resolved")})
  return p;  //yes, I know it's not really useful to return anything here, but well, at least the info would be transmitted
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
    let author = req.params.author
    let p = new Promise((resolve,reject) => {
        setTimeout(() => {
            console.log("insettimeout")
            var bookarr = [];
            for (let key in books) {
                let book = books[key];
                if (book.author==author) {
                    bookarr.push(book)   
                }
            }
            let r;
            if (bookarr.length==0) {
                r = res.status(404).send("Book having author " + author + " not found")
            } else {
                r = res.send(bookarr[0])//Yeah...it should really return an array, but the task says "the BOOK" (not a plural) so returning the first one
            }
            
            resolve(r) 
        },2000)
      })
      p.then(()=>{console.log("promise resolved")})
    
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  let title = req.params.title
  let p = new Promise((resolve,reject) => {
    setTimeout(() => {
        console.log("insettimeout")
        var bookarr = [];
        for (let key in books) {
            let book = books[key];
            if (book.title==title) {
                bookarr.push(book)   
            }
        }
        let r;
        if (bookarr.length==0) {
            r = res.status(404).send("Book titled " + title + " not found");
        } else {
            r = res.send(bookarr[0])//Yeah...it should really return an array, but the task says "the BOOK" (not a plural) so returning the first one
        }
        
        resolve(r) 
    },2000)
  })
  p.then(()=>{console.log("promise resolved")})
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
