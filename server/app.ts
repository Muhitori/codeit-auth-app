import express from "express";
import bodyParser from "body-parser";
import session from "express-session";
import { v4 } from 'uuid';
import crypto  from 'crypto';
import cors from "cors";
import { Routes } from "./routes/routes";
import path from 'path';
import makeConnection from "./connection/connection"

class App {
	public app: express.Application;
	routes: Routes;
	constructor() {
		this.app = express();
	}

	public async init() {
		await makeConnection();

		this.app.use(bodyParser.json());

		this.app.use(
			session({
				genid: () => {
					return crypto
						.createHash("sha256")
						.update(v4())
						.update(crypto.randomBytes(256))
						.digest("hex");
				},
				secret: "some secret",
				resave: false,
				saveUninitialized: true,
				cookie: { sameSite: "none", secure: true },
			})
		);

		this.app.use(cors());

		this.app.use(bodyParser.urlencoded({ extended: false }));

		this.routes = new Routes();
		this.routes.routes(this.app);

		this.app.use(express.static(path.resolve(`${__dirname}/../build`)));
		this.app.get("*", (req, res) => {
			res.sendFile(path.resolve(`${__dirname}/../build/index.html`));
		});
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