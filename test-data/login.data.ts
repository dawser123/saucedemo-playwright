import { LoginData } from '../types/type'

export const loginData: LoginData = {
	valid: {
		userLogin: 'standard_user',
		userPassword: 'secret_sauce',
		userName: 'James',
		userLastName: 'Smith',
		userPostalCode:'1234'
	},
	invalid: {
		userName: '',
		userLastName: '',
		userPostalCode:'',
		userLogin: 'standard',
		userPassword: 'secret',
	},
}
