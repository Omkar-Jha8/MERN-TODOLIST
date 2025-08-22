import express from "express";
import notesRoute from "./routes/notesRoute.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import rateLimiter from "./middleware/rateLimiter.js";
import cors from "cors"
import path from "path"

dotenv.config();

const app = express()

if (process.env.NODE_ENV !== "production") {
    app.use(
        cors({
            origin: "http://localhost:5173",
        })
    ); // Cross Site Resource Sharing allows you to share your data to the set origin
}
app.use(express.json()) //Middleware
app.use(rateLimiter)  //Middleware

app.use('/api/notes', notesRoute) // Routes Related to Notes

const PORT = process.env.PORT || 5001 // Port Where Server Will Start

const __dirname = path.resolve()

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")))

    app.get(/.*/, (req, res) => {
        res.sendFile(path.resolve(__dirname, "../frontend/dist/index.html"));
    });
}

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("Server Started at port 5001")
    })
})

