import { Request, Response } from "express";
import jwt from 'jsonwebtoken';
import { User } from '../entities/User'
import { CountriesController } from './CountriesController';
import { UsersController } from './UsersController';
import config from "../config/secretConfig"


export class AuthController {
	async login(request: Request, response: Response) {
		try {
			const users = new UsersController();
			const { emailOrLogin, password } = request.body;

			const user: User = await users.getUserByEmailOrLogin(
				emailOrLogin,
				emailOrLogin
			);

			if (!user) {
				return response.status(201).send({ message: "Invalid email or login!" });
			}

			if (!user.unecryptedPasswordIsValid(password)) {
				return response.status(201).send({ message: "Invalid password!" });
			}

			const newToken = jwt.sign({ userId: user.id},
				config.jwtSecret, { expiresIn: "1h"});
			
			return response.json({
				accessToken: newToken,
				id: user.id,
				name: user.realName,
				email: user.email
			});
		} catch (error) {
			return response.status(400).json({ message: error.message })
		}
	}

	async register(request: Request, response: Response) {
		try {
			const users = new UsersController();
			const countries = new CountriesController();
			let requestUser = request.body.user;

			const countryId = await countries.getCountryIdByName(
				requestUser.countryName
			);

			let user: User = new User(
				requestUser.email,
				requestUser.login,
				requestUser.realName,
				requestUser.password,
				requestUser.birthDate,
				countryId
			);

			await user.hashPassword();

			const newToken = jwt.sign(
				{ userId: user.id},
				config.jwtSecret, { expiresIn: "1h"});

			await users.createUser(user);

			return response.json({
				accessToken: newToken,
				user: user.id,
				name: user.realName,
				email: user.email,
			});
		} catch (error) {
      return response.status(400).json({ message: error.message });
		}
	}

	async checkEmail(request: Request, response: Response) {
		const users = new UsersController();
		let isEmail = await users.checkEmail(request.body.email);

		if (!isEmail) {
			return response
				.status(200)
				.json({ message: "Email is is free!", isEmail });
		}
		return response
			.status(400)
			.json({ message: "Email is already taken!", isEmail });
	}

	async checkLogin(request: Request, response: Response) {
		const users = new UsersController();
		let isLogin = await users.checkEmail(request.body.login);

		if (!isLogin) {
			return response
				.status(200)
				.json({ message: "Login is is free!", isLogin });
		}
		return response
			.status(400)
			.json({ message: "Login is already taken!", isLogin });
	}

}