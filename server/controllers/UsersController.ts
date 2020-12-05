import { getConnection, Repository } from "typeorm";
import { User } from "../entities/User";

export class UsersController {
	private repository: Repository<User>;

	getRepository() {
		this.repository = getConnection().getRepository(User);
	}
	public async createUser(user: User) {
		this.getRepository();
		this.repository.insert(user);
	}

	public async checkEmail(email: string) {
		this.getRepository();
		return this.repository
			.findOne({
				where: {
					email,
				},
			})
			.then((user: User) => !!user);
	}

	public async checkLogin(login: string) {
		this.getRepository();
		return this.repository
			.findOne({
				where: {
					login,
				},
			})
			.then((user: User) => !!user);
	}

	public async checkEmailAndLogin(
		email: string,
		login: string
	): Promise<boolean> {
		this.getRepository();
		return this.repository
			.findOne({
				where: [
					{
						email,
					},
					{
						login,
					},
				],
			})
			.then((user: User) => !!user);
	}

	public async getUserByEmailOrLogin(email: string, login: string): Promise<User> {
		this.getRepository();
		try {
			return this.repository
				.findOne({
					where: [
						{
							email,
						},
						{
							login,
						},
					],
				})
				.then((user: User) => user);
		} catch (error) {
			console.log("Cannot get User by email!");
		}
	}
}
