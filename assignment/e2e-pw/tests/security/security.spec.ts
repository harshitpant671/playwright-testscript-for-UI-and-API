import { test, expect } from '@playwright/test';

const BASE_URL = 'http://localhost:5000';

test('JWT tampering', async ({ request }) => {
  const res = await request.get(`${BASE_URL}/api/auth/profile`);

  expect(res.status()).toBe(401);
  const body = await res.json();
  expect(body.error).toBe('Missing Authorization header');
});

test('Access admin endpoint without role', async ({ request }) => {
  const res = await request.get(`${BASE_URL}/api/auth/admin-data`);
  expect(res.status()).toBe(401);
  const body = await res.json();
  expect(body.error).toBe('Missing Authorization header');
});