const request = require('supertest');
const app = require('../src/index');

describe('Sweets API', () => {
  it('GET /api/sweets should return array', async () => {
    const res = await request(app).get('/api/sweets');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('POST /api/sweets should add a sweet', async () => {
    const newSweet = {
      id: 1,
      name: 'Chocolate Bar',
      category: 'Chocolate',
      price: 10,
      quantity: 50
    };
    const res = await request(app).post('/api/sweets').send(newSweet);
    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe('Chocolate Bar');
  });
});
