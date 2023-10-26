import mongoose from "mongoose";
import attemptSchema from "../schemas/attemptSchema.js";
import IAttemptSchema from "../interfaces/IAttemptSchema.js";

const Attempt = mongoose.model<IAttemptSchema>("Attempt", attemptSchema);

export default Attempt;