import { createConnection, getConnection } from "typeorm";
import  path  from 'path';
import { Country } from '../entities/Country';
import { User } from '../entities/User';
  
async function makeConnection() {
  const entitiesPath = path.resolve(__dirname, "..", "entities", "./**{.ts,.js}");
  const connection = await createConnection({
		username: "postgres",
		password: "postgres",
		database: "userDB",
		host: "127.0.0.1",
		type: "postgres",
		synchronize: false,
		entities: [Country, User],
		migrations: [path.resolve(__dirname, "..", "migrations", "*.ts")],
	});
}

export default makeConnection;
