import jwt from "jsonwebtoken";
import 'dotenv/config';
import sanitize from "mongo-sanitize";
import bcrypt from "bcrypt";

//Importando Models
import User from "../models/userModel.js";

export async function authUser(req, res, next) {
    try {
        req.body = sanitize(req.body);
        const queryResponse = await User.findOne({username: req.body.username});

        if(!queryResponse) {
            res.status(400).send("User input is required");
        }

        const matchPassword = bcrypt.compare(queryResponse.salt, req.body.password);

        if(!matchPassword) {
            res.status(400).send("Wrong password required");
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

export async function getUser(req, res, next) {
    try {
        req.body = sanitize(req.body);
        const queryResponse = await User.findOne({username: req.body.username});
        
        if(queryResponse) {
            res.status(200).json({status: "E", msg: "Usuário já cadastrado"});
        } else {
            res.status(200).json({status: "S", msg: "Usuário disponível"});
        }
    } catch(e) {
        console.log(e);
    }
}

export async function createUser(req, res, next) {
    try {
        req.body = sanitize(req.body);
        const salt = bcrypt.genSaltSync(10);
        console.log(salt);
        const hash = bcrypt.hashSync(req.body.password, salt);

        await User.create({username: req.body.username, password: hash, email: req.body.email, salt: salt, totalScore: 0});

        res.status(200).send("Usuário cadastrado 😝");
    } catch(e) {
        console.log(e);
    }
}