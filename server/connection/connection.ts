import { createConnection} from "typeorm";
import path from 'path';
import { Country } from '../entities/Country';
import { User } from '../entities/User';
import envConfig from '../config/config';
  
function makeConnection() {
	const connection = createConnection({
		...envConfig,
		port: 5432,
		type: "postgres",
		synchronize: false,
		entities: [Country, User],
		migrations: [path.resolve(__dirname, "..", "migrations", "**")],
	});
}

export default makeConnection;
