import { test, expect } from '@playwright/test';

const BASE_URL = 'http://localhost:5000';

test.describe('Edge Case API Tests', () => {

  test('Email case sensitivity check', async ({ request }) => {

    const response = await request.post(`${BASE_URL}/api/auth/login`, {
      data: {
        email: 'TEST@mail.com',
        password: 'Password123'
      }
    });

    expect(response.status()).toBe(401);
    const body = await response.json();
    expect(body.error).toBe('Invalid credentials');

  });

  test('Login with leading/trailing spaces in email', async ({ request }) => {

    const response = await request.post(`${BASE_URL}/api/auth/login`, {
      data: {
        email: ' test@mail.com ',
        password: 'Password123'
      }
    });

    expect(response.status()).toBe(401);
    const body = await response.json();
    expect(body.error).toBe('Invalid credentials');
  });

  test('Duplicate signup requests', async ({ request }) => {

    const email = `duplicate${Date.now()}@mail.com`;

    const first = await request.post(`${BASE_URL}/api/auth/signup`, {
      data: {
        name: 'User One',
        email,
        password: 'Password123'
      }
    });

    const second = await request.post(`${BASE_URL}/api/auth/signup`, {
      data: {
        name: 'User Two',
        email,
        password: 'Password123'
      }
    });

    expect(first.status()).toBe(401);

    expect(second.status()).toBe(401);
  });

  test('Access protected API with invalid token', async ({ request }) => {

    const response = await request.get(`${BASE_URL}/api/auth/profile`, {
      headers: {
        Authorization: 'Bearer invalidtoken123'
      }
    });

    expect(response.status()).toBe(401);
  });

});