import { Application} from "express";
import { AuthController } from "../controllers/AuthController";
import { CountriesController } from "../controllers/CountriesController";

export class Routes {
	private authController: AuthController;
	private countriesController: CountriesController;
	constructor() {
		this.authController = new AuthController();
		this.countriesController = new CountriesController();
	}

	routes(app: Application): void {

		app.route("/api/auth/signup").post(this.authController.register);

		app.route("/api/auth/email").post(this.authController.checkEmail);

		app.route("/api/auth/login").post(this.authController.checkLogin);

		app.route("/api/auth/signin").post(this.authController.login);

		app
			.route("/api/countries")
			.get(this.countriesController.getCountryNames);
	}
}
