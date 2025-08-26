import { test, expect } from "@playwright/test";

test("Create a new group including roles and users", async ({ page }) => {

    await test.step("Go to groups page", async () => {
        await page.goto("http://localhost:3000/#/users/groups");
        await expect(page).toHaveURL(/.*groups/);
    });

    await test.step("Open Create group modal", async () => {
        await page.getByRole("button", { name: "Add group" }).click();
        const modal = page.locator('#add-event-modal');
        await expect(modal).toBeVisible();
    });

    await test.step("Fill Metadata step", async () => {
        const modal = page.locator('#add-event-modal');

        await modal.locator('input[name="name"]').fill("new Group");
        await modal.locator('textarea[name="description"]').fill("Group created by Playwright");

        const nextButton = modal.locator('button.submit');
        await expect(nextButton).toBeEnabled({ timeout: 5000 });
        await nextButton.click();
    });

    await test.step("Select Roles", async () => {
        const modal = page.locator('#add-event-modal');

        await expect(modal.locator('.multi-select-container')).toBeVisible();

        const availableSelect = modal.locator('select.available');
        await availableSelect.selectOption({ label: 'ROLE_API_EVENTS_VIEW' });

        const addRoleButton = modal.getByRole("button", { name: "Add role" });
        await expect(addRoleButton).toBeEnabled();
        await addRoleButton.click();

        await expect(
            modal.locator('select.selected >> text=ROLE_API_EVENTS_VIEW')
        ).toBeVisible();

        const nextButton = modal.getByRole("button", { name: "Next" });
        await nextButton.click();
    });

    await test.step("Select Users", async () => {
        const modal = page.locator('#add-event-modal');

        await expect(modal.locator('.multi-select-container')).toBeVisible();
        const availableUsers = modal.locator('select.available');
        await availableUsers.selectOption({ label: "Administrator (admin)" });

        const addUserButton = modal.getByRole("button", { name: "Add user" });
        await expect(addUserButton).toBeEnabled();
        await addUserButton.click();

        await expect(
            modal.locator('select.selected >> text=Administrator (admin)')
        ).toBeVisible();
        const nextButton = modal.getByRole("button", { name: "Next" });
        await nextButton.click();
    });

    await test.step("Finish group creation", async () => {
        const modal = page.locator('#add-event-modal');
        const createButton = modal.getByRole("button", { name: "Create" });
        await expect(createButton).toBeEnabled();
        await createButton.click();

    });
    await test.step("Verify group appears in list", async () => {
        const groupRow = page.locator('table >> text=gg');
        await expect(groupRow).toBeVisible();
    });

});
