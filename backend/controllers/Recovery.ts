import { Request, Response, NextFunction } from 'express';

//Bibliotecas
import nodemailer from "nodemailer";
import sanitize from "mongo-sanitize";

//Models
import User from "../models/userModel.js";

export async function getEmailUser(req: Request, res: Response, next: NextFunction) {
    try {
        req.body = sanitize(req.body);

        if((/@.*\.com/.test(req.body.payload))) {
            req.body.queryResponse = await User.findOne({email: req.body.payload});
        } else {
            req.body.queryResponse = await User.findOne({username: req.body.payload});
        }

        if(!req.body.queryResponse) {
            return res.status(404).send("Usuário não encontrado");
        }

        next();
    } catch(e) {
        return res.status(500).json({msg: "Erro inesperado"});
    }
}

export async function sendEmail(req: Request, res: Response) {
    try {
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'tavaropolisgithub@gmail.com',
              pass: process.env.EMAIL_PASSWORD
            }
          });
          
        let mailOptions = {
            from: 'tavaropolisgithub@gmail.com',
            to: req.body.queryResponse.email,
            subject: 'Email de recuperação de senha',
            text: 'Deu certo 😊'
          };  
        
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
                return res.status(200).send("Email enviado 😊");
            }
        });
    } catch(e) {
        return res.status(500).json({msg: "Erro inesperado"});
    }
}