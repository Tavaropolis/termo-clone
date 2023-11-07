import mongoose from "mongoose";
import wordSchema from "../schemas/wordSchema.js";
import IWordSchema from "../interfaces/IWordSchema.js";

const Word = mongoose.model<IWordSchema>("Word", wordSchema);

export default Word;