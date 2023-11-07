import mongoose from "mongoose";
import IWordSchema from "../interfaces/IWordSchema";

const wordSchema = new mongoose.Schema<IWordSchema>({
    word: String  
});

export default wordSchema;