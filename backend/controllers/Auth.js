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
        const loginAttempts = await Attempt.findOne({ip: ip}); 

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
        console.log(e);
    }
}

export async function authUser(req, res, next) {
    try {
        const queryResponse = await User.findOne({username: req.body.username});

        if(!queryResponse) {
            return res.status(400).send("Invalid user");
        }

        const matchPassword = bcrypt.compare(queryResponse.salt, req.body.password);

        if(!matchPassword) {
            return res.status(400).send("Wrong password");
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

        return res.status(200).json(userResponse);
    } catch(e) {
        console.log(e);
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
        console.log(e);
    }
}

export async function getUser(req, res, next) {
    try {
        req.body = sanitize(req.body);
        const queryResponse = await User.findOne({username: req.body.username});
        
        if(queryResponse) {
            return res.status(200).json({status: "E", msg: "Usuário já cadastrado"});
        } else {
            return res.status(200).json({status: "S", msg: "Usuário disponível"});
        }
    } catch(e) {
        console.log(e);
    }
}

export async function getEmail(req, res, next) {
    try {
        req.body = sanitize(req.body);
        const queryResponse = await User.findOne({email: req.body.email});
        
        if(queryResponse) {
            return res.status(200).json({status: "E", msg: "Email já cadastrado"});
        } else {
            return res.status(200).json({status: "S", msg: "Email disponível"});
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

        return res.status(200).send("Usuário cadastrado 😝");
    } catch(e) {
        console.log(e);
    }
}