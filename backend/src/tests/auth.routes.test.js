const request = require('supertest');
const app = require('../src/index');
const mongoose = require('mongoose');

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Auth API', () => {
  it('POST /api/auth/register should create a new user and return a token', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({ email: 'test@example.com', password: 'password123' });

    expect(res.statusCode).toBe(201);
    expect(res.body.email).toBe('test@example.com');
    expect(res.body).toHaveProperty('token');
  });

  it('POST /api/auth/login should authenticate user and return a token', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'test@example.com', password: 'password123' });

    expect(res.statusCode).toBe(200);
    expect(res.body.email).toBe('test@example.com');
    expect(res.body).toHaveProperty('token');
  });
});
