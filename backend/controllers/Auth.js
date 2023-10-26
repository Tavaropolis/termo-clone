import jwt from "jsonwebtoken";
import 'dotenv/config';
import sanitize from "mongo-sanitize";
import bcrypt from "bcrypt";

//Importando Models
import User from "../models/userModel.js";
import Attempt from "../models/attemptModel.js";

export async function getIpAttempt(req, res, next) {
    try {
        req.body = sanitize(req.body);
        const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
        const now = new Date();
        const actualDate = `${now.getDate()}/${now.getMonth()}/${now.getFullYear()}`;
        let loginAttempts = await Attempt.findOne({ip: ip}); 

        if(loginAttempts) {
            loginAttempts.attempts += 1;
            await loginAttempts.save();
        } else {
            await Attempt.create({ip: ip, attempts: 1, lastAttempt: actualDate});
            loginAttempts = await Attempt.findOne({ip: ip}); 
        }

        if(loginAttempts.attempts > 3 && loginAttempts.lastAttempt == actualDate) {
            return res.status(400).send("Limite de tentativas excedida");
        }
        
        next();
    } catch(e) {
        return res.status(500).json({msg: "Erro inesperado"});
    }
}

export async function checkPassword(req, res, next) {
    try {
        req.queryResponse = await User.findOne({username: req.body.username});

        if(!req.queryResponse) {
            return res.status(400).send("Invalid user");
        }

        const matchPassword = bcrypt.compare(req.queryResponse.salt, req.body.password);

        if(!matchPassword) {
            return res.status(400).send("Wrong password");
        }

        next();
    } catch(e) {
        return res.status(500).json({msg: "Erro inesperado"});
    }
}

export async function authUser(req, res, next) {
    try {
        const userResponse = {
            id: req.queryResponse.id,
            username: req.queryResponse.username, 
            password: req.queryResponse.password,
            token: jwt.sign( { ...req.queryResponse }, 
                process.env.TOKEN_KEY,
                {
                    expiresIn: "2h",
                })
        }
        return res.status(200).json(userResponse);
    } catch(e) {
        return res.status(500).json({msg: "Erro inesperado"});
    }
}

export async function authToken(req, res, next) {
    try {
        req.body = sanitize(req.body);
        let token = req.body.token;
        const decoded = jwt.verify(token, process.env.TOKEN_KEY);

        if(decoded) {
            let ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
            await Attempt.deleteOne({ip: ip});
            return res.status(200).send("Bem vindo 😃");
        }
    } catch(e) {
        return res.status(500).json({msg: "Erro inesperado"});
    }
}

export async function getUser(req, res, next) {
    try {
        req.body = sanitize(req.body);
        const queryResponse = await User.findOne({username: req.body.username});
        
        if(!queryResponse) {
            return res.status(200).json({msg: "Usuário disponível"});
        } else {
            return res.status(409).json({msg: "Usuário já cadastrado"});       
        }
    } catch(e) {
        return res.status(500).json({msg: "Erro inesperado"});
    }
}

export async function getEmail(req, res, next) {
    try {
        req.body = sanitize(req.body);
        const queryResponse = await User.findOne({email: req.body.email});
        
        if(!queryResponse) {
            return res.status(200).json({msg: "Email disponível"});
        } else {
            return res.status(409).json({msg: "Email já cadastrado"});
        }
    } catch(e) {
        return res.status(500).json({msg: "Erro inesperado"});
    }
}

export async function createUser(req, res, next) {
    try {
        req.body = sanitize(req.body);
        const salt = bcrypt.genSaltSync(10);
        console.log(salt);
        const hash = bcrypt.hashSync(req.body.password, salt);

        await User.create({username: req.body.username, password: hash, email: req.body.email, salt: salt, totalScore: 0});

        return res.status(201).send("Usuário cadastrado 😝");
    } catch(e) {
        return res.status(500).json({msg: "Erro inesperado"});
    }
}