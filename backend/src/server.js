import  express from "express";
// const express = require("express");
import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import rateLimiter from "./middleware/rateLimiter.js";
import  cors from "cors";
import path from "path";

dotenv.config();

const app = express()
const PORT = process.env.PORT || 5001;
const __dirname = path.resolve()

// connectDB();

//middleware
if (process.env.NODE_ENV != "production") {
app.use(cors({
    origin:"http://localhost:5173",
})
 );
}
app.use(express.json()); //this middleware will parse JSON bodies:req.body
app.use(rateLimiter);
// app.use(cors({
//     origin:"http://localhost:5173",
// })
//  );
//our simple custom middleware
// app.use((req,res,next) => {
//     console.log(`Req method is ${req.method} & Req URL is ${req.url}`);
//     next(); 
// });

// health endpoint for readiness checks
app.get('/health', (req, res) => {
    return res.json({ status: 'ok', uptime: process.uptime() });
});

app.use("/api/notes",notesRoutes); 

if(process.env.NODE_ENV === "production") {
app.use(express.static(path.join(__dirname,"../frontend/dist")));

app.get("*",(req,res) => {
    res.sendFile(path.join(__dirname,"../frontend","dist","index.html"));
});
}

connectDB().then(()=> {
app.listen(PORT,() => {
    console.log("server started on port:",PORT);
    });
});
