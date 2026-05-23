import {test, expect} from '@playwright/test';
import { PageManager } from '../../page-objects/pageManager';
import { faker } from '@faker-js/faker'
import { argosScreenshot } from "@argos-ci/playwright";

test.beforeEach(async ({page}) => {
    await page.goto('/');
})

test('navigateToForms', async({page}) => {
    const pageManager = new PageManager(page);

    await pageManager.navigateTo().FormLayoutsPage();
    await argosScreenshot(page, "Form layouts page");
    await page.waitForTimeout(1000);

    await pageManager.navigateTo().DatepickerPage();
    await argosScreenshot(page, "Datepicker page");
    await pageManager.navigateTo().TooltipPage();
})

test('submit the form with parametrised method', async({page}) => {
    const pageManager = new PageManager(page);

    const randomFullName = faker.person.fullName();
    const randomEmail = `${randomFullName.replace(' ', '')}${faker.number.int(1000)}@test.com`

    await pageManager.navigateTo().FormLayoutsPage();
    await pageManager.onformLayoutsPage().SubmitUsingTheGridForm(randomEmail, 'myPassword', 'Option 2');
    await argosScreenshot(page, "Form layouts page. Filled");

    expect (await page.locator('nb-card', { hasText: 'Using the Grid' }).getByRole('textbox', { name: 'Email' }).inputValue()).toEqual(randomEmail);
})