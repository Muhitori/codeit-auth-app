import { Application, Request, Response, Router } from "express";
import { AuthController } from "../controllers/AuthController";
import { AuthMiddleware } from "../middlewares/AuthMiddleware";

class Routes {
	private controller: AuthController;
	private authMiddleware: AuthMiddleware;
	constructor() {
		this.controller = new AuthController();
		this.authMiddleware = new AuthMiddleware();
	}

	routes(app: Application): void {
		app.route("/")
			.get((request: Request, response: Response) => {
			response.status(200).send({
				message: "GET request successful.",
			});
		});

		app
			.route("/signup")
			.post([this.authMiddleware.checkJwt], this.controller.register)
    
		app
			.route("/signin")
			.post([this.authMiddleware.checkJwt], this.controller.login);
		
		app
			.route("/logout")
			.get([this.authMiddleware.checkJwt], this.controller.logout);
	}
}

export { Routes };
