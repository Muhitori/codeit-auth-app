import { Application, Request, Response} from "express";
import { UsersController } from '../controllers/UsersController';
import { AuthController } from "../controllers/AuthController";
import { CountriesController } from '../controllers/CountriesController'
import { AuthMiddleware } from "../middlewares/AuthMiddleware";

class Routes {
	private authController: AuthController;
	private countriesController: CountriesController;
	private usersController: UsersController;
	private authMiddleware: AuthMiddleware;
	constructor() {
		this.authController = new AuthController();
		this.countriesController = new CountriesController();
		this.authMiddleware = new AuthMiddleware();
		this.usersController = new UsersController();
	}

	routes(app: Application): void {
		app.route("/").get((request: Request, response: Response) => {
			response.status(200).send({
				message: "GET request successful.",
			});
		});

		app.route("/signup").post(this.authController.register);

		app.route("/signup/:email").get(this.authController.checkEmail);

		app.route("/signup/:login").get(this.authController.checkLogin);

		app.route("/signin").post(this.authController.login);

		app
			.route("/signin/:emailOrLogin")
			.get(this.authController.checkEmailAndLogin);

		app
			.route("/logout")
			.get([this.authMiddleware.checkJwt], this.authController.logout);

		app.route("/countries").get(this.countriesController.getCountryNames);

		app
			.route("/user")
			.post([this.authMiddleware.checkJwt], this.usersController.getCurrentUser);
	}
}

export { Routes };
