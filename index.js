const express = require('express');
const { v4: uuid } = require('uuid');

const PORT = process.env.port || 3001;

const app = express();

class Book {
  constructor(
    title = '',
    description = '',
    authors = '',
    favorite = 'Нет',
    fileCover = '',
    fileName = '',
    id = uuid()
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.authors = authors;
    this.favorite = favorite;
    this.fileCover = fileCover;
    this.fileName = fileName;
  }
}

const store = {
  books: [new Book()],
};

app.use(express.json());

app.post('/api/user/login', (req, res) => {
  res.status(201);
  res.json({ id: 1, mail: 'test@mail.ru' });
});

app.get('/api/books', (req, res) => {
  res.json(store.books);
});

app.get('/api/books/:id', (req, res) => {
  const { books } = store;
  const { id } = req.params;
  const idx = books.findIndex(el => el.id === id);

  if (idx === -1) {
    res.status(404);
    return res.json('404 | book is not found');
  }

  res.json(books[idx]);
});

app.post('/api/books', (req, res) => {
  const { books } = store;
  const { title, description, authors, favorite, fileCover, fileName } = req.body;
  const newBook = new Book(title, description, authors, favorite, fileCover, fileName);

  books.push(newBook);

  res.status(201);
  res.json(newBook);
});

app.put('/api/books/:id', (req, res) => {
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

app.delete('/api/books/:id', (req, res) => {
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

app.listen(PORT);
