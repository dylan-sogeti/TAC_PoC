import { test, expect, type Page } from '@playwright/test';
import HomePage from '../pages/home-page.ts';
import TopMenuPage from '../pages/top-menu-page.ts';
import SearchPage from '../pages/search-page.ts';

const URL = 'https://www.carbase.co.uk/';
let homePage: HomePage;
let topMenuPage: TopMenuPage;
 const pageUrl = /.*used/;
 let searchPage: SearchPage;

test.beforeEach(async ({page}) => {
     await page.goto(URL);
     homePage = new HomePage(page);
     topMenuPage = new TopMenuPage(page);
     searchPage = new SearchPage(page);
});

test.describe('Order a car', () => {
     test('@poc - Make sure site is online',async () => {
        await homePage.assertPageTitle();
     });
    test('@poc -Search a vehicle', async ({ page }) => {
          const fuelType = 'Electric';
          await topMenuPage.hoverCarMenuItem();
          await topMenuPage.showAllCars();
          await topMenuPage.assertPageUrl(pageUrl);
          await searchPage.refineSearch();
          await searchPage.searchByFuelType(fuelType);
          expect(await searchPage.getFuelType()).toEqual(fuelType);
     });
 });