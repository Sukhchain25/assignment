// tests/license.test.js
const request = require('supertest');
const app = require('../../app');
const User = require('../models/user.model');
const LicensePlan = require('../models/licensePlan.model');

describe('API Usage Limit Enforcement', () => {
  let user;

  beforeAll(async () => {
    const plan = await LicensePlan.create({
      name: 'Basic',
      maxApiCalls: 5,
      price: 10,
    });
    user = await User.create({
      name: 'Test User',
      emailId: 'test@example.com',
      password: 'dummy@11!',
      licensePlan: plan._id,
    });
  });

  it('should allow API calls within limit', async () => {
    const response = await request(app)
      .get('/demo-endpoint')
      .set('user-id', user._id);
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('API call successful!');
  });

  it('should block API calls after limit is reached', async () => {
    for (let i = 0; i < 5; i++) {
      await request(app).get('/demo-endpoint').set('user-id', user._id);
    }

    const response = await request(app)
      .get('/demo-endpoint')
      .set('user-id', user._id);
    expect(response.statusCode).toBe(429);
    expect(response.body.error).toBe(
      'LimitExceededError: API usage limit exceeded'
    );
  });
});
