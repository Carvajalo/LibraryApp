import express from "express";
import cors from "cors";
import morgan from "morgan";
import config from "./config";
import booksRouter from "./routes/book.routes";
import userRouter from "./routes/user.routes";

const app = express();

// Middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());


// Variables
app.set("PORT", config.PORT);

// Routes
app.use("/Books", booksRouter);
app.use("/Users", userRouter);


export default app;
