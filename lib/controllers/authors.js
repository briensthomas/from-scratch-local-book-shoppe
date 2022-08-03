const { Router } = require('express');
const { Author } = require('../models/Author');

module.exports = Router() 
  .get('/:id', async (req, res) => {
    const author = await Author.getAuthorById(req.params.id);
    await author.getBooks();
    res.json(author);
  })
  .post('/', async (req, res) => {
    const author = await Author.insert(req.body);
    res.json(author);
  })
  .get('/', async (req, res) => {
    const authors = await Author.getAllAuthors();
    res.json(authors);
  });

