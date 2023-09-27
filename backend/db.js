import mongoose from "mongoose";

async function openDb() {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/USERBASE");
    } catch(e) {
        console.log(e);  
    }
}
  
export default openDb;
