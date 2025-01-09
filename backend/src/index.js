import express from "express";
import authRoutes from "./routes/auth.route.js"
import dotenv from "dotenv";
import {connectDb} from "./libs/db.js";


dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use("/api/auth",authRoutes);

app.listen(port, ()=> {
  console.log('Server is running on port ' + port );
  connectDb()
})
