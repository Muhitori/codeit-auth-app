module.exports = {
  url: `postgres://${process.env.POSTGRES_USER}
  :${process.env.POSTGRES_PASSWORD}
  @${process.env.POSTGRES_HOST}
  :5432/${process.env.POSTGRES_DATABASE}`,
	ssl: true,
	extra: {
		ssl: {
			rejectUnauthorized: false,
		},
	},
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
