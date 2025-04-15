import { Locator, Page } from '@playwright/test'
import { ProductData } from '../test-data/product.data'
export class AddToCartPage {
	singleItemId: Locator
	addToCartButton: Locator
	cartBadge: Locator
	singleProductId: Locator
	cartList: Locator
	constructor(private page: Page) {
		this.singleItemId = this.page.locator(`[data-test="${ProductData[0].id}"]`)
		this.addToCartButton = this.page.locator('[data-test="add-to-cart"]')
		this.cartBadge = page.locator('[data-test="shopping-cart-badge"]')
	}
	getProductDetailsLocator(productId: string): Locator {
		return this.page.locator(`[data-test="${productId}"]`)
	}
	getAddToCartLocator(): Locator {
		return this.page.locator('[data-test="add-to-cart"]')
	}
	getBackToProductsLocator(): Locator {
		return this.page.locator('[data-test="back-to-products"]')
	}
	async addSingleProduct(): Promise<void> {
		await this.getProductDetailsLocator(ProductData[0].id).click()

		await this.getAddToCartLocator().click()
	}
	async addMultipleProducts(): Promise<void> {
		for (const product of ProductData) {
			await this.getProductDetailsLocator(product.id).click()
			await this.getAddToCartLocator().click()
			await this.getBackToProductsLocator().click()
		}
	}
}
