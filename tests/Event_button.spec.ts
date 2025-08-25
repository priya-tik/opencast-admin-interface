import { test, expect } from "@playwright/test";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

test("Create a new event and complete setup", async ({ page }) => {

    await test.step("Go to events page", async () => {
        await page.goto("http://localhost:3000/#/events/events");
        await expect(page).toHaveURL(/.*events/);
    });

    await test.step("Click Add Event", async () => {
        await page.getByRole("button", { name: "Add event" }).click();
        await expect(page.locator('tr:has-text("Title*") input')).toBeVisible();
    });

    await test.step("Fill event title", async () => {
        const eventTitle = "Event";
        const titleInput = page.locator('tr:has-text("Title*") input');
        await titleInput.fill(eventTitle);
        await expect(titleInput).toHaveValue(eventTitle);
        await page.getByRole("button", { name: "Next", exact: true }).click();
    });

    await test.step("Upload presenter video", async () => {
        const videoFilePath = path.resolve(__dirname, "audio1.mp4");
        const presenterUploadInput = page.locator("#track_presenter");
        await expect(presenterUploadInput).toBeVisible();
        await presenterUploadInput.setInputFiles(videoFilePath);
        await page.getByRole("button", { name: "Next", exact: true }).click();
    });

    const workflowDropdown = page.locator('div.css-1lcssr6-control');
    await workflowDropdown.click();
    const workflowOption = page.locator('div[role="option"]', { hasText: "Fast Testing Workflow" });
    await expect(workflowOption).toBeVisible();
    await workflowOption.click();
    await page.getByRole("button", { name: "Next", exact: true }).click();

    const newPolicyButton = page.locator('button:has-text("+ New Policy")');
    await newPolicyButton.click();

    const roleRow = page.locator('tr').filter({ hasText: 'Administrator' });
    const writeCheckbox = roleRow.locator('input[name="policies.0.write"]');
    await expect(writeCheckbox).toBeVisible();
    await expect(writeCheckbox).toBeEnabled();

    if (!(await writeCheckbox.isChecked())) {
        await writeCheckbox.check();
    }

    await page.getByRole("button", { name: "Next", exact: true }).click();

    const createButton = page.locator('footer button[type="submit"]:has-text("Create")');
    console.log("event created")
});
