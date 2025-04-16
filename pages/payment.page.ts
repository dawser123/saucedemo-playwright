import { Locator, Page } from '@playwright/test'

export class PaymentPage {
	shoppingButton: Locator
	checkoutButton: Locator
	firstNameInput: Locator
	lastNameInput: Locator
	postalCodeInput: Locator
	continueButton: Locator
	finishButton: Locator
	completeTitle: Locator
	itemPrice: Locator
	totalPrice: Locator
	taxPrice: Locator

	constructor(private page: Page) {
		this.shoppingButton = this.page.locator('[data-test="shopping-cart-link"]')
		this.checkoutButton = this.page.locator('[data-test="checkout"]')
		this.firstNameInput = this.page.locator('[data-test="firstName"]')
		this.lastNameInput = this.page.locator('[data-test="lastName"]')
		this.postalCodeInput = this.page.locator('[data-test="postalCode"]')
		this.continueButton = this.page.locator('[data-test="continue"]')
		this.completeTitle = this.page.locator('[data-test="complete-header"]')
		this.finishButton = this.page.locator('[data-test="finish"]')
		this.itemPrice = this.page.locator('[data-test="cart-list"] [data-test="inventory-item-price"]')
		this.totalPrice = this.page.locator('[data-test="total-label"]')
		this.taxPrice = this.page.locator('[data-test="tax-label"]')
	}

	async completeCheckout(userName: string, userLastName: string, userPostalCode: string): Promise<void> {
		await this.shoppingButton.click()
		await this.checkoutButton.click()
		await this.firstNameInput.fill(userName)
		await this.lastNameInput.fill(userLastName)
		await this.postalCodeInput.fill(userPostalCode)
		await this.continueButton.click()
	}
}
