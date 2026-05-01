import {test as base} from '@playwright/test'

export type TestOptions = {
    formLayoutsPage: string;
}

export const test = base.extend<TestOptions>({

    //test fixture, which is navigating to the baseUrl and opening the Form Layouts page
    formLayoutsPage: async({page}, use) => {
        await page.goto('/');
        await page.getByText('Forms').click();
        await page.getByText('Form Layouts').click();
        await use('');
    }
})