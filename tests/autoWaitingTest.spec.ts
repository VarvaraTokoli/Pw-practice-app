//import methods from the playwright test library
import {test, expect} from '@playwright/test';

test.beforeEach(async ({page}) => {
    await page.goto('http://uitestingplayground.com/ajax');
    await page.getByText('Button Triggering AJAX Request').click();
});

test("Auto waiting", async ({page}) => {
    const SuccessButton = page.locator('.bg-success');
    await SuccessButton.click();

    const SuccessButtonText = await page.locator('.bg-success').textContent();
    expect(SuccessButtonText).toEqual('Data loaded with AJAX get request.')

})

test("Waiting with conditions", async({page}) => {
    const SuccessButton = page.locator('.bg-success');
    
    //We are waiting for the button to be on the page
    //Before running assertion, which doesn't have autowaiting set
    await SuccessButton.waitFor({state: "attached"});
    const text = await SuccessButton.allTextContents();

    expect(text).toContain('Data loaded with AJAX get request.');
})

test ("Waiting with overriden timeout", async({page}) => {
    const SuccessButton = page.locator('.bg-success');

    //Overriding the default assertion timeout
    await expect(SuccessButton).toHaveText('Data loaded with AJAX get request.', {timeout: 20000})
})

test("Alternative waits", async({page}) => {
    const SuccessButton = page.locator('.bg-success');

    // wait for element
    //await page.waitForSelector('.bg-success');

    // wait for the API responce
    // go to browser console -> Network -> find the request -> click -> Request URL
    await page.waitForResponse('http://uitestingplayground.com/ajaxdata')
})

test('timeouts', async({page}) => {
    //overriding timeout for this particular test
    test.setTimeout(10000)

    //marking slow test => increasing timeout by 3x times
    //test.slow()

    const SuccessButton = page.locator('.bg-success');
    await SuccessButton.click();
})