import { response } from 'express';
import { getRepository } from "typeorm";
import { User } from "../entities/User";

export class UsersController {
	getCurrentUser(id: string) {
		try {
			let user = getRepository(User).findOne({
				select: ['email', 'login'],
				where: { id }
			});
			return response.send(200).send({ user: user });
		} catch (error) {
			return response.send(400).send({message: 'Need to signup!'});
		}
	}

	public async createUser(user: User) {
		await getRepository(User).insert(user);
	}

	public async checkEmail(email: string) {
		return await getRepository(User)
			.findOne({
				where: { email }
			})
			.then((user: User) => !!user);
	}

	public async checkLogin(login: string) {
		return await getRepository(User)
			.findOne({
				where: { login }
			})
			.then((user: User) => !!user);
	}

	public async getUserByEmailOrLogin(email: string, login: string): Promise<User> {
		try {
			return await getRepository(User)
				.findOne({
					where: [{ email }, { login }]
				})
				.then((user: User) => user);
		} catch (error) {
			console.log("Cannot get User by email!");
		}
	}
}
