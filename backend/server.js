//Importando bibliotecas
import express from "express";
import 'dotenv/config';

//Importando módulos
import router from "./routes/Routes.js";
import errorHandler from "./middleware/errorHandler.js";

const app = express();
const port = process.env.PORT || 5000;
app.use(router);


app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
  })