import { test, expect } from "@playwright/test";

test("Create a new group including roles and users with access policy", async ({ page }) => {

    await test.step("Go to ACLs page", async () => {
        await page.goto("http://localhost:3000/#/users/acls");
        await expect(page).toHaveURL(/.*acls/);
    });

    await test.step("Open Create group modal", async () => {
        await page.getByRole("button", { name: "Add access policy" }).click();
        const modal = page.locator('#add-event-modal');
        await expect(modal).toBeVisible();
    });

    await test.step("Update Name field in Metadata", async () => {
        const modal = page.locator('#add-event-modal');
        const nameInput = modal.locator('table.main-tbl input[name="name"]');
        await nameInput.fill("gg-updated");
        await expect(nameInput).toHaveValue("gg-updated");
    });
    await test.step("Save changes / go to next step", async () => {
        const modal = page.locator('#add-event-modal');
        const nextButton = modal.getByRole("button", { name: "Next" }); // Step-based modal
        await expect(nextButton).toBeEnabled();
        await nextButton.click();
    });

    await test.step("Verify Access Policy section", async () => {
        const modal = page.locator('#add-event-modal');

        const accessPolicyHeader = modal.locator('header.no-expand', { hasText: 'Access policy' });
        await expect(accessPolicyHeader).toBeVisible();

        await test.step("Select role in Access Policy", async () => {
            await modal.getByRole('button', { name: '+ New policy' }).click();

            const roleInput = modal.getByRole('combobox').nth(1);
            await roleInput.click();

            await modal.getByText('ROLE_ADMIN', { exact: true }).click();

            const writeCheckbox = modal.locator('input[name="policies.0.write"]');
            await writeCheckbox.check();

            await expect(modal.locator('input[name="policies.0.read"]')).toBeChecked();
            await expect(writeCheckbox).toBeChecked();
        });

    });

    await test.step("Save changes / go to next step", async () => {
        const modal = page.locator('#add-event-modal');
        const nextButton = modal.getByRole("button", { name: "Next" });
        await expect(nextButton).toBeEnabled();
        await nextButton.click();
    });
    await test.step("Submit group creation", async () => {
        const modal = page.locator('#add-event-modal');
        const createButton = modal.getByRole("button", { name: "Create" });
        await expect(createButton).toBeEnabled();
        await createButton.click();
    });

    await test.step("Verify updated group in list", async () => {
        const updatedRow = page.locator('table >> text=gg-updated');
        await expect(updatedRow).toBeVisible();
    });

});
