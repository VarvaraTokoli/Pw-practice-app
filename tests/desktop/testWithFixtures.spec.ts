//importing 'test' from the extended test fixture, created in the testOptions.ts file, instead of the in-built Playwright library
import {test} from '../../testOptions' ;

import {expect} from '@playwright/test';
import { PageManager } from '../../page-objects/pageManager';
import { faker } from '@faker-js/faker'

// test.beforeEach(async ({page}) => {
//     await page.goto('/');
// })

//This test is using formLayoutsPage fixture from the 'testOptions.ts' file
//The fixture handles navigation to the Form Layouts Page, therefore we don't need this part of the code in the test
//Test works much faster in this way
test('submit the form with parametrised method', async({page, formLayoutsPage}) => {
    const pageManager = new PageManager(page);

    const randomFullName = faker.person.fullName();
    const randomEmail = `${randomFullName.replace(' ', '')}${faker.number.int(1000)}@test.com`

    //await pageManager.navigateTo().FormLayoutsPage();
    await pageManager.onformLayoutsPage().SubmitUsingTheGridForm(randomEmail, 'myPassword', 'Option 2');

    expect (await page.locator('nb-card', { hasText: 'Using the Grid' }).getByRole('textbox', { name: 'Email' }).inputValue()).toEqual(randomEmail);
})