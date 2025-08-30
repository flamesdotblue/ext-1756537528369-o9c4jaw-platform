import { useMemo } from "react";

// Map die value to rotation that shows that value on top
const faceRotation = {
  1: { rx: 0, ry: 0 },
  2: { rx: -90, ry: 0 },
  3: { rx: 0, ry: 90 },
  4: { rx: 0, ry: -90 },
  5: { rx: 90, ry: 0 },
  6: { rx: 180, ry: 0 },
};

export default function Die({ value = 1, held = false, rolling = false, onClick }) {
  const rot = faceRotation[value] || faceRotation[1];

  const rollStyle = useMemo(() => {
    if (rolling && !held) {
      // Add a dynamic spin by randomizing target a bit each render
      const randRX = Math.floor(Math.random() * 4) * 90 + 720; // multiple rotations
      const randRY = Math.floor(Math.random() * 4) * 90 + 720;
      return {
        transform: `rotateX(${randRX}deg) rotateY(${randRY}deg)`,
        transition: "transform 0.35s cubic-bezier(.2,.8,.2,1)",
      };
    }
    return {
      transform: `rotateX(${rot.rx}deg) rotateY(${rot.ry}deg)`,
      transition: "transform 0.5s cubic-bezier(.2,.8,.2,1)",
    };
  }, [rot.rx, rot.ry, rolling, held]);

  return (
    <div
      className={`group relative select-none cursor-pointer [perspective:800px] ${held ? 'opacity-90' : ''}`}
      onClick={onClick}
      aria-label={`Die showing ${value}${held ? ', held' : ''}`}
    >
      <div
        className={`relative size-16 [transform-style:preserve-3d] drop-shadow-[0_8px_10px_rgba(0,0,0,0.8)]`} 
        style={rollStyle}
      >
        {/* Faces */}
        {faces(value).map((face, i) => (
          <div key={i} className={`absolute inset-0 bg-white/95 rounded-xl border border-zinc-200 flex items-center justify-center ${face.transform}`}> 
            <div className="relative w-10 h-10">
              {face.pips.map((p, idx) => (
                <span
                  key={idx}
                  className="absolute w-2.5 h-2.5 rounded-full bg-zinc-900 shadow-[inset_0_-1px_0_rgba(255,255,255,0.3)]"
                  style={{ left: p.x, top: p.y }}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
      {held && (
        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-widest text-rose-400/80">Held</div>
      )}
    </div>
  );
}

function faces(value) {
  // Position of pips for a 40px area; we place them in a 40x40 box
  const c = ["50%", "50%"];
  const tl = ["20%", "20%"]; const tr = ["80%", "20%"]; const bl = ["20%", "80%"]; const br = ["80%", "80%"]; const ml = ["20%", "50%"]; const mr = ["80%", "50%"];
  const pipsFor = {
    1: [c],
    2: [tl, br],
    3: [tl, c, br],
    4: [tl, tr, bl, br],
    5: [tl, tr, c, bl, br],
    6: [tl, ml, bl, tr, mr, br],
  };
  const pips = (n) => (pipsFor[n] || []).map(([x, y]) => ({ x, y }));

  // 3D transforms for cube faces
  const t = 32; // translate out half the cube
  const transforms = [
    `translateZ(${t}px)`, // front (1)
    `rotateX(90deg) translateZ(${t}px)`, // top (2)
    `rotateY(90deg) translateZ(${t}px)`, // right (3)
    `rotateY(-90deg) translateZ(${t}px)`, // left (4)
    `rotateX(-90deg) translateZ(${t}px)`, // bottom (5)
    `rotateY(180deg) translateZ(${t}px)`, // back (6)
  ];

  return [1,2,3,4,5,6].map((n, i) => ({
    transform: `[transform:${transforms[i]}]`,
    pips: pips(n)
  }));
}
