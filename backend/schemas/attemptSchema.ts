import mongoose from "mongoose";
import IAttemptSchema from "../interfaces/IAttemptSchema";

const attemptSchema = new mongoose.Schema<IAttemptSchema>({
    ip: String,
    attempts: Number,
    lastAttempt: String
})

export default attemptSchema;