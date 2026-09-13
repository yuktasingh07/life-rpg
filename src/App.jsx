import { useState } from "react";
import "./App.css";
import "./login.css";

import AddQuest from "./components/AddQuest";
import QuestList from "./components/QuestList";
import Points from "./components/Points";
import Character from "./components/Character";

function App() {
  const [currentUser, setCurrentUser] = useState(() =>
    localStorage.getItem("lifeRPG_currentUser") || ""
  );
  const storageKey = (key) => `lifeRPG_${currentUser}_${key}`;

  const [quests, setQuests] = useState(() => {
    const saved = localStorage.getItem(`lifeRPG_${localStorage.getItem("lifeRPG_currentUser") || "guest"}_quests`);
    return saved ? JSON.parse(saved) : [];
  });

  const [points, setPoints] = useState(() => {
    return Number(localStorage.getItem(`lifeRPG_${localStorage.getItem("lifeRPG_currentUser") || "guest"}_points`)) || 0;
  });

  const [coins, setCoins] = useState(() => {
    return Number(localStorage.getItem(`lifeRPG_${localStorage.getItem("lifeRPG_currentUser") || "guest"}_coins`)) || 0;
  });

  const [streak, setStreak] = useState(() => {
    return Number(localStorage.getItem(`lifeRPG_${localStorage.getItem("lifeRPG_currentUser") || "guest"}_streak`)) || 0;
  });

  const [page, setPage] = useState("quests");

  const [showCelebration, setShowCelebration] = useState(false);
  const [newLevel, setNewLevel] = useState(1);
  const [showFlowers, setShowFlowers] = useState(false);
  const [message, setMessage] = useState("");

  // SAVE DATA
  const saveData = (key, value) => {
    localStorage.setItem(storageKey(key), JSON.stringify(value));
  };

  const login = (username) => {
    const cleanName = username.trim().toLowerCase().replace(/[^a-z0-9_-]/g, "");
    if (!cleanName) return;
    localStorage.setItem("lifeRPG_currentUser", cleanName);
    setCurrentUser(cleanName);
    window.location.reload();
  };

  const logout = () => {
    localStorage.removeItem("lifeRPG_currentUser");
    setCurrentUser("");
    window.location.reload();
  };

  if (!currentUser) {
    return <LoginScreen onLogin={login} />;
  }

  const addQuest = (name, time, unit) => {
    let factor = 60000;

    if (unit === "hours") {
      factor = 3600000;
    }

    if (unit === "days") {
      factor = 86400000;
    }

    const newQuest = {
      id: Date.now(),
      name,
      time,
      unit,
      targetTime: Date.now() + Number(time) * factor,
      completed: false
    };

    const updatedQuests = [...quests, newQuest];

    setQuests(updatedQuests);
    saveData("lifeRPG_quests", updatedQuests);
  };

  const completeQuest = (id) => {
    const quest = quests.find((q) => q.id === id);

    if (!quest) return;

    if (!quest.completed) {
      const oldLevel =
        Math.floor(points / 100) + 1;

      const newPoints = points + 20;

      const updatedLevel =
        Math.floor(newPoints / 100) + 1;

      const newCoins = coins + 10;
      const newStreak = streak + 1;

      setPoints(newPoints);
      setCoins(newCoins);
      setStreak(newStreak);

      saveData("lifeRPG_points", newPoints);
      saveData("lifeRPG_coins", newCoins);
      saveData("lifeRPG_streak", newStreak);

      setShowFlowers(true);

      setTimeout(() => {
        setShowFlowers(false);
      }, 2500);

      if (updatedLevel > oldLevel) {
        setNewLevel(updatedLevel);
        setShowCelebration(true);

        setTimeout(() => {
          setShowCelebration(false);
        }, 5000);
      }
    } else {
      const newPoints = Math.max(0, points - 20);
      const newCoins = Math.max(0, coins - 10);
      const newStreak = Math.max(0, streak - 1);

      setPoints(newPoints);
      setCoins(newCoins);
      setStreak(newStreak);

      saveData("lifeRPG_points", newPoints);
      saveData("lifeRPG_coins", newCoins);
      saveData("lifeRPG_streak", newStreak);
    }

    const updatedQuests = quests.map((quest) =>
      quest.id === id
        ? {
            ...quest,
            completed: !quest.completed
          }
        : quest
    );

    setQuests(updatedQuests);
    saveData("lifeRPG_quests", updatedQuests);
  };

  const deleteQuest = (id) => {
    const updatedQuests = quests.filter(
      (quest) => quest.id !== id
    );

    setQuests(updatedQuests);
    saveData("lifeRPG_quests", updatedQuests);
  };

  const buyItem = (itemName, price) => {
    if (coins >= price) {
      const newCoins = coins - price;

      setCoins(newCoins);
      saveData("lifeRPG_coins", newCoins);

      setMessage(
        `${itemName} purchased successfully!`
      );

      setTimeout(() => {
        setMessage("");
      }, 2000);
    } else {
      setMessage("Not enough coins!");

      setTimeout(() => {
        setMessage("");
      }, 2000);
    }
  };

  return (
    <div className="app-layout">

      <aside className="sidebar">

        <div className="logo">
          ⚔️ <span>Life RPG</span>
        </div>

        <div className="user-profile">
          <span className="user-avatar">{currentUser[0]?.toUpperCase()}</span>
          <div>
            <strong>{currentUser}</strong>
            <small>Saved profile</small>
          </div>
          <button onClick={logout}>Log out</button>
        </div>

        <nav>

          <button
            className={
              page === "quests"
                ? "nav-item active"
                : "nav-item"
            }
            onClick={() => setPage("quests")}
          >
            ⚔️ Quests
          </button>

          <button
            className={
              page === "points"
                ? "nav-item active"
                : "nav-item"
            }
            onClick={() => setPage("points")}
          >
            ⭐ Points
          </button>

          <button
            className={
              page === "rewards"
                ? "nav-item active"
                : "nav-item"
            }
            onClick={() => setPage("rewards")}
          >
            🎁 Rewards
          </button>

          <button
            className={
              page === "character"
                ? "nav-item active"
                : "nav-item"
            }
            onClick={() => setPage("character")}
          >
            👤 Character
          </button>

          <button
            className={
              page === "shop"
                ? "nav-item active"
                : "nav-item"
            }
            onClick={() => setPage("shop")}
          >
            🛍️ Shop
          </button>

        </nav>
      </aside>

      <main className="main-content">

        {page === "quests" && (
          <div className="todo">

            <h2>
              👑 To-Do List

              <img
                src="/assets/to-do-list.png"
                alt="todo"
              />

              <img
                src="/assets/easter-bunny.png"
                alt="rabbit"
              />
            </h2>

            <AddQuest addQuest={addQuest} />

            <QuestList
              quests={quests}
              completeQuest={completeQuest}
              deleteQuest={deleteQuest}
            />

          </div>
        )}

        {page === "points" && (
          <Points
            points={points}
            coins={coins}
            streak={streak}
          />
        )}

        {page === "rewards" && (
          <div className="rewards-page">

            <div className="rewards-header">

              <p className="page-label">
                ACHIEVEMENTS
              </p>

              <h1>🎁 Rewards</h1>

              <p>
                Complete quests and earn XP
                to unlock special rewards.
              </p>

            </div>

            <div className="reward-big-grid">

              <div
                className={
                  points >= 100
                    ? "big-reward unlocked"
                    : "big-reward locked"
                }
              >

                <div className="big-reward-icon">
                  🌸
                </div>

                <h2>Flower Badge</h2>

                <p>Reach 100 XP</p>

                <span>
                  {points >= 100
                    ? "✓ UNLOCKED"
                    : "🔒 100 XP"}
                </span>

              </div>

              <div
                className={
                  points >= 200
                    ? "big-reward unlocked"
                    : "big-reward locked"
                }
              >

                <div className="big-reward-icon">
                  👑
                </div>

                <h2>Golden Crown</h2>

                <p>Reach 200 XP</p>

                <span>
                  {points >= 200
                    ? "✓ UNLOCKED"
                    : "🔒 200 XP"}
                </span>

              </div>

              <div
                className={
                  points >= 300
                    ? "big-reward unlocked"
                    : "big-reward locked"
                }
              >

                <div className="big-reward-icon">
                  ✨
                </div>

                <h2>Magic Glow</h2>

                <p>Reach 300 XP</p>

                <span>
                  {points >= 300
                    ? "✓ UNLOCKED"
                    : "🔒 300 XP"}
                </span>

              </div>

            </div>
          </div>
        )}

        {page === "character" && (
          <Character
            points={points}
            coins={coins}
            setCoins={(value) => {
              setCoins(value);

              if (typeof value === "function") {
                setCoins((prev) => {
                  const result = value(prev);
                  saveData("lifeRPG_coins", result);
                  return result;
                });
              } else {
                saveData("lifeRPG_coins", value);
              }
            }}
          />
        )}

        {page === "shop" && (
          <div className="shop-page">

            <p className="page-label">
              ITEM SHOP
            </p>

            <h1>🛍️ Shop</h1>

            <p className="shop-subtitle">
              Spend your coins on special items.
            </p>

            <div className="shop-coins">
              🪙 Coins: <strong>{coins}</strong>
            </div>

            {message && (
              <div className="shop-message">
                {message}
              </div>
            )}

            <div className="shop-grid">

              <div className="shop-card">

                <div className="shop-icon">
                  🌸
                </div>

                <h2>Flower Badge</h2>

                <p>Show your achievement</p>

                <button
                  onClick={() =>
                    buyItem("Flower Badge", 50)
                  }
                >
                  🪙 50
                </button>

              </div>

              <div className="shop-card">

                <div className="shop-icon">
                  👑
                </div>

                <h2>Golden Crown</h2>

                <p>Royal character item</p>

                <button
                  onClick={() =>
                    buyItem("Golden Crown", 100)
                  }
                >
                  🪙 100
                </button>

              </div>

              <div className="shop-card">

                <div className="shop-icon">
                  ✨
                </div>

                <h2>Magic Glow</h2>

                <p>Give your character a glow</p>

                <button
                  onClick={() =>
                    buyItem("Magic Glow", 150)
                  }
                >
                  🪙 150
                </button>

              </div>

            </div>
          </div>
        )}

      </main>

      {showFlowers && (
        <div className="flower-rain">

          <span>🌸</span>
          <span>🌸</span>
          <span>🌼</span>
          <span>🌸</span>
          <span>🌺</span>
          <span>🌸</span>
          <span>🌼</span>
          <span>🌸</span>
          <span>🌺</span>
          <span>🌸</span>

        </div>
      )}

      {showCelebration && (
        <div className="celebration">

          <div className="confetti confetti-1">
            🌸
          </div>

          <div className="confetti confetti-2">
            ✨
          </div>

          <div className="confetti confetti-3">
            🌸
          </div>

          <div className="confetti confetti-4">
            🎉
          </div>

          <div className="confetti confetti-5">
            ✨
          </div>

          <div className="confetti confetti-6">
            🌸
          </div>

          <div className="confetti confetti-7">
            🎊
          </div>

          <div className="confetti confetti-8">
            🌸
          </div>

          <div className="celebration-box">

            <div className="celebration-stars">
              ✨ ⭐ ✨
            </div>

            <h1>LEVEL UP!</h1>

            <div className="level-number">
              {newLevel}
            </div>

            <h2>
              🎉 Congratulations! 🎉
            </h2>

            <p>
              You unlocked Level {newLevel}!
            </p>

            <div className="celebration-flowers">
              🌸 🌸 🌸
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

function LoginScreen({ onLogin }) {
  const [username, setUsername] = useState("");

  const submit = (event) => {
    event.preventDefault();
    onLogin(username);
  };

  return (
    <main className="login-screen">
      <section className="login-card">
        <div className="login-mark">⚔️</div>
        <p className="page-label">WELCOME BACK, HERO</p>
        <h1>Life RPG</h1>
        <p className="login-subtitle">Sign in with your username to continue your saved adventure.</p>
        <form onSubmit={submit}>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            placeholder="Enter your username"
            autoComplete="username"
            required
          />
          <button type="submit">Enter My RPG</button>
        </form>
        <small className="login-note">Your quests, points, coins, and progress are saved separately for this browser profile.</small>
      </section>
    </main>
  );
}

export default App;
