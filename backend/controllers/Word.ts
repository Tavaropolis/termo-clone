import { Request, Response, NextFunction } from 'express';

//Bibliotecas
import sanitize from "mongo-sanitize";

//Models 
import Word from "../models/wordModel.js";

export async function getRandomWord(req: Request, res: Response, next: NextFunction) {
    try {
        const words = await Word.find({});
        const index = Math.floor(Math.random() * words.length);
        return res.status(200).json(words[index]);
    } catch(e) {
        return res.status(500).json({msg: "Erro inesperado"});
    }
}