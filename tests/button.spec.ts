import { test, expect } from "@playwright/test";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

test("create a new event and complete setup", async ({ page }) => {
    // Step 1: Go to events page
    await page.goto("http://localhost:3000/#/events/events");
    await expect(page).toHaveURL(/.*events/);
    await page.waitForSelector('button.add', { state: 'visible' });
    await page.getByRole("button", { name: "Add event" }).click();
    await expect(page.locator('tr:has-text("Title*") input')).toBeVisible();

    const eventTitle = "Event";
    const titleInput = page.locator('tr:has-text("Title*") input');
    await titleInput.fill(eventTitle);
    await expect(titleInput).toHaveValue(eventTitle);
    await page.getByRole("button", { name: "Next", exact: true }).click();

    const videoFilePath = path.resolve(__dirname, "audio1.mp4");
    const presenterUploadInput = page.locator("#track_presenter");
    await expect(presenterUploadInput).toBeVisible();
    await presenterUploadInput.setInputFiles(videoFilePath);

    await page.getByRole("button", { name: "Next", exact: true }).click();

    // Step 7: Select workflow from dropdown
    const workflowDropdown = page.locator('div.css-1lcssr6-control');
    await workflowDropdown.click();
    const workflowOption = page.locator('div[role="option"]', { hasText: "Fast Testing Workflow" });
    await expect(workflowOption).toBeVisible();
    await workflowOption.click();

    // Step 8: Click Next after workflow selection
    await page.getByRole("button", { name: "Next", exact: true }).click();

});
