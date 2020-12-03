import express from "express";
import { Routes } from "./routes/Routes";
import bodyParser from "body-parser";
import cors from "cors";
import makeConnection from "./connection/connection";

export class App {
	public app: express.Application;
	routePrv: Routes;
	constructor() {
		this.app = express();
		this.app.use(bodyParser.json());
		this.app.use(cors());

		this.app.use(bodyParser.urlencoded({ extended: false }));

		this.routePrv = new Routes();
		this.routePrv.routes(this.app);

		makeConnection();
	}

	public listen() {
		const PORT = process.env.PORT || 9000;
		const ENV = process.env.NODE_ENV || "development";

		this.app.listen(PORT, () => {
			process.stdout.write(`App listening on port ${PORT} in ${ENV} mode\n`);
		});
	}

}