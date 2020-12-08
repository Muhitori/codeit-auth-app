import app from "./app";


const PORT = process.env.PORT || 9000;
const ENV = process.env.NODE_ENV || "development";

app.listen(PORT, () => {
  process.stdout.write(`App listening on port ${PORT} in ${ENV} mode\n`);
});