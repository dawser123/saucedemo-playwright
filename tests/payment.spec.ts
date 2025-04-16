import test, { expect } from '@playwright/test'
import { LoginPage } from '../pages/login.page'
import { loginData } from '../test-data/login.data'
import { AddToCartPage } from '../pages/addToCartPage.page'
import { PaymentPage } from '../pages/payment.page'

test.describe('Checkout process', () => {
	let paymentPage:PaymentPage
	test.beforeEach(async ({ page }) => {
		const userLogin = loginData.valid.userLogin
		const userPassword = loginData.valid.userPassword

		await page.goto('/')
		const loginPage = new LoginPage(page)
		await loginPage.login(userLogin, userPassword)

		const addToCartPage = new AddToCartPage(page)
		await addToCartPage.addMultipleProducts()

		paymentPage = new PaymentPage(page)
	})
	test('should add multiple products to cart and complete the order ', async () => {
		//Arrange
		const { userName, userLastName, userPostalCode } = loginData.valid
		//Act
		await paymentPage.completeCheckout(userName, userLastName, userPostalCode)
		await paymentPage.finishButton.click()
		//Assert
		await expect(paymentPage.completeTitle).toContainText('Thank you for your order!')
	})
	test('should calculate total price with tax correctly', async () => {
		// Arrange
		const { userName, userLastName, userPostalCode } = loginData.valid
		// Act
		await paymentPage.completeCheckout(userName, userLastName, userPostalCode)

		const totalPriceText = await paymentPage.totalPrice.textContent()
		const taxText = await paymentPage.taxPrice.textContent()

		const priceTexts: string[] = await paymentPage.itemPrice.allTextContents()
		const pricesFloat = priceTexts.map(price => parseFloat(price.replace('$', '')))

		const itemsSum = pricesFloat.reduce((sum, price) => sum + price, 0)
		const tax = taxText ? parseFloat(taxText.replace('Tax: $', '').trim()) : 0
		const totalPrice = totalPriceText ? parseFloat(totalPriceText.replace('Total: $', '').trim()) : 0

		const calculatedTotal = itemsSum + tax

		// Assert
		expect(totalPrice).toBe(calculatedTotal)
	})
})
