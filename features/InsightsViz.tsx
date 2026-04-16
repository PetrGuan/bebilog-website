const DIMENSIONS = [
  { label: "WEIGHT", value: "P72", pct: 72, color: "#50C878", colorRgb: "80,200,120" },
  { label: "HEIGHT", value: "P65", pct: 65, color: "#AF82DE", colorRgb: "175,130,255" },
  { label: "HEAD", value: "P58", pct: 58, color: "#32ADE6", colorRgb: "50,173,230" },
  { label: "FEEDING", value: "8x", pct: 0, sub: "avg/day", color: "#FFD700", colorRgb: "255,200,50" },
  { label: "SLEEP", value: "14.5h", pct: 0, sub: "avg/day", color: "#AF82DE", colorRgb: "175,130,255" },
  { label: "DIAPERS", value: "7x", pct: 0, sub: "avg/day", color: "#E682E6", colorRgb: "230,130,230" },
];

export default function InsightsViz() {
  return (
    <div className="bg-[rgba(80,200,120,0.04)] border border-[rgba(80,200,120,0.1)] rounded-2xl p-6">
      <div className="grid grid-cols-3 gap-3">
        {DIMENSIONS.map((d) => (
          <div
            key={d.label}
            className="rounded-xl p-4 text-center"
            style={{ background: `rgba(${d.colorRgb}, 0.08)` }}
          >
            <div className="text-[10px] text-white/40 mb-1">{d.label}</div>
            <div className="text-xl font-bold" style={{ color: d.color }}>
              {d.value}
            </div>
            {d.pct > 0 ? (
              <div className="w-full h-1 bg-white/5 rounded-full mt-2">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${d.pct}%`,
                    background: `linear-gradient(90deg, ${d.color}, ${d.color}aa)`,
                  }}
                />
              </div>
            ) : (
              <div className="text-[10px] text-white/30 mt-1">{d.sub}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
