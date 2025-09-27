const Sweet = require('../src/models/sweet');

describe('Sweet Model', () => {
  it('should create a sweet with correct properties', () => {
    const sweet = new Sweet(1, 'Chocolate Bar', 'Chocolate', 10, 50);

    expect(sweet.id).toBe(1);
    expect(sweet.name).toBe('Chocolate Bar');
    expect(sweet.category).toBe('Chocolate');
    expect(sweet.price).toBe(10);
    expect(sweet.quantity).toBe(50);
  });
});
