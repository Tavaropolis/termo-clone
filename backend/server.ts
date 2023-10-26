//Importando bibliotecas
import express from "express";
import dotenv from 'dotenv';
import cors from "cors";

//Importando módulos
import router from "./routes/Routes.js";
import openDb from "./db.js";

dotenv.config();
const app = express();
const port: number | string = process.env.PORT || 5000;

const corsOption = {
  origin: 'http://127.0.0.1:5173'
}
app.use(cors(corsOption));
app.use(router);

openDb();

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
  })