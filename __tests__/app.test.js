const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('backend-express-template routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('#GET /books should return a list of books id, title, and released date', async () => {
    const res = await request(app).get('/books');
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(5);
    expect(res.body[0]).toEqual({
      id: '1',
      title: 'Dreadgod',
      released: 2022,
    });
  });
  afterAll(() => {
    pool.end();
  });
});


