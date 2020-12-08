import "reflect-metadata";
import App from "./app";

function bootstrap() {
  const app: App = new App();
  app.init();
  app.listen();
}

bootstrap();
