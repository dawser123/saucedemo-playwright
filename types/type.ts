export type Credentials = {
	userLogin: string
	userName:string
	userLastName:string
	userPassword: string
	userPostalCode:string
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

export type priceTexts=string[]
