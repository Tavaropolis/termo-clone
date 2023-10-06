//Importando bibliotecas
import express from "express";
import { Router } from "express";
import bodyParser from "body-parser";

//Importando Models
import User from "../models/userModel.js";

const router = Router();

// create application/json parser
const app = express();
app.use(bodyParser.json());
 
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });

router.get('/', async (req, res) => {
    try {
        const usuarios = await User.find({});
        res.json(usuarios);
    } catch(e) {
        console.log(e);
    }
})

router.post('/user', urlencodedParser, async (req, res) => {
    console.log(req.body);
    res.json(req.body);
})

export default router;