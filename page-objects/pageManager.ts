import { Page } from '@playwright/test'
import { NavigationPanel } from '../page-objects/navigationPage'; 
import { FormLayoutsPage } from '../page-objects/formLayouts';

/**
 * This is a helper class which manages all the Page objects
 * It has variables of each of the Page objects
 * And methods to return instances of them
 */
export class PageManager{
    private readonly page: Page;
    private readonly navigationPage: NavigationPanel;
    private readonly formLayoutsPage: FormLayoutsPage;

    constructor(page: Page){
        this.page = page;
        this.navigationPage = new NavigationPanel(this.page);
        this.formLayoutsPage = new FormLayoutsPage(this.page);
    }

    //Returns an instance of the NavigationPage
    navigateTo(){
        return this.navigationPage;
    }

    //Returns an instance of the FormLayoutsPage
    onformLayoutsPage(){
        return this.formLayoutsPage;
    }
}