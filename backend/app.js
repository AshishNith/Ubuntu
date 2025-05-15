// server.js
import express from "express";
import cors from "cors";
import axios from "axios"; // ✅ Missing import added

const app = express();
const PORT = 5000; // ✅ Make sure you're running frontend on a different port like 5173

// CORS for frontend access
app.use(
  cors({
    origin: "http://localhost:5173", // ✅ match your frontend
    credentials: true,
  })
);

// ✅ Proxy route
app.get("/proxy", async (req, res) => {
  const url = req.query.url;
  if (!url) return res.status(400).send("URL is required");

  try {
    const response = await axios.get(url);
    res.set("Content-Type", "text/html");
    res.send(response.data);
  } catch (err) {
    console.error("Proxy fetch error:", err.message);
    res.status(500).send("Failed to fetch site");
  }
});

app.get("/search", async (req, res) => {
  const query = req.query.q;
  if (!query) return res.status(400).send("Query is required");

  const searchURL = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
  try {
    const response = await axios.get(searchURL);
    res.set("Content-Type", "text/html");
    res.send(response.data);
  } catch (err) {
    res.status(500).send("Search failed");
  }
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/temp", express.static("temp"));

// Your other routes
import cameraRouter from "./routers/camera.route.js";
app.use("/api/v1/camera", cameraRouter);

// ✅ Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
