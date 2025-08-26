import express from "express";
import dotenv from "dotenv";
import authRouter from "./routes/auth";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Rift SDK API Wrapper");
});

// Will be created in next steps
app.use("/api/auth", authRouter);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
