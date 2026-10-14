import { useState } from "react";
import "./App.css";
import { getStrategy } from "./services/api";
import StrategyResult from "./components/StrategyResult";

function App() {
  const [game, setGame] = useState("");
  const [character, setCharacter] = useState("");
  const [situation, setSituation] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);

  const handleStrategy = async () => {
    if (!game || !character || !situation) {
      setError("Please fill all fields.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const data = await getStrategy({
        game,
        character,
        situation,
      });

      console.log("FULL RESPONSE:", data);
      console.log("STRATEGY:", data.strategy);

      setResult(data.strategy || "No strategy received.");
      setSaved(false);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <header className="navbar">
        <div className="logo">
          🎮 GameMind <span>AI</span>
        </div>

        <div className="nav-badge">AI Gaming Assistant</div>
      </header>

      <main className="hero">
        <div className="hero-content">
          <div className="hero-icon">🎮</div>

          <h1>
            Master Your Game <span>With AI</span>
          </h1>

          <p>Get personalized gaming strategies powered by AI.</p>
        </div>

        <div className="strategy-card">
          <h2>Get Your Strategy</h2>

          <div className="form-group">
            <label>Game</label>

            <select value={game} onChange={(e) => setGame(e.target.value)}>
              <option value="">Choose Game</option>
              <option value="Mobile Legends">Mobile Legends</option>
              <option value="Free Fire">Free Fire</option>
              <option value="Minecraft">Minecraft</option>
              <option value="BGMI">BGMI</option>
            </select>
          </div>

          <div className="form-group">
            <label>Hero / Character</label>

            <input
              value={character}
              onChange={(e) => setCharacter(e.target.value)}
              placeholder="Enter your character"
            />
          </div>

          <div className="form-group">
            <label>Situation</label>

            <textarea
              rows="6"
              value={situation}
              onChange={(e) => setSituation(e.target.value)}
              placeholder="Describe your situation..."
            />
          </div>

          <button
            className="strategy-btn"
            onClick={handleStrategy}
            disabled={loading}
          >
            {loading ? "⚡ Analyzing..." : "⚡ Get AI Strategy"}
          </button>

          {error && <p className="error-message">⚠️ {error}</p>}
        </div>

        {/* RESULT */}
        {result && (
          <StrategyResult
            result={result}
            game={game}
            character={character}
            saved={saved}
            onSave={() => {
              const strategyData = {
                id: Date.now(),
                game,
                character,
                strategy: result,
                createdAt: new Date().toISOString(),
              };

              const existingStrategies =
                JSON.parse(localStorage.getItem("gameMindStrategies")) || [];

              localStorage.setItem(
                "gameMindStrategies",
                JSON.stringify([...existingStrategies, strategyData]),
              );

              setSaved(true);
            }}
          />
        )}
      </main>

      <footer className="footer">
        <p>&copy; 2026 GameMind AI. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
