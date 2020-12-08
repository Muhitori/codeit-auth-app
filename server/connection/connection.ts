import { createConnection} from "typeorm";
import  path  from 'path';
import { Country } from '../entities/Country';
import { User } from '../entities/User';
  
async function makeConnection() {
  const connection = await createConnection({
		username: process.env.POSTGRES_USER,
		password: process.env.POSTGRES_PASSWORD,
		database: process.env.POSTGRES_DATABASE,
		host: process.env.POSTGRES_HOST,
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
	console.log(connection);
}

export default makeConnection;
