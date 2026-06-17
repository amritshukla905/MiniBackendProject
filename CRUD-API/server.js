import express from "express";
//it is there to bring express package
import cors from "cors";
// cors allow fromtend and the backend to talk 
import userRoutes from  "./routes/users.js"

const app = express();

app.use(cors());
//Server, allow requests from frontend
app.use(express.json());

app.use("/users", userRoutes);

app.listen(3000, () => {
    console.log("Running → http://localhost:3000");
});