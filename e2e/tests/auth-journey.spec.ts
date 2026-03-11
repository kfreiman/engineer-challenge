import { test, expect, HOSTNAME } from '../fixtures/test-fixtures';
import { BASE_URL } from '../config';

test.describe('Authentication Journey', () => {
  test('should allow a new user to register, logout, and login back in', async ({ registrationPage, profilePage, loginPage, page }) => {
    const email = `test-journey-${Date.now()}@${HOSTNAME}`;
    const password = 'aB3!k9Pq-journey';

    // 1. Registration
    await registrationPage.goto();
    await registrationPage.register(email, password);

    // Verify registration success
    await profilePage.verifyWelcomeMessage(email);

    // 2. Logout
    await profilePage.logout();

    // 3. Login
    // Assuming user lands on a generic page where login is required
    await loginPage.startLoginFromLanding();
    await loginPage.login(email, password);

    // 4. Verify login success
    await profilePage.verifyWelcomeMessage(email);
    await expect(profilePage.logoutButton).toBeVisible();
  });
});
