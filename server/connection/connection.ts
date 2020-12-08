import { createConnection} from "typeorm";
import path from 'path';
import fs from 'fs';
import { Country } from '../entities/Country';
import { User } from '../entities/User';
  
async function makeConnection() {
	const connection = await createConnection({
		username: process.env.POSTGRES_USER || "postgres",
		password: process.env.POSTGRES_PASSWORD || "postgres",
		database: process.env.POSTGRES_DATABASE || "userDB",
		host: process.env.POSTGRES_HOST || "localhost",
		port: 5432,
		type: "postgres",
		synchronize: false,
		entities: [Country, User],
		migrations: [path.resolve(__dirname, "..", "migrations", "**")],
		ssl: true,
		extra: {
			ssl: {
				rejectUnauthorized: false,
			},
		},
	});
}

export default makeConnection;
