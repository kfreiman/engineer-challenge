import { Page, Locator, expect } from '@playwright/test';
import { BASE_URL } from '../config';

export class LoginPage {
  readonly page: Page;
  readonly identifierInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly loginButtonFromLanding: Locator;

  constructor(page: Page) {
    this.page = page;
    this.identifierInput = page.getByTestId('ory/form/node/input/identifier');
    this.passwordInput = page.getByTestId('ory/form/node/input/password');
    this.loginButton = page.getByRole('button', { name: 'Sign in with password' });
    this.loginButtonFromLanding = page.getByRole('button', { name: 'Login' });
  }

  async goto() {
    await this.page.goto(`${BASE_URL}/auth/login`);
  }

  async login(identifier: string, password?: string) {
    await this.identifierInput.fill(identifier);
    if (password) {
      await this.passwordInput.fill(password);
    }
    await this.loginButton.click();
  }

  async startLoginFromLanding() {
    await this.loginButtonFromLanding.click();
  }
}
