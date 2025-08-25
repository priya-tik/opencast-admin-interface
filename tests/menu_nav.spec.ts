import { test, expect } from "@playwright/test";

test.describe('Roll-up menu navigation', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('http://localhost:3000/#/events/events');
    });

    test('Menu should open and icons should be present', async ({ page }) => {
        await page.locator('i.fa.fa-bars').click();

        const navContainer = page.locator('#roll-up-menu #nav-container');
        await expect(navContainer).toBeVisible();

        const icons = navContainer.locator('i:not(.fa-bars)');
        await icons.first().waitFor({ state: 'visible' });

        await expect(icons).toHaveCount(4);
        await expect(icons.nth(0)).toHaveClass(/events/);
        await expect(icons.nth(1)).toHaveClass(/recordings/);
        await expect(icons.nth(2)).toHaveClass(/systems/);
        await expect(icons.nth(3)).toHaveClass(/users/);
    });

    test('Menu should have all links with correct hrefs', async ({ page }) => {
        await page.locator('i.fa.fa-bars').click();
        const navContainer = page.locator('#roll-up-menu #nav-container');
        await expect(navContainer).toBeVisible();

        const links = navContainer.locator('a');
        await expect(links).toHaveCount(4);
        await expect(links.nth(0)).toHaveAttribute('href', '#/events/events');
        await expect(links.nth(1)).toHaveAttribute('href', '#/recordings/recordings');
        await expect(links.nth(2)).toHaveAttribute('href', '#/systems/jobs');
        await expect(links.nth(3)).toHaveAttribute('href', '#/users/users');
    });

    test('Active menu item should have correct class', async ({ page }) => {
        await page.locator('i.fa.fa-bars').click();
        const activeLink = page.locator('#roll-up-menu a.roll-up-menu-active');
        await expect(activeLink).toHaveAttribute('href', '#/events/events');
    });

});
