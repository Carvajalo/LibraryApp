import express from "express";
import cors from "cors";
import morgan from "morgan";
import config from "./config";
import booksRouter from "./routes/book.routes";
import userRouter from "./routes/user.routes";
import loginRouter from "./routes/login.routes";
import requestRouter from "./routes/requestBooks.routes";
import cleanRouter from "./routes/clean.routes";

const app = express();

// Middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// Variables
app.set("PORT", config.PORT);

// Routes
app.use("/Books", requestRouter);
app.use("/Books", booksRouter);
app.use("/Users", userRouter);
app.use("/Users", loginRouter);
app.use("/Clean", cleanRouter);

export default app;
