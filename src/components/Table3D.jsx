import Die from "./Die";
import { motion } from "framer-motion";

export default function Table3D({ dice, onToggleHold, isRolling }) {
  const leftHeld = dice.filter(d => d.held).map((d, idx) => ({ ...d, idx })).filter((_, i) => i % 2 === 0);
  const rightHeld = dice.filter(d => d.held).map((d, idx) => ({ ...d, idx })).filter((_, i) => i % 2 === 1);

  return (
    <div className="relative flex-1 overflow-hidden">
      {/* Atmosphere */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-950 to-black" />
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(120,0,10,0.18),transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.05),transparent_60%)]" />
      </div>

      {/* Scary figure at far end */}
      <ScaryFigure />

      {/* Table */}
      <div className="relative h-full flex items-center justify-center">
        <div className="relative w-full max-w-5xl aspect-[3/1.1]">
          <div className="absolute inset-0 mx-auto [perspective:1200px]">
            <div className="absolute inset-x-6 bottom-8 top-2 [transform-style:preserve-3d] rotate-x-12">
              {/* Table surface */}
              <div className="absolute inset-0 rounded-[40px] bg-[linear-gradient(135deg,#1b1b1b,#0f0f0f)] border border-zinc-800 shadow-[0_40px_120px_rgba(0,0,0,0.8)_inset,0_10px_40px_rgba(0,0,0,0.5)]" />
              <div className="absolute inset-4 rounded-[32px] bg-[radial-gradient(ellipse_at_center,rgba(39,39,42,0.9),rgba(24,24,27,0.95))] border border-zinc-700/60" />

              {/* Dice line */}
              <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 flex gap-8">
                {dice.map((d, i) => (
                  <motion.div
                    key={d.id}
                    className="relative"
                    animate={{
                      x: d.held ? (i % 2 === 0 ? -220 : 220) : 0,
                      y: 0,
                      scale: d.held ? 0.95 : 1,
                    }}
                    transition={{ type: "spring", stiffness: 220, damping: 22 }}
                  >
                    <Die value={d.value} held={d.held} rolling={isRolling && !d.held} onClick={() => onToggleHold(i)} />
                  </motion.div>
                ))}
              </div>

              {/* Shadowy hands */}
              <Hands side="left" activeCount={leftHeld.length} />
              <Hands side="right" activeCount={rightHeld.length} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Hands({ side, activeCount }) {
  // hand reaches further as more dice are held on that side
  const reach = Math.min(1, activeCount / 3);
  const x = side === "left" ? -1 : 1;
  return (
    <div className={`absolute top-1/2 -translate-y-1/2 ${side === 'left' ? 'left-4' : 'right-4'} w-40 h-64 pointer-events-none`}>
      <motion.div
        initial={false}
        animate={{ x: x * (40 + reach * 80) }}
        transition={{ type: "spring", stiffness: 120, damping: 18 }}
        className="relative w-40 h-64"
      >
        {/* Arm */}
        <div className={`absolute ${side === 'left' ? 'left-0' : 'right-0'} top-10 w-36 h-10 rounded-full bg-gradient-to-r from-black/0 via-black/40 to-black/0 blur-sm`} />
        {/* Palm */}
        <div className={`absolute ${side === 'left' ? 'left-6 rotate-[8deg]' : 'right-6 -rotate-[8deg]'} top-16 w-24 h-16 rounded-[20px] bg-zinc-900/70 border border-zinc-800 shadow-[0_0_40px_rgba(0,0,0,0.8)]`} />
        {/* Fingers */}
        {[0,1,2,3].map(i => (
          <div key={i} className={`absolute ${side === 'left' ? 'left-4' : 'right-4'} top-[${18 + i*10}px] w-28 h-3 rounded-full bg-zinc-900/80 border border-zinc-800`} style={{ top: 22 + i*10 }} />
        ))}
        {/* Claws */}
        {[0,1,2,3].map(i => (
          <div key={i} className={`absolute ${side === 'left' ? 'left-[86px]' : 'right-[86px]'} w-0 h-0`} style={{ top: 24 + i*10, borderLeft: side==='left' ? '10px solid #111' : undefined, borderRight: side==='right' ? '10px solid #111' : undefined, borderTop: '6px solid transparent', borderBottom: '6px solid transparent', filter: 'drop-shadow(0 0 6px rgba(255,0,0,0.2))' }} />
        ))}
      </motion.div>
    </div>
  );
}

function ScaryFigure() {
  return (
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[420px] h-[260px] flex items-start justify-center">
      <div className="relative mt-2">
        {/* Hooded silhouette */}
        <div className="w-52 h-52 rounded-full bg-gradient-to-b from-zinc-900 to-black shadow-[0_0_120px_rgba(255,0,0,0.08)]" />
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Face void */}
          <div className="w-24 h-24 rounded-full bg-black/95 blur-[1px]" />
        </div>
        {/* Eyes */}
        <div className="absolute left-1/2 -translate-x-1/2 top-16 w-28 h-10">
          <Breathing>
            <div className="absolute left-2 top-2 w-3.5 h-3.5 rounded-full bg-rose-500 shadow-[0_0_12px_3px_rgba(244,63,94,0.6)]" />
            <div className="absolute right-2 top-2 w-3.5 h-3.5 rounded-full bg-rose-500 shadow-[0_0_12px_3px_rgba(244,63,94,0.6)]" />
          </Breathing>
        </div>
        {/* Shoulders */}
        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-80 h-24 rounded-[60px] bg-gradient-to-b from-zinc-900 to-black/90" />
      </div>
    </div>
  );
}

function Breathing({ children }) {
  return (
    <motion.div animate={{ scale: [1, 1.08, 1] }} transition={{ repeat: Infinity, duration: 2.4, ease: "easeInOut" }}>
      {children}
    </motion.div>
  );
}
