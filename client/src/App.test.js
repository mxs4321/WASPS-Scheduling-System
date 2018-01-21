import Request from 'supertest';

const request = Request('http://localhost:8000');

describe('GET /', () => {
  it('responds with html', async () => {
    await request
      .get('/')
      .expect('Content-Type', /html/)
      .expect(200);
  });
});

describe('GET /api/users.php', () => {
  it('respond with json', async () => {
    await request
      .get('/api/users.php')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);
  });
});
