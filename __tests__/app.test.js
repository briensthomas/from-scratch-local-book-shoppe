const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('backend-express-template routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('#GET /books should return a list of books with their title and released date',
    async () => {
      const res = await request(app).get('/books');
      expect(res.status).toBe(200);
      expect(res.body).toEqual({
        title: expect.any(String),
        year: expect.any(String),
      });
    });
  afterAll(() => {
    pool.end();
  });
});
