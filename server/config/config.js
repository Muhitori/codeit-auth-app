const envConfig =
	process.env.NODE_ENV === "production"
		? {
				username: "deptpxctnrksxu",
				password:
					"d3e43d392ea28fae6f1d692c3adca8be055c77e7e567a249ddbe8ecc51c23c00",
				database: "d8eikoefbc936b",
				host: "ec2-54-75-248-49.eu-west-1.compute.amazonaws.com",
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
