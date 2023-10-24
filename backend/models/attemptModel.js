import mongoose from "mongoose";
import attemptSchema from "../schemas/attemptSchema.js";

const Attempt = mongoose.model("Attempt", attemptSchema);

export default Attempt;