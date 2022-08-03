const pool = require('../utils/pool');
const { Book } = require('./Book');

class Author {
  id;
  name;
  dob;
  pob;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.dob = row.dob;
    this.pob = row.pob;
    this.books = 
      row.books.length > 0 ? row.books.map((book) => new Book(book)) : [];
  }

  static async getAllAuthors() {
    const { rows } = await pool.query(
      'SELECT id, name FROM authors'
    );
    return rows.map((row) => new Author(row));
  }

  static async getAuthorById(id) {
    const { rows } = await pool.query(
      `SELECT authors.*,
        json_agg(to_jsonb(books)) as books from authors
        LEFT JOIN authors_books on authors.id = authors_books.author_id
        LEFT JOIN books on authors_books.id = books.id
        WHERE authors.id = $1
        GROUP BY authors.id`,
      [id]
    );
    console.log(rows[0].books);
    return new Author(rows[0]);

  }
}

module.exports = { Author };
