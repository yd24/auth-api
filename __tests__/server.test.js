'use strict';

const server = require('../src/server');
const { db } = require('../src/auth/models');
const supertest = require('supertest');
const request = supertest(server.app);

beforeAll( async() => {
  await db.sync();
});

afterAll( async() => {
  await db.drop();
});

//v1 tests
describe('Testing unauthenticated server routes', () => {
  let testUser, testClothes, testFood, user_res, clothes_res, food_res;

  test('Can POST to create an item', async() => {
    //test items
    testUser = {
      username: 'John',
      password: 'Kirk@5',
    };

    testClothes = {
      name: 'shirt',
      color: 'red',
      size: 'M',
    };

    testFood = {
      name: 'meat',
      calories: 500,
      type: 'protein',
    };

    //POST requests
    user_res = await request.post('/api/v1/users').send(testUser);
    clothes_res = await request.post('/api/v1/clothes').send(testClothes);
    food_res = await request.post('/api/v1/food').send(testFood);

    expect(user_res.body.username).toEqual('John');
    expect(clothes_res.body.name).toEqual('shirt');
    expect(food_res.body.name).toEqual('meat');
  });

  test('Can GET all items', async() => {
    const testUser2 = {
      username: 'Bob',
      password: 'Kirk@5',
    };

    const testClothes2 = {
      name: 'pants',
      color: 'red',
      size: 'M',
    };

    const testFood2 = {
      name: 'chicken',
      calories: 500,
      type: 'protein',
    };

    await request.post('/api/v1/users').send(testUser2);
    await request.post('/api/v1/clothes').send(testClothes2);
    await request.post('/api/v1/food').send(testFood2);

    const res = await request.get('/api/v1/users');
    const res2 = await request.get('/api/v1/users');
    const res3 = await request.get('/api/v1/users');

    expect(res.body.length).toEqual(2);
    expect(res2.body.length).toEqual(2);
    expect(res3.body.length).toEqual(2);
  });

  test('Can GET a single item by id', async() => {
    const res = await request.get(`/api/v1/users/${user_res.body.id}`);
    const res2 = await request.get(`/api/v1/food/${food_res.body.id}`);
    const res3 = await request.get(`/api/v1/clothes/${clothes_res.body.id}`);

    expect(res.body.username).toEqual('John');
    expect(res2.body.name).toEqual('meat');
    expect(res3.body.name).toEqual('shirt');
  });

  test('Can update a single item by id', async() => {
    testUser.username = 'Hank';
    testFood.name = 'steak';
    testClothes.name = 'socks';

    const res = await request.put(`/api/v1/users/${user_res.body.id}`).send(testUser);
    const res2 = await request.put(`/api/v1/food/${food_res.body.id}`).send(testFood);
    const res3 = await request.put(`/api/v1/clothes/${clothes_res.body.id}`).send(testClothes);

    expect(res.body.username).toEqual('Hank');
    expect(res2.body.name).toEqual('steak');
    expect(res3.body.name).toEqual('socks');
  });

  test('Can delete an item', async() => {
    const res = await request.delete(`/api/v1/users/${user_res.body.id}`);
    const res2 = await request.delete(`/api/v1/food/${food_res.body.id}`);
    const res3 = await request.delete(`/api/v1/clothes/${clothes_res.body.id}`);

    expect(res.body).toEqual(1);
    expect(res2.body).toEqual(1);
    expect(res3.body).toEqual(1);

    const res_1 = await request.get(`/api/v1/users/${user_res.body.id}`);
    const res_2 = await request.get(`/api/v1/food/${food_res.body.id}`);
    const res_3 = await request.get(`/api/v1/clothes/${clothes_res.body.id}`);

    expect(res_1.body).toBeFalsy();
    expect(res_2.body).toBeFalsy();
    expect(res_3.body).toBeFalsy();
  });
});

//v2 tests
xdescribe('Testing authenticated server routes', () => {
  xtest('', () => {

  });
});
