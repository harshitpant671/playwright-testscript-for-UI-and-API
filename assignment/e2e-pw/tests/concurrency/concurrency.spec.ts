import { test, expect } from '@playwright/test';

const BASE_URL = 'http://localhost:5000';

test('Multiple signup requests (race condition)', async ({ request }) => {
  const email = `race${Date.now()}@mail.com`;

  const requests = Array.from({ length: 5 }).map(() =>
    request.post(`${BASE_URL}/api/auth/signup`, {
      data: {
        name: 'Race User',
        email,
        password: '123456'
      }
    })
  );

  const responses = await Promise.all(requests);

  expect(responses.filter(r => r.status() === 400));

  


});