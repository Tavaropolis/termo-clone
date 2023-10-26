import mongoose from "mongoose";
import IUserSchema from "../interfaces/IUserSchema.js";

const userSchema = new mongoose.Schema<IUserSchema>({
    username: String,
    password: String,
    email: String,
    salt: String,
    totalScore: Number,
})

export default userSchema;