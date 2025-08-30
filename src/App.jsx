import { useState, useMemo } from "react";
import Table3D from "./components/Table3D";
import ControlsPanel from "./components/ControlsPanel";
import ScoreBoard from "./components/ScoreBoard";

const initialDice = () => new Array(5).fill(0).map((_, i) => ({ id: i, value: Math.floor(Math.random() * 6) + 1, held: false }))

export default function App() {
  const [dice, setDice] = useState(initialDice());
  const [rolls, setRolls] = useState(0);
  const [isRolling, setIsRolling] = useState(false);

  const heldCount = useMemo(() => dice.filter(d => d.held).length, [dice]);

  const canRoll = rolls < 3 && !isRolling && heldCount < 5;

  function toggleHold(index) {
    setDice(prev => prev.map((d, i) => i === index ? { ...d, held: !d.held } : d));
  }

  async function rollDice() {
    if (!canRoll) return;
    setIsRolling(true);
    // trigger rolling state by assigning random rotations a couple of times
    // then settle to final values
    const rollOnce = () => setDice(prev => prev.map(d => d.held ? d : { ...d, value: Math.floor(Math.random() * 6) + 1 }));
    rollOnce();
    await new Promise(r => setTimeout(r, 350));
    rollOnce();
    await new Promise(r => setTimeout(r, 350));
    rollOnce();
    await new Promise(r => setTimeout(r, 200));

    setRolls(r => r + 1);
    setIsRolling(false);
  }

  function resetGame() {
    setDice(initialDice());
    setRolls(0);
    setIsRolling(false);
  }

  return (
    <div className="min-h-screen bg-black text-zinc-100 flex flex-col">
      <div className="relative flex-1 flex flex-col">
        <Table3D
          dice={dice}
          onToggleHold={toggleHold}
          isRolling={isRolling}
        />
      </div>

      <div className="w-full border-t border-zinc-800 bg-zinc-950/70 backdrop-blur">
        <div className="max-w-5xl mx-auto p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <ScoreBoard rolls={rolls} dice={dice} />
          <ControlsPanel
            dice={dice}
            onToggleHold={toggleHold}
            onRoll={rollDice}
            onReset={resetGame}
            canRoll={canRoll}
          />
          <div className="flex items-center justify-center text-sm text-zinc-400">
            Tip: Click a die to hold/release. You get up to 3 rolls.
          </div>
        </div>
      </div>
    </div>
  );
}
