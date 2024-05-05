import { expect, Locator, Page } from "@playwright/test";

export class TopMenuPage {
    private readonly page: Page;
    private readonly carMenuLink: Locator;
    //private readonly nodeLink: Locator;
    //private readonly javaLink: Locator;
    private readonly carLink: Locator;
    private readonly nodeLabel: Locator;
    private readonly nodeDescription: string = 'Installing Playwright';
    private readonly javaLabel: Locator;
    private readonly javaDescription: string = `Playwright is distributed as a set of Maven modules. 
        The easiest way to use it is to add one dependency to your project's pom.xml as described 
        below. If you're not familiar with Maven please refer to its documentation.`;
    //private readonly searchMenu: Locator;

    constructor(page: Page) {
        this.page = page;
        this.carMenuLink = page.locator('#nav-used-cars');
        //this.nodeLink = page.getByRole('button', {name: 'Node.js'});
        //this.javaLink = page.getByRole('navigation', { name: 'Main '}).getByText('Java');
        this.carLink = page.locator('a.main-nav-submenu-item:has-text("Show all cars")');
        this.nodeLabel = page.getByText(this.nodeDescription, { exact: true });
        this.javaLabel = page.getByText(this.javaDescription);
        //this.searchMenu = this.page.locator('.DocSearch-Button-Placeholder');
    }

    async hoverCarMenuItem() {
        await this.carMenuLink.hover();
    }
    async showAllCars() {
        await this.carLink.click();
    }

    async assertPageUrl(pageUrl: RegExp) {
        await expect(this.page).toHaveURL(pageUrl);
    }

    async assertNodeDescriptionNotVisible() {
        await expect(this.nodeLabel).not.toBeVisible();
    }

    async assetJavaDescriptionVisible() {
        await expect(this.javaLabel).toBeVisible();
    }
    
    // async clickSearch() {
    //     await this.searchMenu.click();
    // }
}

export default TopMenuPage;