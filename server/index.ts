import "reflect-metadata";
import App from "./app";

function bootstrap() {
  const app: App = new App();
  app.init().then(() => {
    app.listen();
  })
}

bootstrap();
