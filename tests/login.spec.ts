import test, { expect } from '@playwright/test'
import { loginData } from '../test-data/login.data'
import { LoginPage } from '../pages/login.page'
test.describe('User login to saucedemo', () => {
	let loginPage: LoginPage
	test.beforeEach(async ({ page }) => {
		loginPage = new LoginPage(page)
		await page.goto('/')
	})
	test('should log in successfully with valid credentials', async () => {
		//Arrange
		const {userLogin,userPassword}=loginData.valid
		///Act
		await loginPage.login(userLogin, userPassword)
		//Assert
		await expect(loginPage.title).toBeVisible()
	})
	test('should display error when userName and userPassword are empty', async () => {
		//Arrange
		//Act
		await loginPage.loginButton.click()
		//Assert
		await expect(loginPage.loginInput).toHaveText('')
		await expect(loginPage.passwordInput).toHaveText('')
		await expect(loginPage.errorMessage).toHaveText('Epic sadface: Username is required')
	})
	test('should display error when userName is too short', async () => {
		//Arrange
		const {userLogin}=loginData.valid
		const {userPassword}=loginData.invalid
		//Act
		await loginPage.login(userLogin, userPassword)
		//Assert
		await expect(loginPage.errorMessage).toHaveText(
			'Epic sadface: Username and password do not match any user in this service'
		)
	})
	test('should display error when userPassword is too short', async () => {
		//Arrange
		const {userLogin}=loginData.valid
		const {userPassword}=loginData.invalid
		//Act
		await loginPage.login(userLogin, userPassword)
		//Assert
		await expect(loginPage.errorMessage).toHaveText(
			'Epic sadface: Username and password do not match any user in this service'
		)
	})
})
