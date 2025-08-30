export default function ScoreBoard({ rolls, dice }) {
  const held = dice.filter(d => d.held).length;
  const counts = dice.reduce((acc, d) => { acc[d.value] = (acc[d.value] || 0) + 1; return acc; }, {});
  const yahtzee = Object.values(counts).some(c => c === 5);

  return (
    <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-4">
      <div className="flex items-baseline justify-between">
        <div className="text-lg font-semibold">Roll {rolls} / 3</div>
        <div className={`text-sm ${yahtzee ? 'text-rose-400' : 'text-zinc-400'}`}>{yahtzee ? 'YAHTZEE!? 🎲' : `${held} held`}</div>
      </div>
      <div className="mt-3 text-sm text-zinc-400">
        <div className="flex gap-3 flex-wrap">
          {Array.from({ length: 6 }, (_, i) => i + 1).map(v => (
            <span key={v} className="px-2 py-1 rounded-md bg-zinc-800/60 border border-zinc-700 text-zinc-300">
              {v}s: {counts[v] || 0}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
