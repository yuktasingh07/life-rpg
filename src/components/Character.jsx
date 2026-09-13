import { useState } from "react";
import "../character-3d.css";

const characters = [
  {
    id: "kael",
    name: "Kael",
    role: "Blade Runner",
    description: "A confident champion built for bold quests.",
    skin: "#c8845d",
    hair: "#241a2f",
    accent: "#62d9ff",
    accentDark: "#287fae",
    gender: "male",
    render: "/characters/kael.png",
    royalRender: "/characters/kael-prince.png"
  },
  {
    id: "aria",
    name: "Aria",
    role: "Moon Mage",
    description: "A clever spellcaster with a fearless heart.",
    skin: "#e0a47d",
    hair: "#5a263c",
    accent: "#d99aff",
    accentDark: "#824ec0",
    gender: "female",
    render: "/characters/aria.png",
    royalRender: "/characters/aria-princess.png"
  }
];

const outfits = [
  {
    id: "adventure",
    name: "Adventure Set",
    description: "A practical quest-ready look.",
    price: 0,
    top: "#4e77d5",
    bottom: "#202b55",
    trim: "#ffd86b"
  },
  {
    id: "royal",
    name: "Princess Dress",
    maleName: "Prince Suit",
    description: "A shining royal outfit for special rewards.",
    price: 50,
    top: "#a95cdb",
    bottom: "#4a236f",
    trim: "#ffd86b"
  }
];

function Avatar({ character, outfit, large = false }) {
  const render = outfit.id === "royal" && character.royalRender ? character.royalRender : character.render;

  if (render) {
    return (
      <div className={`avatar-render-wrap outfit-render-${outfit.id} ${large ? "avatar-render-large" : "avatar-render-small"}`}>
        <img className="avatar-render" src={render} alt={`${character.name} ${outfit.name} 3D hero`} />
        <span className="outfit-render-accent" aria-hidden="true" />
        <div className="avatar-render-shadow" />
      </div>
    );
  }

  return (
    <div
      className={`avatar-3d ${large ? "avatar-large" : "avatar-small"} ${character.gender}`}
      style={{
        "--skin": character.skin,
        "--hair": character.hair,
        "--accent": character.accent,
        "--accent-dark": character.accentDark,
        "--outfit-top": outfit.top,
        "--outfit-bottom": outfit.bottom,
        "--trim": outfit.trim
      }}
      aria-label={`${character.name} wearing ${outfit.name}`}
    >
      <div className="avatar-shadow" />
      <div className="avatar-hair" />
      <div className="avatar-head">
        <span className="avatar-ear avatar-ear-left" />
        <span className="avatar-ear avatar-ear-right" />
        <span className="avatar-eye avatar-eye-left" />
        <span className="avatar-eye avatar-eye-right" />
        <span className="avatar-nose" />
        <span className="avatar-smile" />
      </div>
      <div className="avatar-neck" />
      <div className="avatar-torso">
        <span className="avatar-collar" />
        <span className="avatar-belt" />
        <span className="avatar-buckle" />
      </div>
      <div className="avatar-arm avatar-arm-left" />
      <div className="avatar-arm avatar-arm-right" />
      <div className="avatar-legs">
        <span className="avatar-leg avatar-leg-left" />
        <span className="avatar-leg avatar-leg-right" />
      </div>
      <div className="avatar-boots">
        <span />
        <span />
      </div>
      {outfit.id === "royal" && <div className="avatar-crown">✦</div>}
    </div>
  );
}

function Character({ points }) {
  const level = Math.floor(points / 100) + 1;
  const [selectedCharacter, setSelectedCharacter] = useState("kael");
  const [selectedOutfit, setSelectedOutfit] = useState("adventure");

  const character = characters.find((item) => item.id === selectedCharacter);
  const outfit = outfits.find((item) => item.id === selectedOutfit) ?? outfits[0];
  const outfitName = character.gender === "male" && outfit.maleName ? outfit.maleName : outfit.name;

  return (
    <div className="character-page">
      <p className="page-label">YOUR HERO</p>
      <h1>Character Wardrobe</h1>
      <p className="character-subtitle">Choose your 3D hero and change their outfit anytime.</p>

      <div className="hero-preview hero-preview-3d">
        <div className="hero-preview-art">
          <div className="preview-glow" />
          <Avatar character={character} outfit={outfit} large />
        </div>
        <div className="hero-preview-info">
          <span className="hero-role">{character.role}</span>
          <h2>{character.name}</h2>
          <p>{character.description}</p>
          <div className="hero-tags">
            <span>Level {level}</span>
            <span>{outfitName}</span>
          </div>
          <div className="character-level">★ {points} XP earned</div>
        </div>
      </div>

      <h2 className="custom-title">Choose Your Hero</h2>
      <div className="character-grid">
        {characters.map((item) => (
          <article
            key={item.id}
            className={`character-card character-card-3d ${selectedCharacter === item.id ? "selected" : ""}`}
          >
            <div className="character-image-3d">
              <Avatar character={item} outfit={outfit} />
            </div>
            <span className="card-role">{item.role}</span>
            <h2>{item.name}</h2>
            <p>{item.description}</p>
            <button onClick={() => setSelectedCharacter(item.id)}>
              {selectedCharacter === item.id ? "✓ Selected" : "Select Hero"}
            </button>
          </article>
        ))}
      </div>

      <h2 className="custom-title">Choose Outfit</h2>
      <div className="outfit-grid outfit-grid-two">
        {outfits.map((item) => (
          <article
            key={item.id}
            className={`outfit-card outfit-card-3d ${selectedOutfit === item.id ? "selected" : ""}`}
          >
            <div className="outfit-preview-3d">
              <Avatar character={character} outfit={item} />
            </div>
            <div>
              <h3>{character.gender === "male" && item.maleName ? item.maleName : item.name}</h3>
              <p>{item.description}</p>
              <span className="outfit-price">{item.price === 0 ? "Free starter outfit" : `🪙 ${item.price} coins`}</span>
            </div>
            <button onClick={() => setSelectedOutfit(item.id)}>
              {selectedOutfit === item.id ? "✓ Equipped" : "Equip Outfit"}
            </button>
          </article>
        ))}
      </div>
    </div>
  );
}

export default Character;

export { Avatar };
