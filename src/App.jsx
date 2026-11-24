import { useState } from "react";
import "./App.css";

const ladders = {
  4: 14,
  9: 31,
  20: 38,
  28: 84,
  40: 59,
  63: 81,
  71: 91,
};

const snakes = {
  17: 7,
  54: 34,
  62: 19,
  64: 60,
  87: 24,
  93: 73,
  95: 75,
  99: 78,
};

function App() {
  const [p1, setP1] = useState(1);
  const [p2, setP2] = useState(1);
  const [turn, setTurn] = useState("P1");
  const [dice, setDice] = useState(0);
  const [winner, setWinner] = useState("");
  const [gameOver, setGameOver] = useState(false);

  const rollDice = () => {
    if (gameOver) return;

    const roll = Math.floor(Math.random() * 6) + 1;
    setDice(roll);

    if (turn === "P1") {
      let newPos = p1;

      if (p1 + roll <= 100) {
        newPos = p1 + roll;
      }

      if (ladders[newPos]) {
        newPos = ladders[newPos];
      } else if (snakes[newPos]) {
        newPos = snakes[newPos];
      }

      setP1(newPos);

      if (newPos === 100) {
        setWinner("P1 Wins!");
        setGameOver(true);
        setDice(0);
        return;
      }

      setTurn("P2");
    } else {
      let newPos = p2;

      if (p2 + roll <= 100) {
        newPos = p2 + roll;
      }

      if (ladders[newPos]) {
        newPos = ladders[newPos];
      } else if (snakes[newPos]) {
        newPos = snakes[newPos];
      }

      setP2(newPos);

      if (newPos === 100) {
        setWinner("P2 Wins!");
        setGameOver(true);
        setDice(0);
        return;
      }

      setTurn("P1");
    }
  };

  const resetGame = () => {
    setP1(1);
    setP2(1);
    setTurn("P1");
    setDice(0);
    setWinner("");
    setGameOver(false);
  };

  return (
    <div className="container">
      <h1>Snake & Ladders</h1>

      <p>
        Exact 100 is required to win. Land on a ladder to climb up,
        a snake to slide down.
      </p>

      <div className="status">
        <h3>Turn: {turn}</h3>
        <h3>Dice: {dice}</h3>
      </div>

      <div className="players">
        <div>P1 Position: {p1}</div>
        <div>P2 Position: {p2}</div>
      </div>

      {winner && <h2>{winner}</h2>}

      <div className="buttons">
        <button onClick={rollDice} disabled={gameOver}>
          Roll Dice ({dice})
        </button>

        <button onClick={resetGame}>
          Reset
        </button>
      </div>

      <div className="board">
        {[...Array(100)].map((_, index) => (
          <div key={index} className="cell">
            {100 - index}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;