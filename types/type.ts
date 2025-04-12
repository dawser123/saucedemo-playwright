export type Credentials = {
	userName: string
	userPassword: string
}

export type LoginData = {
	valid: Credentials
	invalid: Credentials
}
