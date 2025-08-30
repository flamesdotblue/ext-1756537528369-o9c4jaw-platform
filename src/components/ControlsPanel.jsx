import { Rocket, RotateCcw } from "lucide-react";

export default function ControlsPanel({ dice, onToggleHold, onRoll, onReset, canRoll }) {
  return (
    <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-4">
      <div className="flex items-center gap-3">
        <button
          onClick={onRoll}
          disabled={!canRoll}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium border ${canRoll ? 'bg-rose-600 hover:bg-rose-700 border-rose-500 text-white' : 'bg-zinc-800 border-zinc-700 text-zinc-400 cursor-not-allowed'}`}
        >
          <Rocket size={16} /> Roll
        </button>
        <button
          onClick={onReset}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium border bg-zinc-800 hover:bg-zinc-700 border-zinc-700 text-zinc-100"
        >
          <RotateCcw size={16} /> Reset
        </button>
      </div>

      <div className="mt-4 grid grid-cols-5 gap-2">
        {dice.map((d, i) => (
          <button
            key={d.id}
            onClick={() => onToggleHold(i)}
            className={`px-2 py-2 rounded-lg text-xs border font-medium ${d.held ? 'bg-rose-900/40 border-rose-700 text-rose-200' : 'bg-zinc-800/60 border-zinc-700 text-zinc-200 hover:bg-zinc-700/60'}`}
          >
            {d.held ? 'Release' : 'Hold'}
          </button>
        ))}
      </div>
    </div>
  );
}
