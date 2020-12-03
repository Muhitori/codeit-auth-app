import * as express from "express";
import { Routes } from "./routes/Routes";
import bodyParser from "body-parser";
import cors from "cors";
import makeConnection from "./connection/connection";

class App {
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
}
export default new App().app;