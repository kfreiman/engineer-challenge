import { Page, Locator, expect } from '@playwright/test';
import { BASE_URL } from '../config';

export class ProfilePage {
  readonly page: Page;
  readonly logoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.logoutButton = page.getByTestId('orbitto/auth/logout_link');
  }

  async goto() {
    await this.page.goto(`${BASE_URL}/profile`);
  }

  async logout() {
    await this.logoutButton.click();
  }

  async verifyWelcomeMessage(email: string) {
    await expect(this.page).toHaveURL(`${BASE_URL}/profile`, { timeout: 10000 });
    await expect(this.page.locator('body')).toContainText(email);
  }

  async isLogoutLinkVisible(): Promise<boolean> {
    return this.logoutButton.isVisible();
  }
}
