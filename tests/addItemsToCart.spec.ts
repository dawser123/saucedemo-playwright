import test, { expect } from '@playwright/test'
import { LoginPage } from '../pages/login.page'
import { loginData } from '../test-data/login.data'
import { ProductData } from '../test-data/product.data'
import { AddToCartPage } from '../pages/addToCartPage.page'
test.describe('Adding items to cart', () => {
	let addToCartPage: AddToCartPage
	test.beforeEach(async ({ page }) => {
		const userLogin = loginData.valid.userLogin
		const userPassword = loginData.valid.userPassword

		await page.goto('/')
		const loginPage = new LoginPage(page)
		await loginPage.login(userLogin, userPassword)

		addToCartPage = new AddToCartPage(page)
	})
	test('should add single item to cart', async () => {
		//Arrange
		const numberOfItems = 1
		//Act
		await addToCartPage.addSingleProduct()
		//Assert
		await expect(addToCartPage.cartBadge).toContainText(numberOfItems.toString())
	})
	test('should add multiple items to cart', async () => {
		//Arrange
		const numberOfItems = ProductData.length.toString()
		//Act
		await addToCartPage.addMultipleProducts()
		//Assert
		await expect(addToCartPage.cartBadge).toContainText(numberOfItems)
	})
})
