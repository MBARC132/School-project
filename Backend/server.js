import express from "express";
import cors from "cors";
const app = express();
import conn from './db/conn.js';
import mysql from 'mysql2';
import { SchoolRoutes } from "./routes/school.router.js";
import path from "path";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
dotenv.config();
const PORT = process.env.PORT;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.get("/", (req, res) => {
    res.send("Server Start")
})
app.use("/schoolImages", express.static(path.join(__dirname, "schoolImages")));
app.use(express.json())
app.use(cors())
SchoolRoutes(app)
app.listen(PORT, ()=> {
    console.log("Server starts at port no :" + PORT)
})