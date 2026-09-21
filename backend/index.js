import express from "express"
import dotenv from "dotenv"
import connectDb from "./configs/db.js"
import authRouter from "./routes/authRoute.js"
import cookieParser from "cookie-parser"
import cors from "cors"
import userRouter from "./routes/userRoute.js"
import courseRouter from "./routes/courseRoute.js"
import paymentRouter from "./routes/paymentRoute.js"
import aiRouter from "./routes/aiRoute.js"
import reviewRouter from "./routes/reviewRoute.js"
import { makeUploadDir } from "./utils/localFile.js"
dotenv.config()

makeUploadDir()

let app = express()
app.use(cors({
    origin: ["http://localhost:5173", "https://learning-management-system-sigma-two.vercel.app"],
    credentials: true
}))
app.use(express.json())
app.use(cookieParser())
app.use(express.static("public"))
app.use("/uploads", express.static("public/uploads"))
app.use("/api/auth", authRouter)
app.use("/api/user", userRouter)
app.use("/api/course", courseRouter)
app.use("/api/payment", paymentRouter)
app.use("/api/ai", aiRouter)
app.use("/api/review", reviewRouter)


app.get("/" , (req,res)=>{
    res.send("Hello From Server")
})

const PORT = process.env.PORT || 8000;

connectDb();
app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
});

