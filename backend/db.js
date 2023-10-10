import mongoose from "mongoose";
import 'dotenv/config';

async function openDb() {
    try {
        await mongoose.connect(process.env.DB_URL);
    } catch(e) {
        console.log(e);  
    }
}
  
export default openDb;
