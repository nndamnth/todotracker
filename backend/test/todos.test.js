process.env.NODE_ENV = 'test';
const request = require('supertest');
const { app, sequelize } = require('../src/app');

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
});

describe('Todos API', () => {
  test('CRUD flow works', async () => {
    const resGet = await request(app).get('/todos');
    expect(resGet.statusCode).toBe(200);
    expect(Array.isArray(resGet.body)).toBe(true);

    const resPost = await request(app).post('/todos').send({ title: 'test item', description: 'desc' });
    expect(resPost.statusCode).toBe(201);
    expect(resPost.body.id).toBeDefined();
    const id = resPost.body.id;

    const resPut = await request(app).put(`/todos/${id}`).send({ title: 'edited', completed: true });
    expect(resPut.statusCode).toBe(200);
    expect(resPut.body.completed).toBe(true);

    const resDelete = await request(app).delete(`/todos/${id}`);
    expect(resDelete.statusCode).toBe(204);
  });
});
