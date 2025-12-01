import express from "express";

import connectDatabase from "./config/dbconnect.js";
import routes from "./routes/index.js";
import { handleError } from "./middlewares/handleError.js";

const connection = await connectDatabase();

connection.on("error", (err) => {
  console.error("erro de conexão: ", err)
});

connection.once("open", () => {
  console.log("Conexão com o banco feita com sucesso!")
})

const app = express();
app.use(express.json())
routes(app)

app.use(handleError)

export default app;
