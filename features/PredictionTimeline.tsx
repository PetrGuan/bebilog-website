const EVENTS = [
  { type: "feed", label: "Feed — 120ml", time: "10:30 AM", done: true, countdown: "", color: "#FFD700", colorRgb: "255,200,50" },
  { type: "sleep", label: "Nap — 1h 20min", time: "11:00 AM - 12:20 PM", done: true, countdown: "", color: "#AF82DE", colorRgb: "175,130,255" },
  { type: "feed", label: "Next Feed", time: "~1:00 PM", done: false, countdown: "in 40 min", color: "#FFD700", colorRgb: "255,200,50" },
  { type: "sleep", label: "Sleep Window", time: "~2:30 PM", done: false, countdown: "in 2h 10min", color: "#AF82DE", colorRgb: "175,130,255" },
];

export default function PredictionTimeline() {
  return (
    <div className="bg-[rgba(175,130,255,0.04)] border border-[rgba(175,130,255,0.1)] rounded-2xl p-6">
      <div className="relative pl-5">
        <div className="absolute left-[6px] top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#FFD700] via-[#AF82DE] to-[rgba(175,130,255,0.2)]" />
        <div className="flex flex-col gap-4">
          {EVENTS.map((event, i) => (
            <div key={i} className="relative">
              <div
                className="absolute -left-[18px] top-1 w-2.5 h-2.5 rounded-full"
                style={
                  event.done
                    ? { background: event.color, boxShadow: `0 0 8px ${event.color}66` }
                    : { border: `2px solid ${event.color}`, boxShadow: `0 0 12px ${event.color}4d` }
                }
              />
              <div
                className="rounded-xl px-4 py-3"
                style={{
                  background: `rgba(${event.colorRgb}, ${event.done ? 0.08 : 0.04})`,
                  border: event.done
                    ? `1px solid rgba(${event.colorRgb}, 0.12)`
                    : `1px dashed rgba(${event.colorRgb}, 0.25)`,
                }}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-xs font-semibold" style={{ color: event.color }}>
                      {event.label}
                    </div>
                    <div className="text-[10px] text-white/40 mt-0.5">{event.time}</div>
                  </div>
                  {event.done ? (
                    <div className="text-[10px] text-white/30">✓ Done</div>
                  ) : (
                    <div
                      className="text-xs font-semibold px-2.5 py-0.5 rounded-lg"
                      style={{
                        color: event.color,
                        background: `rgba(${event.colorRgb}, 0.1)`,
                      }}
                    >
                      {event.countdown}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
