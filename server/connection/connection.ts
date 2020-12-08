import { createConnection} from "typeorm";
import  path  from 'path';
import { Country } from '../entities/Country';
import { User } from '../entities/User';
  
async function makeConnection() {
  const entitiesPath = path.resolve(__dirname, "..", "entities", "./**");
  const connection = await createConnection({
		username: "postgres" || process.env.POSTGRES_USER,
		password: "postgres" || process.env.POSTGRES_PASSWORD,
		database: "userDB" || process.env.POSTGRES_DATABASE,
		host: "127.0.0.1" || process.env.POSTGRES_HOST,
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
