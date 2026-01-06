import {test, expect} from '@playwright/test';
import { NavigationPanel } from '../page-objects/navigationPage.spec'; 

test.beforeEach(async ({page}) => {
    await page.goto('http://localhost:4200/');
})

test('navigateToForms', async({page}) => {
    const navigationPage = new NavigationPanel(page);
    await navigationPage.FormLayoutsPage();
    await page.waitForTimeout(1000);

    await navigationPage.DatepickerPage();
    await navigationPage.TooltipPage();
})