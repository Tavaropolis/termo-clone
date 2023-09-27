import { Router } from "express";
import User from "../models/userModel.js";

const router = Router();

router.get('/', async (req, res) => {
    try {
        const usuarios = await User.find({});
        res.json(usuarios);
    } catch(e) {
        console.log(e);
    }
})

export default router;