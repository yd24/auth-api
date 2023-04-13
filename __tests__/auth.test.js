'use strict';
const server = require('../src/server');
const { users } = require('../src/auth/models');
const base64 = require('base-64');
const supertest = require('supertest');
const request = supertest(server.app);

beforeAll( async() => {
  await users.model.sync();
});

afterAll( async() => {
  await users.model.drop();
});

describe('Testing auth', () => {
  let testUser = {};
  let token = '';

  test('Able to signup a user successfully', async() => {
    testUser = {
      username: 'Kirk',
      password: 'John2@',
    };

    const res = await request.post('/signup').send(testUser);
    expect(res.body.username).toEqual('Kirk');
    expect(res.body.token).toBeTruthy();
  });

  test('Able to sign in successfully and receive a token', async() => {
    const encoded = base64.encode(`${testUser.username}:${testUser.password}`);
    const res = await request.post('/signin').set('Authorization', `Basic ${encoded}`);
    expect(res.body.username).toEqual('Kirk');

    token = res.body.token;
    expect(token).toBeTruthy();
  });

  test('Able to use token to call routes that require a token', async() => {
    const res = await request.get('/secret').set('Authorization', `Bearer ${token}`);
    expect(res.text).toEqual('Secret hit');

    const res2 = await request.get('/users').set('Authorization', `Bearer ${token}`);
    expect(res2.text).toEqual('Users hit');
  });
});