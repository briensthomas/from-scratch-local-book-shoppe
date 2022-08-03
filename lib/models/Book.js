const pool = require('../utils/pool');

class Book { 
  id;
  title;
  released;

  constructor(row) {
    this.id = row.id;
    this.title = row.title;
    this.released = row.released;
  }
  static async getAllBooks() {
    const { rows } = await pool.query(
      'SELECT id, title, released FROM books'
    );
    return rows.map((row) => new Book(row));
  }

  static async getBookById(id) {
    const { rows } = await pool.query(
      `SELECT * FROM books
      WHERE books.id = $1
      GROUP BY books.id`,
      [id]
    );
    return new Book(rows[0]);
  }

  async getAuthors() {
    const { rows } = await pool.query(
      `SELECT authors.* FROM books
      LEFT JOIN authors_books on books.id = authors_books.book_id
      LEFT JOIN authors on authors_books.id = authors.id
      WHERE books.id = $1
      GROUP BY authors.id, books.id`,
      [this.id]
    );
    this.authors = rows;
    return this;
  }

  static async insert({ title, released }) {
    const { rows } = await pool.query(
      `INSERT INTO books
      (title, released)
      VALUES ($1, $2)
      RETURNING *;`,
      [title, released]
    );
    return new Book(rows[0]);
  }
}

module.exports = { Book };
