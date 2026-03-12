import { Page, Locator } from '@playwright/test';
import { BASE_URL } from '../config';

export class RecoveryPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly continueButton: Locator;
  readonly codeInput: Locator;
  readonly newPasswordInput: Locator;
  readonly savePasswordButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.getByTestId('ory/form/node/input/email');
    this.continueButton = page.getByRole('button', { name: 'Continue' });
    this.codeInput = page.getByRole('textbox');
    this.newPasswordInput = page.getByTestId('ory/form/node/input/password');
    this.savePasswordButton = page.getByTestId('ory/screen/settings/group/password').getByRole('button', { name: 'Save' });
  }

  async goto() {
    await this.page.goto(`${BASE_URL}/auth/recovery`);
  }

  async submitEmail(email: string) {
    await this.emailInput.fill(email);
    await this.continueButton.click();
  }

  async submitCode(code: string) {
    await this.codeInput.fill(code);
    await this.continueButton.click();
  }

  async setNewPassword(password: string) {
    await this.newPasswordInput.fill(password);
    await this.savePasswordButton.click();
  }
}
