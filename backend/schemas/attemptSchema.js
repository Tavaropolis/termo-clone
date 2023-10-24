import mongoose from "mongoose";

const attemptSchema = new mongoose.Schema({
    ip: String,
    attempts: Number,
    lastAttempt: String
})

export default attemptSchema;