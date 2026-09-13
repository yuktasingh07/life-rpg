import { useEffect, useState } from "react";

function QuestCard({
  quest,
  completeQuest,
  deleteQuest
}) {

  const [remaining, setRemaining] = useState(
    quest.targetTime - Date.now()
  );

  useEffect(() => {

    if (quest.completed) {
      return;
    }

    const timer = setInterval(() => {

      const difference = quest.targetTime - Date.now();

      setRemaining(difference);

    }, 1000);

    return () => clearInterval(timer);

  }, [quest.targetTime, quest.completed]);


  const getTimeLeft = () => {

    if (remaining <= 0) {
      return "⏰ Time's up!";
    }

    const d = Math.floor(remaining / 86400000);

    const h = Math.floor(
      (remaining % 86400000) / 3600000
    );

    const m = Math.floor(
      (remaining % 3600000) / 60000
    );

    const s = Math.floor(
      (remaining % 60000) / 1000
    );

    return `(${d > 0 ? d + "d " : ""}${h > 0 ? h + "h " : ""}${m}m ${s}s left)`;
  };


  return (
    <li
      className={quest.completed ? "checked" : ""}
      onClick={() => completeQuest(quest.id)}
    >

      <strong>{quest.name}</strong>

      {!quest.completed && (
        <small className="clock">
          {" - " + getTimeLeft()}
        </small>
      )}

      <span
        onClick={(e) => {
          e.stopPropagation();
          deleteQuest(quest.id);
        }}
      >
        ×
      </span>

    </li>
  );
}

export default QuestCard;
