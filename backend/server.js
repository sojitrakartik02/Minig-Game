const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require("cors");

let winControl = "lose";

app.use(cors());

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

app.post("/set-win-control", (req, res) => {
  winControl = req.body.control;
  res.json({ status: "success" });
});

app.get("/get-win-control", (req, res) => {
  res.json({ control: winControl });
});
app.post("/reveal-tiles", (req, res) => {
  const { index } = req.body;
  const tiles = Array(30).fill("green");
  let redTilesCount, isWin;

  if (winControl === "win") {
    isWin = true;
    redTilesCount = Math.floor(Math.random() * 4) + 3;
  } else if (winControl === "lose") {
    isWin = false;
    redTilesCount = Math.floor(Math.random() * 4) + 2;
  } else {
    isWin = Math.random() > 0.5;
    redTilesCount = isWin
      ? Math.floor(Math.random() * 4) + 3
      : Math.floor(Math.random() * 4) + 2;
  }

  const chosenIndexes = new Set();
  chosenIndexes.add(index);

  while (chosenIndexes.size < redTilesCount + 1) {
    chosenIndexes.add(Math.floor(Math.random() * 30));
  }

  chosenIndexes.forEach((i) => {
    tiles[i] = i === index ? (isWin ? "green" : "red") : "red";
  });

  res.json({ tiles });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
