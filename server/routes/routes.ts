import { Application, Request, Response } from "express";
import { AuthController } from "../controllers/AuthController";

class Routes {
	private controller: AuthController;
	constructor() {
		this.controller = new AuthController();
	}

	routes(app: Application): void {
		app.route("/").get((request: Request, response: Response) => {
			response.status(200).send({
				message: "GET request successful.",
			});
		});

		app
      .route("/users")
    
		app
			.route("/users/:userId")
	}
}

export { Routes };
