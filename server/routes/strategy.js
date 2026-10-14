const express = require("express");

const {
  generateStrategy,
} = require("../services/gemini");

const router = express.Router();

router.post("/strategy", async (req, res) => {
  try {
    const {
      game,
      character,
      situation,
    } = req.body;

    console.log("Game:", game);
    console.log("Character:", character);
    console.log("Situation:", situation);

    if (!game || !character || !situation) {
      return res.status(400).json({
        success: false,
        message: "Please provide game, character and situation.",
      });
    }

    console.log("Generating AI strategy...");

    const strategy = await generateStrategy({
      game,
      character,
      situation,
    });

    console.log("Strategy received from Gemini:");
    console.log(strategy);

    if (!strategy) {
      return res.status(500).json({
        success: false,
        message: "Gemini did not return a strategy.",
      });
    }

    res.json({
      success: true,
      strategy: strategy,
    });

  } catch (error) {
    console.error("AI Strategy Error:", error);

    res.status(500).json({
      success: false,
      message: error.message || "Failed to generate AI strategy.",
    });
  }
});


module.exports = router;