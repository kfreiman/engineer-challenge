import { test, expect, HOSTNAME } from '../fixtures/test-fixtures';
import { BASE_URL } from '../config';

async function getRecoveryCode(email: string): Promise<string> {
  const mailpitUrl = 'http://localhost:8025/api/v1/search';
  const response = await fetch(`${mailpitUrl}?query=to:${email}`);
  const data = await response.json();

  if (data.messages && data.messages.length > 0) {
    const snippet = data.messages[0].Snippet;
    const match = snippet.match(/code[:\s]+(\d+)/i);
    if (match) {
      return match[1];
    }
  }
  throw new Error(`Recovery code not found for ${email}`);
}

test.describe('Account Recovery Journey', () => {
  test('should allow a user to recover their account via email code', async ({
    registrationPage,
    profilePage,
    loginPage,
    recoveryPage,
    page,
  }) => {
    const email = `test-recovery-${Date.now()}@${HOSTNAME}`;
    const initialPassword = '1QrgljqO';
    const newPassword = '5wohAcBG';

    // 1. Setup: Register a user
    await registrationPage.goto();
    await registrationPage.register(email, initialPassword);
    await profilePage.verifyWelcomeMessage(email);
    await profilePage.logout();

    // 2. Start Recovery
    await loginPage.goto();
    await page.getByRole('link', { name: 'Recover Account' }).click();

    await recoveryPage.submitEmail(email);

    // 3. Get code from Mailpit API
    // We might need to wait a bit for the email to arrive
    let code: string | undefined;
    await expect(async () => {
      code = await getRecoveryCode(email);
      expect(code).toBeDefined();
    }).toPass({
      intervals: [1000, 2000, 5000],
      timeout: 15000
    });

    // 4. Submit recovery code
    await recoveryPage.submitCode(code!);

    // 5. Set new password
    await recoveryPage.setNewPassword(newPassword);

    // sleep for 1 second
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Verify recovery success by logging in with new password
    // 1. Logout
    await profilePage.goto();
    await profilePage.logout();

    // 2. Login
    // Assuming user lands on a generic page where login is required
    await loginPage.goto();
    await loginPage.login(email, newPassword);

    // 4. Final verification
    await profilePage.verifyWelcomeMessage(email);
  });
});
