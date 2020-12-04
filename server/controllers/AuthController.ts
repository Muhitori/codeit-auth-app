import { Request, Response } from "express";
import jwt from 'jsonwebtoken';
import { User } from '../entities/User'
import { CountriesController } from './CountriesController';
import { UsersController } from './UsersController';
import config from "../config/config"
import Container, { Service } from 'typedi';

@Service()
export class AuthController {
	private readonly countries: CountriesController;
	private readonly users: UsersController;

	constructor() {
		this.countries = Container.get(CountriesController);
		this.users = Container.get(UsersController);
	}

	async login(request: Request, response: Response) {
		try {
			const { emailOrLogin, password } = request.body;

			const user: User = await this.users.getUserByEmailOrLogin(
				emailOrLogin,
				emailOrLogin
			);

			if (!user) {
				throw new Error("Email or login is invalid!");
			}

			if (!user.unecryptedPasswordIsValid(password)) {
				throw new Error("Invalid password!");
			}

			const newToken = jwt.sign({ userId: user.id, email: user.email, login: user.login }, config.jwtSecret, {
				expiresIn: "1h",
			});
			
			return response.send(newToken);
		} catch (error) {
			return response.status(400).json({ message: error.message })
		}
	}

	async register(request: Request, response: Response) {
		try {
			let requestUser = request.body as User;

			let user: User = new User(
				requestUser.email,
				requestUser.login,
				requestUser.realName,
				requestUser.password,
				requestUser.birthDate,
				await this.countries.getCountryIdByName(requestUser.country.name)
			);

			await user.hashPassword();

			const newToken = jwt.sign(
				{ userId: user.id, email: user.email, login: user.login },
				config.jwtSecret,
				{
					expiresIn: "1h",
				}
			);

			await this.users.createUser(user);

			return response.send(newToken);
		} catch (error) {
      return response.status(400).json({ message: error.message });
		}
	}

	async checkEmail(request: Request, response: Response) {
		let isEmail = this.users.checkEmail(request.body.email);

		if (isEmail) {
			return response
				.status(200)
				.json({ message: "Email is is free!", isEmail });
		}
		return response
			.status(400)
			.json({ message: "Email is already taken!", isEmail });
	}

	async checkLogin(request: Request, response: Response) {
		let isLogin = this.users.checkEmail(request.body.login);

		if (isLogin) {
			return response
				.status(200)
				.json({ message: "Login is is free!", isLogin });
		}
		return response
			.status(400)
			.json({ message: "Login is already taken!", isLogin });
	}

  async checkEmailAndLogin(request: Request, response: Response) {
    let isEmailOrLogin = this.users.checkEmailAndLogin(request.body.email, request.body.login);

    if (isEmailOrLogin) {
      return response
				.status(204)
				.json({ message: "Email and login field is correct!", isEmailOrLogin });
    }
    return response
			.status(400)
			.json({ message: "Email or login is invalid!", isEmailOrLogin });
  }

	logout(request: Request, response: Response) {
		request.session.destroy(() => {});
		return response.status(200).json({message: "Logged out."});
	}
}