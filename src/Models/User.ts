export class User {
	constructor(
		public email: string,
		public login: string,
		public realName: string,
		public password: string,
		public birthDate: Date,
		public countryName: string
	) {}
}
