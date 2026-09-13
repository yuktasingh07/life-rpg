import QuestCard from "./QuestCard";

function QuestList({
  quests,
  completeQuest,
  deleteQuest
}) {

  return (
    <ul id="list">

      {quests.map((quest) => (

        <QuestCard
          key={quest.id}
          quest={quest}
          completeQuest={completeQuest}
          deleteQuest={deleteQuest}
        />

      ))}

    </ul>
  );
}

export default QuestList;