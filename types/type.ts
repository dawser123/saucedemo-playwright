export type Credentials = {
	userName: string
	userPassword: string
}
export type LoginData = {
	valid: Credentials
	invalid: Credentials
}
export type Product = {
	name: string
	id:string

}
export type Items=Product[]

