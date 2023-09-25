//Importando bibliotecas
import express from "express";
import 'dotenv/config';

//Importando módulos
import router from "./routes/Routes.js";

const app = express();
const port = process.env.PORT || 5000;
app.use(router);

// app.get('/', (req, res) => {
//     res.send('Hello World!');
//   })

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
  })