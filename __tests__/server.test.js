'use strict';
const server = require('../src/server');
const supertest = require('supertest');
const request = supertest(server.app);

describe('', () => {
  test('Able to signup a user successfully', async() => {
    const res = await request.post('/signup');
    expect(res.text).toEqual('Signed up');
  });

  test('Able to sign in successfully and receive a token', async() => {
    const res = await request.post('/signin');
    expect(res.text).toEqual('Signed in');
  });

  test('Able to use token to call routes that require a token', async() => {
    const res = await request.get('/secret');
    expect(res.text).toEqual('Secret hit');

    const res2 = await request.get('/users');
    expect(res2.text).toEqual('Users hit');
  });
});