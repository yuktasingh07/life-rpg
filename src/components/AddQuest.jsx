import { useState } from "react";

function AddQuest({ addQuest }) {

  const [name, setName] = useState("");
  const [time, setTime] = useState(1);
  const [unit, setUnit] = useState("minutes");

  const handleAdd = () => {

    if (name.trim() === "") {
      alert("You must write something");
      return;
    }

    addQuest(name, time, unit);

    setName("");
    setTime(1);
    setUnit("minutes");
  };

  return (
    <div className="row">

      <input
        type="text"
        placeholder="Add your work"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="number"
        min="1"
        value={time}
        onChange={(e) => setTime(e.target.value)}
      />

      <select
        value={unit}
        onChange={(e) => setUnit(e.target.value)}
      >
        <option value="minutes">Mins</option>
        <option value="hours">Hours</option>
        <option value="days">Days</option>
      </select>

      <button onClick={handleAdd}>
        Add
      </button>

    </div>
  );
}

export default AddQuest;