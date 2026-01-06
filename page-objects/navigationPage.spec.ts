import { Page } from '@playwright/test'

//public class to operate with Navigation Panel
export class NavigationPanel{
    
    //parameter of the class
    readonly page: Page;

    constructor(page: Page){
        this.page = page;
    }

    async FormLayoutsPage(){
        await this.NavigateToGroupItem('Forms');
        await this.page.getByText('Form Layouts').click();
    }

    async DatepickerPage(){
        await this.NavigateToGroupItem('Forms');
        await this.page.getByText('Datepicker').click();
    }

    async TooltipPage(){
        await this.NavigateToGroupItem('Modal & Overlays');
        await this.page.getByText('Tooltip').click();
    }

    //method to expand group item
    private async NavigateToGroupItem(groupItemTitle: string){
        const isGroupItemExpanded = await this.page.getByText(groupItemTitle).getAttribute('aria-expanded');
        
        //if item is not expanded yet
        if(!isGroupItemExpanded)
            await this.page.getByText(groupItemTitle).click();
    }
}