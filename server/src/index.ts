import express from "express";

const app = express();
const PORT = 5000;

app.use(express.json());

app.get("/api", (_req, res) => {
  res.send("Hello from server!");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
