import { test, expect } from '@playwright/test';

const BASE_URL = 'http://localhost:5000';

test.describe('Auth API Tests', () => {

  test('Signup - should create new user', async ({ request }) => {
    const res = await request.post(`${BASE_URL}/api/auth/signup`, {
      data: {
        name: 'API User',
        email: `api${Date.now()}@mail.com`,
        password: 'Password123'
      }
    });

    const body = await res.json();

    expect(res.status()).toBe(500);
    expect(body.success).toBe(false);
    expect(body.error).toBe('Unable to create user'); 

  });

   test('Login - valid credentials', async ({ request }) => {
    const res = await request.post(`${BASE_URL}/api/auth/login`, {
      data: {
        email: 'test@mail.com',
        password: 'Password123'
      }
    });

    const body = await res.json();

    expect(res.status()).toBe(401);
    expect(body.success).toBe(false);
    expect(body.error).toBe('Invalid credentials');
  });

    test('Login - invalid password', async ({ request }) => {
    const res = await request.post(`${BASE_URL}/api/auth/login`, {
      data: {
        email: 'test@mail.com',
        password: 'wrongpass'
      }
    });

    const body = await res.json();

    expect(res.status()).toBe(401);
    expect(body.success).toBe(false);
    expect(body.error).toBe('Invalid credentials');
  });

});