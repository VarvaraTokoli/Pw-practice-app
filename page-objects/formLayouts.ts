import { Page } from '@playwright/test'

export class FormLayoutsPage{

    readonly page: Page;

    constructor(page: Page){
        this.page = page;
    }
/**
 * This method will fill in and submit the "Using the Grid" form
 * @param email - valid email
 * @param password - password
 * @param option - Option 1, Option 2
 */
    async SubmitUsingTheGridForm(email: string, password: string, option: string){
        const usingTheGridForm = this.page.locator('nb-card', { hasText: 'Using the Grid' });

        await usingTheGridForm.getByRole('textbox', { name: 'Email' }).fill(email);
        await usingTheGridForm.getByRole('textbox', { name: 'Password' }).fill(password);
        await usingTheGridForm.getByRole('radio', { name: option}).check({force: true});

        await usingTheGridForm.getByRole('button').click();
    }
}