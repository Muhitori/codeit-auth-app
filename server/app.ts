import express from "express";
import bodyParser from "body-parser";
import session from "express-session";
import { v4 } from 'uuid';
import crypto  from 'crypto';
import cors from "cors";
import { Routes } from "./routes/routes";
import makeConnection from "./connection/connection"

class App {
	public app: express.Application;
	routes: Routes;
	constructor() {
		this.app = express();

		makeConnection();

		this.app.use(bodyParser.json());

		this.app.use(session({
			genid: (req) => {
				return crypto
					.createHash("sha256")
					.update(v4())
					.update(crypto.randomBytes(256))
					.digest("hex");
			},
			secret: "some secret",
			resave: false,
			saveUninitialized: true,
			cookie:  { sameSite: 'none', secure: true }
		}));

		this.app.use(cors());

		this.app.use(bodyParser.urlencoded({ extended: false }));

		this.routes = new Routes();
		this.routes.routes(this.app);

	}

	public listen() {
		const PORT = process.env.PORT || 9000;
		const ENV = process.env.NODE_ENV || "development";

		this.app.listen(PORT, () => {
			process.stdout.write(`App listening on port ${PORT} in ${ENV} mode\n`);
		});
	}

}

export default App;