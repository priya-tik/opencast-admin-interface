import { test, expect } from '@playwright/test';

    test('navigate location details modal tabs and close', async ({ page }) => {
        await page.goto("http://localhost:3000/#/recordings/recordings");

        const openButton = page.locator('button[title="Open location details"]');
        await openButton.click();

        const modal = page.locator('#modal-nav');
        await expect(modal).toBeVisible();

        const general = modal.locator('button', { hasText: 'general' });
        await general.click()
        await expect(general).toHaveClass(/active/);

        const configTab = modal.locator('button', { hasText: 'Configuration' });
        await configTab.click();
        await expect(configTab).toHaveClass(/active/);

        const capabilitiesTab = modal.locator('button', { hasText: 'Capabilities' });
        await capabilitiesTab.click();
        await expect(capabilitiesTab).toHaveClass(/active/);

        const closeButton = page.locator('.modal .close-modal');
        await closeButton.click();

    });
