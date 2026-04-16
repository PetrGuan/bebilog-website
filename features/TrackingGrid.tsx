import { RECORD_TYPES } from "@/lib/constants";

export default function TrackingGrid() {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
      {RECORD_TYPES.map((type) => (
        <div
          key={type.key}
          className="rounded-2xl p-4 text-center border transition-transform hover:scale-105"
          style={{
            background: `rgba(${type.colorRgb}, 0.08)`,
            borderColor: `rgba(${type.colorRgb}, 0.15)`,
          }}
        >
          <div className="text-2xl mb-1.5">{type.icon}</div>
          <div
            className="text-xs font-semibold capitalize"
            style={{ color: type.color }}
          >
            {type.key}
          </div>
        </div>
      ))}
    </div>
  );
}
