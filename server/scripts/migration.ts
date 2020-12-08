import path from 'path';
import "reflect-metadata";
import { createConnection } from "typeorm";
import { Country } from '../entities/Country';
import { User } from '../entities/User';

async function bootstrap() {
	try {
		const connection = await createConnection({
			username: "deptpxctnrksxu",
			password:
				"d3e43d392ea28fae6f1d692c3adca8be055c77e7e567a249ddbe8ecc51c23c00",
			database: "d8eikoefbc936b",
			host: "ec2-54-75-248-49.eu-west-1.compute.amazonaws.com",
			port: 5432,
			type: "postgres",
			synchronize: false,
			logging: true,
			entities: [Country, User],
			migrations: [path.resolve(__dirname, "..", "migrations", "**")],
			ssl: true,
			extra: {
				ssl: {
					rejectUnauthorized: false,
				},
			},
		});
		console.log("============== db connected ==============");
		const migrations = await connection.runMigrations();
		console.log("============== finished ==============");
		console.log(
			`============== ${migrations.length} were executed ==============`,
		migrations.map(({ name }) => name).join(", "));
		process.exit(0);
	} catch (err) {
		console.error("Migration error");
		console.error(err);
		process.exit(1);
	}
}

bootstrap();
