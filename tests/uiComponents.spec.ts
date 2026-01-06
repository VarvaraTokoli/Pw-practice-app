//import methods from the playwright test library
import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4200/');
    await page.getByText('Forms').click();
    await page.getByText('Form Layouts').click();
});

test.describe('Form layouts page', () => {

    //test to fill in and clear input field
    test('input fields', async ({ page }) => {
        const usingTheGridEmailInput = page.locator('nb-card', { hasText: 'Using the Grid' }).getByRole('textbox', { name: 'Email' });

        await usingTheGridEmailInput.fill('testEmail@gmail.com');
        await usingTheGridEmailInput.clear();

        //typing by letters
        await usingTheGridEmailInput.type('testEmail123@gmail.com', { delay: 300 });

        //generic assertion
        const EmailInput = await usingTheGridEmailInput.inputValue();
        expect(EmailInput).toEqual('testEmail123@gmail.com');

        //locator assertion
        expect(usingTheGridEmailInput).toHaveValue('testEmail123@gmail.com');
    })

    //operate with radio buttons
    test('radioButtons', async ({ page }) => {
        const usingTheGridForm = page.locator('nb-card', { hasText: 'Using the Grid' });

        await usingTheGridForm.getByLabel('Option 1').check({ force: true }); //{force:true} is used, when element is marked as invisible
        await usingTheGridForm.getByRole('radio', { name: 'Option 2' }).check({ force: true });

        expect(await usingTheGridForm.getByRole('radio', { name: 'Option 2' }).isChecked()).toBeTruthy();
        expect(await usingTheGridForm.getByRole('radio', { name: 'Option 1' }).isChecked()).toBeFalsy();
    })
})

test('checkboxes', async({page}) => {
    await page.getByText('Modal & Overlays').click();
    await page.getByText('Toastr').click();

    //const ToasterConfigurationForm = page.locator('nb-card', {hasText: 'Toaster configuration'});

    //saving all the checkboxes into the array constant
    //const CheckBoxes = ToasterConfigurationForm.getByRole('checkbox');
    const CheckBoxes = page.getByRole('checkbox');

    //going through all check-boxes and unchecking them
    for(const checkbox of await CheckBoxes.all()){
        await checkbox.uncheck({force: true});
    }

    //checking the second checkbox
    await page.getByRole('checkbox', {name: 'Prevent arising of duplicate toast'}).check({force: true});

    //validating state of all 3 checkboxes
    expect(await page.getByRole('checkbox', {name: 'Hide on click'}).isChecked()).toBeFalsy();
    expect(await page.getByRole('checkbox', {name: 'Prevent arising of duplicate toast'}).isChecked()).toBeTruthy();
    expect(await page.getByRole('checkbox', {name: 'Show toast with icon'}).isChecked()).toBeFalsy();
})

test('picklists', async ({page}) => {
    const pageHeader = page.locator('nb-layout-header');
    const colorPicklist = page.locator('ngx-header nb-select');
    const listOfItems = page.locator('nb-option-list nb-option');
    
    //click on the color picker; validate available options
    await colorPicklist.click();
    await expect(listOfItems).toHaveText(['Light', 'Dark', 'Cosmic', 'Corporate']);

    //click one of the items; validate header colour
    await listOfItems.filter({hasText: 'Dark'}).click();
    await expect(pageHeader).toHaveCSS('background-color', 'rgb(34, 43, 69)');

    //class defining menu items and corresponding background colours
    const backgroundColours = {
        'Light' : 'rgb(255, 255, 255)',
        'Dark' : 'rgb(34, 43, 69)',
        'Cosmic' : 'rgb(50, 50, 89)',
        'Corporate' : 'rgb(255, 255, 255)'
    }

    await colorPicklist.click();

    //loop to go through all menu items, click and validate background
    for(const colourItem in backgroundColours){
        await listOfItems.filter({hasText: colourItem}).click();
        await expect(pageHeader).toHaveCSS('background-color', backgroundColours[colourItem]);

        //reopen the dropdown, if we still didn't reach the last element
        if(colourItem != 'Corporate')
            await colorPicklist.click();
    }
})

test('web tables', async({page}) => {
    await page.getByText('Tables & Data').click();
    await page.getByText('Smart Table').click();

    //get the table row by any text in this row
    const targetRow = page.getByRole('row', {name: 'mdo@gmail.com'});
    await targetRow.locator('.nb-edit').click()

    //adding additional locator getByPlaceholder, because HTML text was changed into the input field
    await page.locator('input-editor').getByPlaceholder('E-mail').clear();
    await page.locator('input-editor').getByPlaceholder('E-mail').fill('test@gmail.com');
    await page.locator('.nb-checkmark').click();

    
})
