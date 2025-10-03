import { useState } from "react";
import "./App.css";

// sample cards — swap with your own
const INITIAL_CARDS = [
  { front: "Leclerc + Hamilton", back: "Ferrari", image: "/f1ferrari.png" },
  { front: "Verstappen + Tsunoda", back: "RedBull", image: "/f1redbull.png" },
  { front: "Alonso + Stroll", back: "Aston Martin", image: "/f1am.png" },
  { front: "Sainz + Albon", back: "Williams", image: "/f1williams.png" },
  { front: "Russel + Antonelli", back: "Mercedes", image: "/f1mercedes.png" },
];

// Flip-card component (animated)
function Flashcard({ showFront, front, back, image, onFlip }) {
  return (
    <div className="flip-scene">
      <button
        type="button"
        className={`flip-card ${showFront ? "" : "is-flipped"}`}
        onClick={onFlip}
      >
        {/* Front side: text only */}
        <div className="card-face card-front">
          {front}
        </div>

        {/* Back side: text + image */}
        <div className="card-face card-back">
          <p>{back}</p>
          {image && <img src={image} alt={back} className="card-img" />}
        </div>
      </button>
    </div>
  );
}


export default function App() {
  const [cards] = useState(INITIAL_CARDS);
  const [index, setIndex] = useState(0);
  const [showFront, setShowFront] = useState(true);

  const flipCard = () => setShowFront((s) => !s);

  const nextRandomCard = () => {
    if (cards.length <= 1) return;
    let next = index;
    while (next === index) {
      next = Math.floor(Math.random() * cards.length);
    }
    setIndex(next);
    setShowFront(true);
  };

  const title = "Formula 1 - Guess the Team";
  const description =
    "Do you know the drivers and their teams? Click the card to flip. Click 'Next' to study in random order.";
  const total = cards.length;
  const current = cards[index];

  return (
    <div className="page">
      <div className="container">
        <header className="header">
          <h1>{title}</h1>
          <p className="muted">{description}</p>
          <p className="muted">
            Total cards: <strong>{total}</strong>
          </p>
        </header>

        <main className="main">
          <Flashcard
            showFront={showFront}
            front={current.front}
            back={current.back}
            image={current.image}
            onFlip={flipCard}
          />

          <div className="controls">
            <button className="btn" onClick={flipCard}>Flip</button>
            <button className="btn" onClick={nextRandomCard}>Next (Random)</button>
          </div>

          <p className="muted">
            Card {index + 1} of {total} — {showFront ? "Front" : "Back"}
          </p>
        </main>
      </div>
    </div>
  );
}
