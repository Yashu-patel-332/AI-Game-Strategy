const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const generateStrategy = async ({
  game,
  character,
  situation,
}) => {
  const prompt = `
You are an expert gaming strategy coach.

Analyze the player's gaming situation and provide useful,
practical and easy-to-follow strategy.

Game:
${game}

Hero / Character:
${character}

Player Situation:
${situation}

Provide the response using this structure:

🎯 Strategy
Explain the best overall strategy.

⚔️ Build / Loadout
Recommend an appropriate build, equipment, skills,
or loadout when applicable.

🗺️ Rotation / Gameplay
Explain what the player should do during the game.

🔥 Key Tips
Give 3-5 important tips.

⚠️ Mistakes to Avoid
Mention common mistakes the player should avoid.

Keep the response concise, practical and gaming-focused.
Do not invent game mechanics when you are uncertain.
`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  console.log("Gemini RAW RESPONSE:");
  console.log(response);

  const text = response.text;

  console.log("Gemini TEXT:");
  console.log(text);

  if (!text) {
    throw new Error("Gemini returned an empty response.");
  }

  return text;
};

module.exports = {
  generateStrategy,
};