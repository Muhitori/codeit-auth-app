import path from 'path';
import "reflect-metadata";
import { createConnection } from "typeorm";
import envConfig from "../config/config";
import { Country } from '../entities/Country';
import { User } from '../entities/User';

async function bootstrap() {
	try {
		const connection = await createConnection({
			...envConfig,
			port: 5432,
			type: "postgres",
			synchronize: false,
			logging: true,
			entities: [Country, User],
			migrations: [path.resolve(__dirname, "..", "migrations", "**")],
		});
		console.log("============== db connected ==============");
		const migrations = await connection.runMigrations();
		console.log("============== finished ==============");
		console.log(
			`============== ${migrations.length} were executed ==============`,
			migrations.map(({ name }) => name).join(", ")
		);
		process.exit(0);
	} catch (err) {
		console.error("Migration error");
		console.error(err);
		process.exit(1);
	}
}

bootstrap();
