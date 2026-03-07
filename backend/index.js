import express from "express";
import connectDB from "./config/db.js";
import cors from "cors";
import "dotenv/config";
import userRouter from "./routes/userRoutes.js";


const app = express();
const PORT = process.env.PORT ;

app.use(express.json());
app.use(cors());

await connectDB();

app.use('/user',userRouter)

app.get("/", (req, res) => {
    res.send(`Backend is working`);
});

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
});
