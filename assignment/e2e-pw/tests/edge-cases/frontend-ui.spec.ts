import { test, expect } from '@playwright/test';

test.describe('Frontend Edge Cases', () => {

test('Signup with uppercase email', async ({ page }) => {

    await page.goto('http://localhost:3000');

    await page.locator('[type="email"]').first().fill( 'TEST@gmail.com');
    await page.locator('[type="password"]').first().fill('Password123');
    await page.locator('[placeholder="Name"]').first().fill('Upper User');

    await page.locator('button:has-text("Sign Up")').click();

    await expect(page.getByText("Unable to create user")).toBeVisible();
  });

  // ✅ Signup with spaces in email
  test('Signup with spaces in email', async ({ page }) => {

    await page.goto('http://localhost:3000');

    
    await page.locator('[type="email"]').first().fill( ' testuser@mail.com ');
    await page.locator('[type="password"]').first().fill('Password123');
    await page.locator('[placeholder="Name"]').first().fill('Space User');
    
    await page.locator('button:has-text("Sign Up")').click();

    await expect(page.getByText("Unable to create user")).toBeVisible();
  });

  // ✅ Signup with empty fields
  test('Signup with empty fields', async ({ page }) => {

    await page.goto('http://localhost:3000');

    await page.locator('button:has-text("Sign Up")').click();

    // Validation should appear
    await expect(page.getByText('Please provide a valid email')).toBeVisible();
  });

  // ✅ Signup with invalid email format
  test('Signup with invalid email', async ({ page }) => {

    await page.goto('http://localhost:3000');

    await page.locator('[placeholder="Name"]').first().fill('Invalid User');
    await page.locator('[type="email"]').first().fill('invalid-email');
    await page.locator('[type="password"]').first().fill('Password123');

    await page.locator('button:has-text("Sign Up")').click();
    await expect(page.getByText('Please provide a valid email')).toBeVisible();
 
  });

  // ✅ Signup with short password
  test('Signup with short password', async ({ page }) => {

    await page.goto('http://localhost:3000');

    await page.locator('[placeholder="Name"]').first().fill('Short Pass');
    await page.locator('[type="email"]').first().fill(`short${Date.now()}@mail.com`);
    await page.locator('[type="password"]').first().fill('123');

    await page.locator('button:has-text("Sign Up")').click();

    await expect(page.getByText('Password must be at least 8 characters long')).toBeVisible();
  });

  // ✅ Duplicate email signup
  test('Signup with duplicate email', async ({ page }) => {

    await page.goto('http://localhost:3000');

    await page.locator('[placeholder="Name"]').first().fill('Duplicate User');
    await page.locator('[type="email"]').first().fill('test@mail.com');
    await page.locator('[type="password"]').first().fill('Password123');

    await page.locator('button:has-text("Sign Up")').click();

    await expect(page.getByText("Unable to create user")).toBeVisible();
  });

  // ✅ Multiple rapid signup clicks
  test('Rapid multiple signup clicks', async ({ page }) => {

    await page.goto('http://localhost:3000');

    const email = `rapid${Date.now()}@mail.com`;

    await page.locator('[placeholder="Name"]').first().fill('Rapid User');
    await page.locator('[type="email"]').first().fill(email);
    await page.locator('[type="password"]').first().fill('Password123');

    for (let i=0; i <3 ;i++){
        await page.locator('button:has-text("Sign Up")').click();
        await expect(page.getByText("Unable to create user")).toBeVisible();
    }
  });

  test('Login with uppercase email', async ({ page }) => {

    await page.goto('http://localhost:3000/login');

    await page.locator('[type="email"]').nth(1).fill('TEST@mail.com');
    await page.locator('[type="password"]').nth(1).fill('Password123');

    await page.locator('button:has-text("Login")').click();

    await expect(page.getByText('Invalid credentials')).toBeVisible();
  });

  test('Login with spaces in email', async ({ page }) => {

    await page.goto('http://localhost:3000/login');

    await page.locator('[type="email"]').nth(1).fill(' test@mail.com ');
    await page.locator('[type="password"]').nth(1).fill('Password123');

    await page.locator('button:has-text("Login")').click();

    await expect(page.getByText('Invalid credentials')).toBeVisible();
  });

  test('Access profile with invalid token in localStorage', async ({ page }) => {

    await page.goto('http://localhost:3000');

    await page.evaluate(() => {
      localStorage.setItem('token', 'invalid.token.value');
    });

    await page.goto('http://localhost:3000/profile');

    await expect(page).not.toHaveURL(/profile$/);
  });

});