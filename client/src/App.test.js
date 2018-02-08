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

describe('POST /login.php', () => {
  it('admin', async () => {
    await request
      .post('/login.php')
      .set('Accept', 'application/json')
      .send({
        email: 'admin@websterwasps.com',
        password: 'admin'
      })
      .expect(200)
      .expect({
        id: '1',
        firstName: 'Super',
        lastName: 'Admin',
        userRole: 'admin',
        phone: '5852167829',
        email: 'admin@websterwasps.com',
        registered: '2018-01-01 00:00:00',
        lastLogin: '2018-03-01 00:00:00',
        wantsSMS: '1',
        wantsEmails: '1'
      });
  });

  it('dispatcher', async () => {
    await request
      .post('/login.php')
      .send({
        email: 'dispatcher@websterwasps.com',
        password: 'dispatcher'
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .expect({
        id: '2',
        firstName: 'Main',
        lastName: 'Dispatcher',
        userRole: 'dispatcher',
        phone: '5852167819',
        email: 'dispatcher@websterwasps.com',
        registered: '2018-01-01 00:00:00',
        lastLogin: '2018-03-01 00:00:00',
        wantsSMS: '1',
        wantsEmails: '1'
      });
  });

  it('driver', async () => {
    await request
      .post('/login.php')
      .send({
        email: 'driver@websterwasps.com',
        password: 'driver'
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .expect({
        id: '3',
        firstName: 'Main',
        lastName: 'Driver',
        userRole: 'driver',
        phone: '2035254835',
        email: 'driver@websterwasps.com',
        registered: '2018-01-01 00:00:00',
        lastLogin: '2018-03-01 00:00:00',
        wantsSMS: '1',
        wantsEmails: '1'
      });
  });

  it('passenger', async () => {
    await request
      .post('/login.php')
      .set('Accept', 'application/json')
      .send({
        email: 'passanger@websterwasps.com',
        password: 'passanger'
      })
      .expect('Content-Type', /json/)
      .expect(200)
      .expect({
        id: '4',
        firstName: 'Main',
        lastName: 'Passanger',
        userRole: 'passanger',
        phone: '2435254235',
        email: 'passanger@websterwasps.com',
        registered: '2018-01-01 00:00:00',
        lastLogin: '2018-03-01 00:00:00',
        wantsSMS: '1',
        wantsEmails: '1'
      });
  });

  it('With PhoneNumber', async () => {
    await request
      .post('/login.php')
      .send({
        phone: '2435254235',
        password: 'passanger'
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .expect({
        id: '4',
        firstName: 'Main',
        lastName: 'Passanger',
        userRole: 'passanger',
        phone: '2435254235',
        email: 'passanger@websterwasps.com',
        registered: '2018-01-01 00:00:00',
        lastLogin: '2018-03-01 00:00:00',
        wantsSMS: '1',
        wantsEmails: '1'
      });
  });

  it('Invalid login', async () => {
    await request
      .post('/login.php')
      .send({
        email: 'na',
        password: 'na'
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(401);
  });

  it('No data', async () => {
    await request
      .post('/login.php')
      .set('Accept', 'application/json')
      // .expect('Content-Type', /json/)
      .expect(401);
  });
});

describe('ride', () => {
  it('create', async () => {
    await request
      .post('/api/rides.php')
      .send({
        userID: '4',
        apptStart: '2017-03-01 09:00:00',
        apptEnd: '2017-03-01 10:00:00',
        pickupTime: '2017-03-01 08:30:00',
        wheelchairVan: false,
        pickupStreetAddress: '855 publishers parkway',
        pickupCity: 'Webster',
        apptStreetAddress: '45 Webster Commons Blvd #201',
        apptCity: 'Webster'
      })
      .expect(201);
  });
});
