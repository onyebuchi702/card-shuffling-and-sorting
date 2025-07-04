const express = require("express");
const cors = require("cors");
const { createDeck, shuffleDeck, sortDeck } = require("./utils/card");
const { SORT_METHODS } = require("./constants/sortMethods");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

let currentDeck = createDeck();

const getRandomSortMethod = () => {
  const methods = Object.keys(SORT_METHODS);
  return methods[Math.floor(Math.random() * methods.length)];
};

app.get("/api/deck", (req, res) => {
  try {
    res.json({
      success: true,
      deck: currentDeck,
      count: currentDeck.length,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to retrieve deck",
    });
  }
});

app.post("/api/shuffle", (req, res) => {
  try {
    currentDeck = shuffleDeck([...currentDeck]);
    res.json({
      success: true,
      deck: currentDeck,
      action: "shuffled",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to shuffle deck",
    });
  }
});

app.post("/api/sort", (req, res) => {
  try {
    const sortMethod = getRandomSortMethod();
    currentDeck = sortDeck([...currentDeck], sortMethod);
    res.json({
      success: true,
      deck: currentDeck,
      action: "sorted",
      method: sortMethod,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to sort deck",
    });
  }
});

app.post("/api/reset", (req, res) => {
  try {
    currentDeck = createDeck();
    res.json({
      success: true,
      deck: currentDeck,
      action: "reset",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to reset deck",
    });
  }
});

app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: "Endpoint not found",
  });
});

app.use((error, req, res, next) => {
  console.error("Server error:", error);
  res.status(500).json({
    success: false,
    error: "Internal server error",
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
