const envConfig = require("./server/config/config.js");

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
