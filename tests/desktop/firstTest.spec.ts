//import method from the playwright test library
import {test, expect} from '@playwright/test';

test.beforeEach(async ({page}) => {
    await page.goto('/');
    await page.getByText('Forms').click();
    await page.getByText('Form Layouts').click();
});

test('Locator syntax rules', async ({page}) => {
    //by Tag name
    page.locator('input');

    //by Id
    await page.locator('#inputEmail1').click();

    //by Class name
    page.locator('.shape-rectangle');

    //by Attribute name
    page.locator('[placeholder="Email"]');

    //by entire Class value
    //similar to finding by attribute
    page.locator('[class="input-full-width size-medium status-basic shape-rectangle nb-transition"]');

    //combine different selectors
    page.locator('input[placeholder="Email"][nbinput]');

    //by XPath (NOT RECOMMENDED)
    page.locator('//*[@id="inputEmail1"]');

    //by partial text match
    page.locator(':text("Using")');

    //by exact text match
    page.locator(':text-is("Using the Grid")');
});

test('User facing locators', async ({page}) => {
    await page.getByRole('textbox', {name: 'Email'}).first().click();
    await page.getByRole('button', {name: 'Sign in'}).first().click();

    await page.getByLabel('Email').first().click();

    await page.getByPlaceholder('Jane Doe').click();

    await page.getByText('Using the Grid').click();

    await page.getByTitle('IoT Dashboard').click();
});

test('Locating child elements', async ({page}) => {
    //listing locators one by one with space
    await page.locator('nb-card nb-radio :text-is("Option 1")').click();

    //chaining locators with locator method
    await page.locator('nb-card').locator('nb-radio :text-is("Option 2")').click();

    //make a combination of locator and user facing locator
    await page.locator('nb-card').getByRole('button', {name: 'Sign in'}).first().click();
});

test('Locating parent elements', async ({page}) => {
    //locate parent element, which has a child element with specific attribute
    //we are providing second argument to the locator method
    await page.locator('nb-card', {hasText: "Using the grid"}).getByRole('textbox', {name: "Email"}).click();

    //locate parent element, which has a child element with specific locator
    await page.locator('nb-card', {has: page.locator('#inputEmail1')}).getByRole('textbox', {name: "Email"}).click();

    //locate parent element with dedicated method
    await page.locator('nb-card').filter({hasText: 'Basic form'}).getByRole('textbox', {name: 'Email'}).click();

    await page.locator('nb-card').filter({has: page.locator('.status-danger')}).getByRole('textbox', {name: 'Password'}).click();

    await page.locator('nb-card').filter({has: page.locator('nb-checkbox')}).filter({hasText: 'Sign in'})
        .getByRole('textbox', {name: 'Email'}).click();
});

test ('Reusing the locators', async({page}) => {
    //Storing locators in the constants
    const basicForm = page.locator('nb-card').filter({hasText: "Basic form"});
    const emailField = basicForm.getByRole('textbox', {name: "Email"});

    //reusing locators, by storing them in the constants
    await emailField.fill('test@gmail.com');
    await basicForm.getByRole('textbox', {name: "Password"}).fill('Welcome123');
    await basicForm.locator('nb-checkbox').click();
    await basicForm.getByRole('button').click();

    //validating expected input
    await expect(emailField).toHaveValue('test@gmail.com');
})

test('Extracting values', async({page}) => {
    const basicForm = page.locator('nb-card').filter({hasText: "Basic form"});
    
    //getting single text value
    const buttonText = await basicForm.locator('button').textContent();
    expect(buttonText).toEqual('Submit');

    //getting all the text values
    const allRadioButtonsLabels = await page.locator('nb-radio').allTextContents();
    expect(allRadioButtonsLabels).toContain('Option 2');

    //getting input value
    //fill in the field with a value
    const EmailField =  basicForm.getByRole('textbox', {name: "Email"});
    await EmailField.fill('test@gmail.com');

    //saving value in the new variable and validating it
    const EmailValue = await EmailField.inputValue();
    expect(EmailValue).toEqual('test@gmail.com');

    //getting attribute value of the element
    const placeholderValue = await EmailField.getAttribute('placeholder');
    expect(placeholderValue).toEqual('Email');
})

test('assertions', async({page}) => {
    const basicFormButton = page.locator('nb-card').filter({hasText: "Basic form"}).locator('button');

    //General assertions
    const value = 5;
    expect(value).toEqual(5);

    const text = await basicFormButton.textContent();
    expect(text).toEqual("Submit");

    //Locator assertion
    await expect(basicFormButton).toHaveText("Submit");

    //Soft assertion (Do NOT recommended)
    //Test will continue even if soft assertion failed
    await expect.soft(basicFormButton).toHaveText("Submit123");
    await basicFormButton.click();
})
