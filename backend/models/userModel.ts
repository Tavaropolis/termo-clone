import mongoose from "mongoose";
import userSchema from "../schemas/userSchema.js";
import IUserSchema from "../interfaces/IUserSchema.js";

const User = mongoose.model<IUserSchema>("User", userSchema);

export default User;