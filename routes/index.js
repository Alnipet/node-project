const express = require('express');
const router = express.Router();
const store = require('../store/index');
const fileMulter = require('../middleware/multer');
const Book = require('../store/Book');

router.post('/api/user/login', (req, res) => {
  res.status(201);
  res.json({ id: 1, mail: 'test@mail.ru' });
});

router.get('/api/books', (req, res) => {
  res.render('pages/index', {
    books: store.books,
  });
});

router.get('/api/books/create', (req, res) => {
  res.render('pages/create');
});

router.get('/api/books/:id', (req, res) => {
  const { books } = store;
  const { id } = req.params;
  const idx = books.findIndex(el => el.id === id);

  if (idx === -1) {
    res.status(404);
    return res.json('404 | book is not found');
  }

  res.render('pages/view', {
    bookInfo: books[idx],
  });
});

router.get('/api/books/:id/update', (req, res) => {
  const { books } = store;
  const { id } = req.params;
  const idx = books.findIndex(el => {
    return el.id === id;
  });

  if (idx === -1) {
    res.status(404);
    return res.json('404 | book is not found');
  }

  res.render('pages/update', {
    bookInfo: books[idx],
  });
});

router.get('/api/books/:id/download', (req, res) => {
  const { books } = store;
  const { id } = req.params;
  const book = books.find(el => el.id === id);

  if (!book) {
    res.status(404);
    return res.json('404 | book is not found');
  }

  res.download(book.fileBook);
});

router.post('/api/books/create', fileMulter.single('book-file'), (req, res) => {
  if (req.file) {
    const { books } = store;
    const { title, description, authors, favorite, fileCover } = req.body;
    const fileName = req.file.filename;
    const fileBook = req.file.path;

    const newBook = new Book(title, description, authors, favorite, fileCover, fileName, fileBook);

    books.push(newBook);

    res.redirect(301, `/api/books`);
  }

  res.json();
});

router.post('/api/books/:id/update', fileMulter.single('book-file'), (req, res) => {
  const { books } = store;
  const { id } = req.params;

  const idx = books.findIndex(el => el.id === id);

  if (idx === -1) {
    res.status(404);
    return res.json('404 | book is not found');
  }

  const { title, description, authors, favorite, fileCover } = req.body;
  const fileName = req.file?.filename ? req.file.filename : books[idx].fileName;
  const fileBook = req.file?.path ? req.file.path : books[idx].fileBook;

  books[idx] = {
    ...books[idx],
    title,
    description,
    authors,
    favorite,
    fileCover,
    fileName,
    fileBook,
  };

  res.redirect(301, `/api/books`);
});

router.post('/api/books/:id/delete', (req, res) => {
  const { books } = store;
  const { id } = req.params;
  const idx = books.findIndex(el => el.id === id);

  if (idx === -1) {
    res.status(404);
    return res.json('404 | book is not found');
  }

  books.splice(idx, 1);

  res.redirect(301, `/api/books`);
});

module.exports = router;
