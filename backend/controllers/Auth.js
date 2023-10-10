import jwt from "jsonwebtoken";
import 'dotenv/config';
import sanitize from "mongo-sanitize";

//Importando Models
import User from "../models/userModel.js";
import { sanitizeFilter } from "mongoose";

export async function authUser(req, res, next) {
    try {
        req.body = sanitize(req.body);
        const queryResponse = await User.findOne({username: req.body.user});

        if(!queryResponse) {
            res.status(400).send("User input is required");
        }

        const userResponse = {
            id: queryResponse.id,
            username: queryResponse.username, 
            password: queryResponse.password,
            token: jwt.sign( { ...queryResponse }, 
                process.env.TOKEN_KEY,
                {
                    expiresIn: "2h",
                })
        }

        res.status(200).json(userResponse);
    } catch(e) {
        console.log(e);
    }
}

export async function authToken(req, res, next) {
    try {
        req.body = sanitize(req.body);
        let token = req.body.token;
        const decoded = jwt.verify(token, process.env.TOKEN_KEY);
        console.log(decoded);
        if(decoded) {
            res.status(200).send("Bem vindo 😃");
        }
    } catch(e) {
        console.log(e);
    }
}
