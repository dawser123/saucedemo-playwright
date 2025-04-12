import test, { expect } from '@playwright/test'
import { loginData } from '../test-data/login.data'
test.describe('User login to saucedemo', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/')
	})
	test('should log in successfully with valid credentials', async ({ page }) => {
		//Arrange
		const username = loginData.valid.username
		const password = loginData.valid.password
		///Act
		await page.locator('[data-test="username"]').fill(username)
		await page.locator('[data-test="password"]').fill(password)
		await page.locator('[data-test="login-button"]').click()
		//Assert
		await expect(page.locator('[data-test="title"]')).toBeVisible()
	})

	test('should display error when username and password are empty', async ({ page }) => {
		//Arrange
		//Act
		await page.locator('[data-test="login-button"]').click()
		//Assert
    await expect(page.locator('[data-test="username"]')).toHaveText('')
    await expect(page.locator('[data-test="password"]')).toHaveText('')
		await expect(page.locator('[data-test="error"]')).toHaveText('Epic sadface: Username is required')
	})
	test('should display error when username is too short', async ({ page }) => {
		//Arrange
		const username = loginData.invalid.username
		const password = loginData.valid.password
		//Act
		await page.locator('[data-test="username"]').fill(username)
		await page.locator('[data-test="password"]').fill(password)
		await page.locator('[data-test="login-button"]').click()
		//Assert
		await expect(page.locator('[data-test="error"]')).toHaveText(
			'Epic sadface: Username and password do not match any user in this service'
		)
	})
	test('should display error when password is too short', async ({ page }) => {
		//Arrange
		const username = loginData.valid.username
		const password = loginData.invalid.password
		//Act
		await page.locator('[data-test="username"]').fill(username)
		await page.locator('[data-test="password"]').fill(password)
		await page.locator('[data-test="login-button"]').click()
		//Assert
		await expect(page.locator('[data-test="error"]')).toHaveText(
			'Epic sadface: Username and password do not match any user in this service'
		)
	})
})
