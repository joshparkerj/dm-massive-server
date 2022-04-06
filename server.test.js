const axios = require('axios');

const server = require('./server');

const port = require('./port.json');

jest.mock('./postgres-url.json', () => '', { virtual: true });

const testData = {
  username: 'test',
  email: 'fake@email.co',
};

let serverInstance;

beforeAll(() => { serverInstance = server(); serverInstance.start(); });

afterAll(() => { serverInstance.stop(); });

it('should respond', (done) => {
  axios.post(`http://localhost:${port}/add`, testData)
    .then(({ status }) => {
      if (status === 200) {
        done();
      } else {
        throw new Error('wrong status');
      }
    });
});

it('should give test data back', (done) => {
  axios.get(`http://localhost:${port}/get-data`)
    .then(({ data }) => {
      if (data.find(({ username, email }) => (
        username === testData.username
        && email === testData.email
      ))) {
        done();
      } else {
        throw new Error('missing test data');
      }
    });
});
