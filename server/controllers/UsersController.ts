import { getConnection, Repository } from "typeorm";
import { User } from "../entities/User";

export class UsersController {
	private readonly repository: Repository<User>;
	constructor() {
		this.repository = getConnection().getRepository(User);
	}
	public async checkEmail(email: string): Promise<boolean> {
		let newEmail = "";

		newEmail = await this.repository
			.createQueryBuilder()
			.select("email")
			.where("email LIKE :email", { email })
			.execute();

		if (email === newEmail) {
			return true;
		}
		return false;
	}

	public async checkLogin(login: string): Promise<boolean> {
		let newLogin = "";

		newLogin = await this.repository
			.createQueryBuilder()
			.select("login")
			.where("login LIKE :login", { login })
			.execute();

		if (login === newLogin) {
			return true;
		}
		return false;
	}

	public async checkPassword(password: string): Promise<boolean> {
		let newPassword = "";

		newPassword = await this.repository
			.createQueryBuilder()
			.select("password")
			.where("password LIKE :password", { password })
			.execute();

		if (password === newPassword) {
			return true;
		}
		return false;
	}

	public async getUserByLogin(login: string): Promise<User> {
		try {
			let user: Promise<User>;

			user = this.repository
				.createQueryBuilder()
				.select("*")
				.where("login LIKE :login", { login })
				.execute();
			
			return user;
		} catch (error) {
			console.log("Cannot get User by login!");
		}
	}

	public async getUserByEmail(email: string): Promise<User> {
		try {
			let user: Promise<User>;

			user = this.repository
				.createQueryBuilder()
				.select("*")
				.where("email LIKE :login", { email })
				.execute();
			
			return user;
		} catch (error) {
			console.log("Cannot get User by email!");
		}
	}
}
