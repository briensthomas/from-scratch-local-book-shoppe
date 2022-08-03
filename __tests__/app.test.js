const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('backend-express-template routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('#GET /authors should return an author\'s id and name', async () => {
    const res = await request(app).get('/authors');
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(5);
    expect(res.body[0]).toEqual({
      id: '1',
      name: 'Will Wight'
    });
    // expect(res.body.books[0]).toHaveProperty('id');
  });
  it('#GET /authors/:id should return a specific author\'s name, dob, pob, and books object', async () => {
    const res = await request(app).get('/authors/2');
    expect(res.body).toEqual({
      id: expect.any(String),
      name: expect.any(String),
      dob: expect.any(String),
      pob: expect.any(String),
      books: expect.any(Array),
    });
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


