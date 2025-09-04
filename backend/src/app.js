import express from "express";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";

import restaurantRoutes from "./routes/restaurant.route.js";
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

app.use("/api/restaurantes", restaurantRoutes);
app.use("/api/usuarios", userRoutes);
app.use("/api/auth", authRoutes);

export default app;
