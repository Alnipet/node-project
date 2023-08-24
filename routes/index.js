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
  res.json(store.books);
});

router.get('/api/books/:id', (req, res) => {
  const { books } = store;
  const { id } = req.params;
  const idx = books.findIndex(el => el.id === id);

  if (idx === -1) {
    res.status(404);
    return res.json('404 | book is not found');
  }

  res.json(books[idx]);
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

router.post('/api/books', fileMulter.single('book-file'), (req, res) => {
  if (req.file) {
    const { books } = store;
    const { title, description, authors, favorite, fileCover } = req.body;
    const fileName = req.file.filename;
    const fileBook = req.file.path;

    const newBook = new Book(title, description, authors, favorite, fileCover, fileName, fileBook);

    books.push(newBook);

    res.status(201);
    res.json(newBook);
  }

  res.json();
});

router.put('/api/books/:id', (req, res) => {
  const { books } = store;
  const { id } = req.params;
  const { title, description, authors, favorite, fileCover, fileName } = req.body;
  const idx = books.findIndex(el => el.id === id);

  if (idx === -1) {
    res.status(404);
    return res.json('404 | book is not found');
  }

  books[idx] = {
    ...books[idx],
    title,
    description,
    authors,
    favorite,
    fileCover,
    fileName,
  };

  res.json(books[idx]);
});

router.delete('/api/books/:id', (req, res) => {
  const { books } = store;
  const { id } = req.params;
  const idx = books.findIndex(el => el.id === id);

  if (idx === -1) {
    res.status(404);
    return res.json('404 | book is not found');
  }

  books.splice(idx, 1);
  res.json('ok');
});

module.exports = router;
