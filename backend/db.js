import mongoose from "mongoose";

async function openDb() {
    try {
        await mongoose.connect(process.env.DB_URL);
    } catch(e) {
        console.log(e);  
    }
}
  
export default openDb;
