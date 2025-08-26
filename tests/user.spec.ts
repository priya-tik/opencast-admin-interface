import { test, expect } from "@playwright/test";

test("Create a new user and complete setup", async ({ page }) => {

    await test.step("Go to users page", async () => {
        await page.goto("http://localhost:3000/#/users/users");
        await expect(page).toHaveURL(/.*users/);
    });

    await test.step("Click Add user", async () => {
        await page.getByRole("button", { name: "Add user" }).click();
        await expect(page.locator('#add-event-modal')).toBeVisible();
    });

    await test.step("Fill in username", async () => {
        const username = page.locator('input[name="username"]');
        await expect(username).toBeVisible();
        await username.fill("testuser");
    });

    await test.step("Fill in name", async () => {
        const name = page.locator('input[name="name"]');
        await expect(name).toBeVisible();
        await name.fill("Test User");
    });

    await test.step("Fill in email", async () => {
        const email = page.locator('input[name="email"]');
        await expect(email).toBeVisible();
        await email.fill("testuser@example.com");
    });

    await test.step("Fill in password", async () => {
        const password = page.locator('input[name="password"]');
        await expect(password).toBeVisible();
        await password.fill("Test@1234");
    });

    await test.step("Fill in repeat password", async () => {
        const repeatPassword = page.locator('input[name="passwordConfirmation"]');
        await expect(repeatPassword).toBeVisible();
        await repeatPassword.fill("Test@1234");
    });

    await test.step("Submit the form", async () => {
        const createButton = page.locator('button.submit');
        await expect(createButton).toBeEnabled({ timeout: 5000 });
        await createButton.click();
        await expect(page.locator('#add-event-modal')).toBeHidden();
    });

});
