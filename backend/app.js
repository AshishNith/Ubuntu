import express from "express";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/temp", express.static("temp"));

// routes
import cameraRouter from "./routers/camera.route.js";

app.use("/api/v1/camera", cameraRouter);

export { app };