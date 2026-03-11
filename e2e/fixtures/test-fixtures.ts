import { test as base } from '@playwright/test';
import { RegistrationPage } from '../pages/RegistrationPage';
import { LoginPage } from '../pages/LoginPage';
import { ProfilePage } from '../pages/ProfilePage';
import { HOSTNAME } from '../config';

type PageObjects = {
  registrationPage: RegistrationPage;
  loginPage: LoginPage;
  profilePage: ProfilePage;
};

export const test = base.extend<PageObjects>({
  registrationPage: async ({ page }, use) => {
    await use(new RegistrationPage(page));
  },
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  profilePage: async ({ page }, use) => {
    await use(new ProfilePage(page));
  },
});

export { expect } from '@playwright/test';
export { HOSTNAME };
