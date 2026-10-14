const express = require("express");
const cors = require("cors");
require("dotenv").config();
const strategyRoute = require("./routes/strategy");

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "GameMind AI API is running!",
  });
});


app.use("/api", strategyRoute);



app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});