export const COLORS = {
  brand: "#FF6B6B",
  feed: "#FFD700",
  sleep: "#AF82DE",
  diaper: "#E682E6",
  growth: "#50C878",
  temp: "#FF8791",
  vaccine: "#FF453A",
  medicine: "#B48CFF",
  food: "#FF9F43",
  appointment: "#32ADE6",
} as const;

export type FeatureKey =
  | "tracking"
  | "insights"
  | "predictions"
  | "growth"
  | "vaccine"
  | "food";

export type FeatureConfig = {
  key: FeatureKey;
  color: string;
  colorRgb: string;
  gradientTo: string;
  bgTint: string;
  layout: "text-left" | "text-right";
};

export const FEATURES: FeatureConfig[] = [
  {
    key: "tracking",
    color: COLORS.brand,
    colorRgb: "255,107,107",
    gradientTo: COLORS.feed,
    bgTint: "#0a0a0a",
    layout: "text-left",
  },
  {
    key: "insights",
    color: COLORS.growth,
    colorRgb: "80,200,120",
    gradientTo: COLORS.appointment,
    bgTint: "#0a0f0a",
    layout: "text-right",
  },
  {
    key: "predictions",
    color: COLORS.sleep,
    colorRgb: "175,130,255",
    gradientTo: COLORS.feed,
    bgTint: "#0f0a14",
    layout: "text-left",
  },
  {
    key: "growth",
    color: COLORS.growth,
    colorRgb: "80,200,120",
    gradientTo: "#80E0A0",
    bgTint: "#0a100a",
    layout: "text-right",
  },
  {
    key: "vaccine",
    color: COLORS.vaccine,
    colorRgb: "255,69,58",
    gradientTo: COLORS.brand,
    bgTint: "#140a0a",
    layout: "text-left",
  },
  {
    key: "food",
    color: COLORS.food,
    colorRgb: "255,159,67",
    gradientTo: COLORS.feed,
    bgTint: "#14100a",
    layout: "text-right",
  },
];

export const GRID_ITEMS = [
  { key: "multiBaby", icon: "👶" },
  { key: "appleWatch", icon: "⌚" },
  { key: "siri", icon: "🗣️" },
  { key: "widget", icon: "📱" },
  { key: "wholeBrain", icon: "🧠" },
  { key: "earlyEd", icon: "🎒" },
  { key: "doctorReport", icon: "📄" },
  { key: "languages", icon: "🌍" },
  { key: "preterm", icon: "🏥" },
  { key: "alerts", icon: "🔔" },
  { key: "icloud", icon: "☁️" },
  { key: "piggyBank", icon: "🐷" },
] as const;

export const RECORD_TYPES = [
  { key: "feed", icon: "🍼", color: COLORS.feed, colorRgb: "255,200,50" },
  { key: "sleep", icon: "😴", color: COLORS.sleep, colorRgb: "175,130,255" },
  { key: "diaper", icon: "🧷", color: COLORS.diaper, colorRgb: "230,130,230" },
  { key: "growth", icon: "📊", color: COLORS.growth, colorRgb: "80,200,120" },
  { key: "temp", icon: "🌡️", color: COLORS.temp, colorRgb: "255,135,145" },
  { key: "vaccine", icon: "💉", color: COLORS.vaccine, colorRgb: "255,69,58" },
  { key: "medicine", icon: "💊", color: COLORS.medicine, colorRgb: "180,140,255" },
  { key: "food", icon: "🥣", color: COLORS.food, colorRgb: "255,159,67" },
  { key: "appointment", icon: "📅", color: COLORS.appointment, colorRgb: "50,173,230" },
  { key: "pumping", icon: "🤱", color: "#64B4DC", colorRgb: "100,180,220" },
  { key: "milestone", icon: "⭐", color: "#FFC864", colorRgb: "255,200,100" },
  { key: "photo", icon: "📸", color: "#C8C8C8", colorRgb: "200,200,200" },
] as const;

export const APP_STORE_URL = "https://apps.apple.com/app/bebilog/id6504726922";
