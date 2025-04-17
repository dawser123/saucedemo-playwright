import test, { expect } from '@playwright/test'
import { LoginPage } from '../pages/login.page'
import { loginData } from '../test-data/login.data'
import { LogoutPage } from '../pages/logout.page'

test.describe('User logout from saucedemo', () => {
	let loginPage: LoginPage
	let logoutPage: LogoutPage
	test.beforeEach(async ({ page }) => {
		loginPage = new LoginPage(page)
		await page.goto('/')

		logoutPage = new LogoutPage(page)
	})

	test('should logout successfully when user clicks logout from sidebar', async () => {
		//Arrange
		const { userLogin, userPassword } = loginData.valid
		///Act
		await loginPage.login(userLogin, userPassword)
		await logoutPage.burgerButton.click()
		await logoutPage.sideBarMenu.click()
		//Assert
		await expect(logoutPage.userName).toBeVisible()
		await expect(logoutPage.password).toBeVisible()
	})
})
