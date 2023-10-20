import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    salt: String,
    totalScore: Number,
})

export default userSchema;