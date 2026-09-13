function Points({ points, coins, streak }) {
  const level = Math.floor(points / 100) + 1;
  const currentXP = points % 100;

  return (
    <div className="points-page">
      <div className="points-header">
        <div>
          <p className="page-label">PLAYER PROGRESS</p>
          <h1>⭐ Points & Rewards</h1>
        </div>

        <div className="total-xp">
          <span>Total XP</span>
          <strong>{points}</strong>
        </div>
      </div>

      <div className="level-card">
        <div className="level-circle">
          <span>LVL</span>
          <strong>{level}</strong>
        </div>

        <div className="level-details">
          <div className="level-top">
            <h2>Level {level}</h2>
            <span>{currentXP} / 100 XP</span>
          </div>

          <div className="xp-bar">
            <div
              className="xp-fill"
              style={{ width: `${currentXP}%` }}
            ></div>
          </div>

          <p>
            {100 - currentXP} XP needed for the next level
          </p>
        </div>
      </div>

      {/* STATS */}
      <div className="stats">

        {/* Total XP */}
        <div className="stat-card">
          <span className="stat-icon">🏆</span>
          <div>
            <strong>{points}</strong>
            <p>Total XP Earned</p>
          </div>
        </div>

        {/* Current Level */}
        <div className="stat-card">
          <span className="stat-icon">⚔️</span>
          <div>
            <strong>{level}</strong>
            <p>Current Level</p>
          </div>
        </div>

        {/* Coins */}
        <div className="stat-card">
          <span className="stat-icon">🪙</span>
          <div>
            <strong>{coins}</strong>
            <p>Coins</p>
          </div>
        </div>

        {/* Streak */}
        <div className="stat-card">
          <span className="stat-icon">🔥</span>
          <div>
            <strong>{streak}</strong>
            <p>Quest Streak</p>
          </div>
        </div>

      </div>

      <div className="rewards-section">
        <div className="section-heading">
          <div>
            <p className="page-label">ACHIEVEMENTS</p>
            <h2>🎁 Rewards</h2>
          </div>

          <span>Complete quests to unlock</span>
        </div>

        <div className="reward-grid">

          <div
            className={
              points >= 100
                ? "reward unlocked"
                : "reward locked"
            }
          >
            <div className="reward-icon">🌸</div>
            <h3>Flower Badge</h3>
            <p>Reach 100 XP</p>

            {points >= 100 ? (
              <small>✓ UNLOCKED</small>
            ) : (
              <small>🔒 100 XP</small>
            )}
          </div>

          <div
            className={
              points >= 200
                ? "reward unlocked"
                : "reward locked"
            }
          >
            <div className="reward-icon">👑</div>
            <h3>Golden Crown</h3>
            <p>Reach 200 XP</p>

            {points >= 200 ? (
              <small>✓ UNLOCKED</small>
            ) : (
              <small>🔒 200 XP</small>
            )}
          </div>

          <div
            className={
              points >= 300
                ? "reward unlocked"
                : "reward locked"
            }
          >
            <div className="reward-icon">✨</div>
            <h3>Magic Glow</h3>
            <p>Reach 300 XP</p>

            {points >= 300 ? (
              <small>✓ UNLOCKED</small>
            ) : (
              <small>🔒 300 XP</small>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}

export default Points;