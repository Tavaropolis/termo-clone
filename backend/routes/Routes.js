//Importando bibliotecas
import express from "express";
import { Router } from "express";
import bodyParser from "body-parser";

//Importando Models
import User from "../models/userModel.js";

//Importando Controllers
import { getIpAttempt, checkPassword, authUser, authToken, getUser, getEmail, createUser } from "../controllers/Auth.js";
import { getEmailUser, sendEmail } from "../controllers/Recovery.js";

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

router.post('/login', urlencodedParser, getIpAttempt, checkPassword, authUser);
router.post('/authtoken', urlencodedParser, authToken);
router.post('/getUser', urlencodedParser, getUser);
router.post('/getEmail', urlencodedParser, getEmail);
router.put('/createUser', urlencodedParser, createUser);

router.post('/sendEmail', urlencodedParser, getEmailUser, sendEmail);

export default router;