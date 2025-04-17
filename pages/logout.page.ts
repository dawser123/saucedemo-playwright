import { Locator, Page } from '@playwright/test'

export class LogoutPage {
	burgerButton: Locator
    sideBarMenu:Locator
    userName:Locator
    password:Locator

	constructor(private page: Page) {
		this.burgerButton = this.page.locator('#react-burger-menu-btn')
        this.sideBarMenu=this.page.locator('[data-test="logout-sidebar-link"]')
        this.userName=this.page.locator('[data-test="username"]')
        this.password=this.page.locator('[data-test="password"]')
	}
}
