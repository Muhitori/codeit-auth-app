const envConfig = require("./server/config/envConfig");

module.exports = {
	...envConfig,
	name: "default",
	type: "postgres",
	synchronize: false,
	entities: ["server/entities/*"],
	migrations: ["server/migrations/*"],
	cli: {
		entitiesDir: "server/entities",
		migrationsDir: "server/migrations",
	},
};
