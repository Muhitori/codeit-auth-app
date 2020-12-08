const envConfig =
	process.env.NODE_ENV === "production"
		? {
				username: process.env.POSTGRES_USER,
				password: process.env.POSTGRES_PASSWORD,
				database: process.env.POSTGRES_DATABASE,
				host: process.env.POSTGRES_HOST,
				ssl: true,
				extra: {
					ssl: {
						rejectUnauthorized: false,
					},
				},
		}
		: {
				username: "postgres",
				password: "postgres",
				database: "userDB",
				host: "127.0.0.1",
		};

module.exports = envConfig;
