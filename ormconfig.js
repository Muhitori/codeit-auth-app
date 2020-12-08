const envConfig = require("./server/config/envConfig.js");

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
