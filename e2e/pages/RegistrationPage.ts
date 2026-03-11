import { Page, Locator, expect } from '@playwright/test';
import { BASE_URL } from '../config';

export class RegistrationPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly signupButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.getByTestId('ory/form/node/input/traits.email');
    this.passwordInput = page.getByTestId('ory/form/node/input/password');
    this.signupButton = page.getByRole('button', { name: 'Sign up' });
  }

  async goto() {
    await this.page.goto(`${BASE_URL}/auth/registration`);
    await this.page.waitForURL(url => url.pathname === '/auth/registration' && url.searchParams.has('flow'));
  }

  async register(email: string, password?: string) {
    await this.emailInput.fill(email);
    await this.signupButton.click();

    if (password) {
      await this.passwordInput.fill(password);
      await this.signupButton.click();
    }
  }

  async getErrorMessage(messageId: string): Promise<Locator> {
    return this.page.getByTestId(`ory/message/${messageId}`);
  }
}
