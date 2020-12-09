import "reflect-metadata";
import App from "./app";

async function bootstrap() {
  const app: App = new App();
  await app.init();
  app.listen();
}

bootstrap();
