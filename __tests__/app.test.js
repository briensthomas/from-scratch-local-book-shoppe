const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('backend-express-template routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('#POST /authors should add a new author', async () => {
    const res = await request(app).post('/authors').send({ 
      name: 'Brandon Sanderson',
      dob: '12/19/1975',
      pob: 'Lincoln, NE', });

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      id: expect.any(String),
      name: expect.any(String),
      dob: expect.any(String),
      pob: expect.any(String),
    });
  });

  it('#GET /authors should return an author\'s id and name', async () => {
    const res = await request(app).get('/authors');
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(5);
    expect(res.body[0]).toEqual({
      id: '1',
      name: 'Will Wight'
    });
  });

  it('#POST /books/ should add a new book', async () => {
    const res = await request(app).post('/books/').send({
      title: 'Rhythm of War',
      released: 2020
    });
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      id: expect.any(String),
      title: expect.any(String),
      released: expect.any(Number),
    });
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

it('#GET /books/:id should return a specific books it, title, released date and authors array', async () => {
  const res = await request(app).get('/books/1');
  expect(res.body).toEqual({
    id: expect.any(String),
    title: expect.any(String),
    released: expect.any(Number),
    authors: expect.any(Array),
  });
});
afterAll(() => {
  pool.end();
});



