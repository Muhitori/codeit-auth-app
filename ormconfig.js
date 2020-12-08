module.exports = {
	url: "postgres://deptpxctnrksxu:d3e43d392ea28fae6f1d692c3adca8be055c77e7e567a249ddbe8ecc51c23c00@ec2-54-75-248-49.eu-west-1.compute.amazonaws.com:5432/d8eikoefbc936b",
	ssl: true,
	extra: {
		ssl: {
			rejectUnauthorized: false,
		},
	},
	type: "postgres",
	synchronize: false,
	entities: ["server/entities/*"],
	migrations: ["server/migrations/*"],
	cli: {
		entitiesDir: "server/entities",
		migrationsDir: "server/migrations",
	},
};
