
import { getConnection, Repository } from 'typeorm';
import { Request, Response } from "express";
import { User } from '../entities/User'
import { CountriesController } from './CountriesController';
import { UsersController } from './UsersController';

export class AuthController {
	private readonly repository: Repository<User>;
	private readonly countries: CountriesController;
	private readonly users: UsersController;

	constructor() {
		this.repository = getConnection().getRepository(User);
    this.countries = new CountriesController();
    this.users = new UsersController();
	}

  async login(request: Request, response: Response) {
    try {
      const requestUser = request.body;
      const isEmail = await this.users.checkEmail(requestUser.email);
      const isLogin = await this.users.checkLogin(requestUser.login);
      const isPassword = await this.users.checkPassword(requestUser.password);

      let user: User = null;

      if (isEmail && isPassword) {
        user = await this.users.getUserByEmail(requestUser.email);
      }

      if (isLogin && isPassword) {
        user = await this.users.getUserByLogin(requestUser.login);
      }

      return response.status(201).json({ message: "success", user });
    } catch (error) {
      console.log(error);
    }
	}

	async register(request: Request, response: Response) {
		try {
      let requestUser = request.body;
      const foreignEmail = requestUser.email;
      const foreignLogin = requestUser.login;
      
      const isEmail = await this.users.checkEmail(foreignEmail);
      const isLogin = await this.users.checkLogin(foreignLogin);
      
      if (isEmail || isLogin) {
        return response.status(501).json({message: "email or login already existed!"});
      }

			let user: User = new User();
			user.email = foreignEmail;
			user.login = foreignLogin;
			user.realName = requestUser.realName;
			user.password = requestUser.password;
			user.birthDate = requestUser.birthDate;
			user.countyId = await this.countries.getCountryIdByName(
				requestUser.country
      );
      
			await this.repository.insert(user);
			return response.status(201).json({ message: "success", user });
		} catch (error) {
			console.error("Error:", error);
			response.json(error);
		}
	}

	logout() {}
}