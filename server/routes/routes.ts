import { Application, Request, Response } from "express";
import { AuthController } from "../controllers/AuthController";
import { CountriesController } from "../controllers/CountriesController";
import path from 'path';

export class Routes {
	private authController: AuthController;
	private countriesController: CountriesController;
	constructor() {
		this.authController = new AuthController();
		this.countriesController = new CountriesController();
	}

	routes(app: Application): void {

		app.route("/signup").post(this.authController.register);

		app.route("/email").post(this.authController.checkEmail);

		app.route("/login").post(this.authController.checkLogin);

		app.route("/signin").post(this.authController.login);

		app.route("/countries").get(this.countriesController.getCountryNames);
	}
}
