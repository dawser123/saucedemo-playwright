import { Page, Locator } from '@playwright/test'
export class LoginPage {
	loginInput: Locator
	passwordInput: Locator
	loginButton: Locator
	title: Locator
	errorMessage:Locator
	constructor(private page: Page) {
		this.loginInput = this.page.locator('[data-test="username"]')
		this.passwordInput = this.page.locator('[data-test="password"]')
		this.loginButton = this.page.locator('[data-test="login-button"]')
		this.title = this.page.locator('[data-test="title"]')
		this.errorMessage=this.page.locator('[data-test="error"]')
	}
	async login(userName: string, userPassword: string): Promise<void> {
		await this.loginInput.fill(userName)
		await this.passwordInput.fill(userPassword)
		await this.loginButton.click()
	}
}
