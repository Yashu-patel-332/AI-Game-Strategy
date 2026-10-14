import React from "react";

function StrategyResult({ result, game, character, saved, onSave }) {
  const sections = [
    {
      title: "🎯 Strategy",
      key: "Strategy",
    },
    {
      title: "⚔️ Build / Loadout",
      key: "Build / Loadout",
    },
    {
      title: "🗺️ Rotation / Gameplay",
      key: "Rotation / Gameplay",
    },
    {
      title: "🔥 Key Tips",
      key: "Key Tips",
    },
    {
      title: "⚠️ Mistakes to Avoid",
      key: "Mistakes to Avoid",
    },
  ];

  const getSectionContent = (key, index) => {
    const nextKey = sections[index + 1]?.key;

    let content = result;

    const startIndex = content.indexOf(key);

    if (startIndex === -1) {
      return "";
    }

    content = content.substring(startIndex + key.length);

    if (nextKey) {
      const endIndex = content.indexOf(nextKey);

      if (endIndex !== -1) {
        content = content.substring(0, endIndex);
      }
    }

    return content
      .replace(/^\s*[:\-–—*]+\s*/, "")
      .replace(/\*\*/g, "")
      .trim();
  };

  return (
    <section className="result-section">
      {/* RESULT HEADER */}

      <div className="result-header">
        <div>
          <span className="result-label">🤖 AI ANALYSIS</span>

          <h2>Game Strategy</h2>

          <p>
            {game} • {character}
          </p>
        </div>
        <div className="ai-badge">✨ AI Generated</div>
        <button className={`save-btn ${saved ? "saved" : ""}`} onClick={onSave}>
          {saved ? "✓ Saved" : "🔖 Save Strategy"}
        </button>
      </div>

      {/* RESULT SECTIONS */}

      <div className="result-cards">
        {sections.map((section, index) => {
          const content = getSectionContent(section.key, index);

          return (
            <div className="result-card" key={section.key}>
              <h3>{section.title}</h3>

              <p>{content || "No information available."}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default StrategyResult;
