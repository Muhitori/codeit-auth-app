import { createConnection } from "typeorm";
import  path  from 'path';
  
async function makeConnection () {
  const connection = await createConnection({
    username: "postgres",
    password: "postgres",
    database: "userDB",
    host: "127.0.0.1",
    name: "default",
    type: "postgres",
    synchronize: false,
    entities: [path.resolve(__dirname, "entities", "*")],
    migrations: [path.resolve(__dirname, "migrations", "*")],
  });
}

export default makeConnection;
