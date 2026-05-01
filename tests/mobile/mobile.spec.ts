//import methods from the playwright test library
import { test, expect } from '@playwright/test';

//test to fill in and clear input field
test('input fields', async ({ page }) => {
    await page.goto('/');
    await page.locator('.sidebar-toggle').click();
    await page.getByText('Forms').click();
    await page.getByText('Form Layouts').click();
    await page.locator('.sidebar-toggle').click();
    
    const usingTheGridEmailInput = page.locator('nb-card', { hasText: 'Using the Grid' }).getByRole('textbox', { name: 'Email' });

    await usingTheGridEmailInput.fill('testEmail@gmail.com');

    //locator assertion
    await expect(usingTheGridEmailInput).toHaveValue('testEmail@gmail.com');
})