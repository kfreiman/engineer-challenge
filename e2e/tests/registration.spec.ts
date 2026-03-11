import { test, expect, HOSTNAME } from '../fixtures/test-fixtures';

test.describe('Registration Flow', () => {
  test('should allow a new user to register and redirect to profile', async ({ registrationPage, profilePage }) => {
    const email = `test-${Date.now()}@${HOSTNAME}`;
    const password = 'aB3!k9Pq';

    await registrationPage.goto();
    await registrationPage.register(email, password);

    await profilePage.verifyWelcomeMessage(email);
  });

  test('should show error when password is too short/weak', async ({ registrationPage }) => {
    const email = `test-weak-${Date.now()}@${HOSTNAME}`;
    
    await registrationPage.goto();
    // Fill only email first
    await registrationPage.emailInput.fill(email);
    await registrationPage.signupButton.click();

    // Fill weak password
    await registrationPage.passwordInput.fill('12345678');
    await registrationPage.signupButton.click();

    await expect(await registrationPage.getErrorMessage('4000034')).toBeVisible();
  });

  test('should show error when password is too similar to email', async ({ registrationPage }) => {
    const email = `test-similar-${Date.now()}@${HOSTNAME}`;
    
    await registrationPage.goto();
    // Fill only email first
    await registrationPage.emailInput.fill(email);
    await registrationPage.signupButton.click();

    // Fill password same as email
    await registrationPage.passwordInput.fill(email);
    await registrationPage.signupButton.click();

    await expect(await registrationPage.getErrorMessage('4000031')).toBeVisible();
  });
});
