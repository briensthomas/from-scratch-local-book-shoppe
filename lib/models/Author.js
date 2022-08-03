const pool = require('../utils/pool');

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
  }

  static async getAllAuthors() {
    const { rows } = await pool.query(
      'SELECT id, name FROM authors'
    );
    return rows.map((row) => new Author(row));
  }

  static async getAuthorById(id) {
    const { rows } = await pool.query(
      `SELECT * FROM authors
        WHERE authors.id = $1
        GROUP BY authors.id`,
      [id]
    );
    return new Author(rows[0]);
  }

  async getBooks() {
    const { rows } = await pool.query(
      `SELECT books.* FROM authors
      LEFT JOIN authors_books on authors.id = authors_books.author_id
      LEFT JOIN books on authors_books.id = books.id
      WHERE authors.id = $1
      GROUP BY authors.id, books.id`,
      [this.id]
    );
    this.books = rows;
    return this;
  }

  static async insert({ name, dob, pob }) {
    const { rows } = await pool.query(
      `INSERT INTO authors 
      (name, dob, pob)
      VALUES ($1, $2, $3)
      RETURNING *;`,
      [name, dob, pob]
    );
    return new Author(rows[0]);
  }
}

module.exports = { Author };
