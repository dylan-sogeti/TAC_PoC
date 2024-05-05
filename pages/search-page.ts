import { Locator, Page } from "@playwright/test";

export class SearchPage {
    private readonly page: Page;
    private readonly refineSearchButton: Locator;
    private readonly fuelTypeDropDown: Locator;
    private readonly fuelIcon: Locator;
    constructor(page: Page) {
        this.page = page;
        this.refineSearchButton = this.page.locator('#refine-search');
        this.fuelTypeDropDown = this.page.locator('#fuel-type');
        this.fuelIcon = this.page.locator('ul i[itemprop="fuelType"]');
    }

    async refineSearch(): Promise<void> {
        await this.refineSearchButton.click();
    }

    async searchByFuelType(fuelType: string): Promise<void> {
        await this.fuelTypeDropDown.selectOption(fuelType.toLowerCase());
    }

    async getFuelType(): Promise<string> {
        const fuelTypeElement = await this.fuelIcon.locator('..').first();
        return await fuelTypeElement.innerText();
    }
} export default SearchPage