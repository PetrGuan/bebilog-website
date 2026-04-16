# Bebilog Marketing Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a Raycast-inspired dark-themed marketing website for Bebilog at bebilog.cn with bilingual support (EN/ZH), showcasing app features and driving iOS downloads.

**Architecture:** Next.js App Router with route-based i18n (`/en`, `/zh`), Tailwind CSS for styling, Framer Motion for scroll-triggered animations. Static export via `next export` deployed to Vercel. All content in JSON translation files, reusable `FeatureSection` component for the 6 hero features.

**Tech Stack:** Next.js 15, React 19, TypeScript, Tailwind CSS 4, Framer Motion 11, next-intl for i18n

---

## File Structure

```
bebilog-website/
├── app/
│   ├── [locale]/
│   │   ├── layout.tsx          # Root layout with locale, fonts, metadata
│   │   └── page.tsx            # Main landing page composing all sections
│   ├── layout.tsx              # Root layout (html/body shell)
│   └── globals.css             # Tailwind imports + custom CSS vars
├── components/
│   ├── Nav.tsx                 # Sticky navigation bar
│   ├── Hero.tsx                # Hero section with phone mockup
│   ├── FeatureSection.tsx      # Reusable feature section (alternating layout)
│   ├── FeatureGrid.tsx         # "What else" 4x3 grid
│   ├── Pricing.tsx             # Free vs Pro pricing cards
│   ├── FooterCTA.tsx           # Final download CTA
│   ├── Footer.tsx              # Footer links and copyright
│   ├── PhoneMockup.tsx         # iPhone frame with glow effect
│   ├── AnimateInView.tsx       # Framer Motion scroll-trigger wrapper
│   └── LanguageToggle.tsx      # EN/ZH toggle component
├── features/                   # Visual content for each feature section
│   ├── TrackingGrid.tsx        # 4x3 record type icon grid
│   ├── InsightsViz.tsx         # 6-dimension percentile grid
│   ├── PredictionTimeline.tsx  # Feed & sleep prediction timeline
│   ├── GrowthChart.tsx         # SVG growth chart
│   ├── VaccineSchedule.tsx     # Vaccine schedule list
│   └── BabyFoodHub.tsx         # Meal plan + allergen tracking
├── i18n/
│   ├── request.ts              # next-intl request config
│   ├── routing.ts              # Locale routing config
│   └── messages/
│       ├── en.json             # English translations
│       └── zh.json             # Chinese translations
├── lib/
│   └── constants.ts            # Colors, feature data, pricing data
├── public/
│   └── images/                 # Placeholder assets (app icon, screenshots)
├── middleware.ts                # next-intl locale detection middleware
├── next.config.ts              # Next.js config with next-intl plugin
├── tailwind.config.ts          # Tailwind config with custom colors
├── tsconfig.json
├── package.json
└── .gitignore
```

---

### Task 1: Project Scaffolding

**Files:**
- Create: `package.json`, `next.config.ts`, `tsconfig.json`, `tailwind.config.ts`, `app/globals.css`, `app/layout.tsx`, `app/[locale]/layout.tsx`, `app/[locale]/page.tsx`, `.gitignore`

- [ ] **Step 1: Initialize Next.js project**

```bash
cd /Users/petr/Documents/GitHub/bebilog-website
npx create-next-app@latest . --typescript --tailwind --eslint --app --src=false --import-alias="@/*" --use-npm
```

Select defaults when prompted. This creates the base Next.js + Tailwind + TypeScript setup.

- [ ] **Step 2: Install dependencies**

```bash
cd /Users/petr/Documents/GitHub/bebilog-website
npm install framer-motion next-intl
```

- [ ] **Step 3: Configure Tailwind with custom colors**

Replace `tailwind.config.ts`:

```ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./features/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: "#0a0a0a",
          card: "rgba(255,255,255,0.03)",
        },
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
      },
      borderColor: {
        subtle: "rgba(255,255,255,0.06)",
        "subtle-hover": "rgba(255,255,255,0.12)",
      },
    },
  },
  plugins: [],
};
export default config;
```

- [ ] **Step 4: Set up globals.css**

Replace `app/globals.css`:

```css
@import "tailwindcss";

:root {
  --bg: #0a0a0a;
  --text-primary: #ffffff;
  --text-secondary: rgba(255, 255, 255, 0.5);
  --text-tertiary: rgba(255, 255, 255, 0.3);
  --border-subtle: rgba(255, 255, 255, 0.06);
  --brand: #FF6B6B;
}

body {
  background: var(--bg);
  color: var(--text-primary);
  font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "Inter", "Segoe UI", sans-serif;
  -webkit-font-smoothing: antialiased;
}

::selection {
  background: rgba(255, 107, 107, 0.3);
}
```

- [ ] **Step 5: Set up root layout**

Replace `app/layout.tsx`:

```tsx
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Bebilog — Baby Tracking, Simplified",
  description:
    "Track feeding, sleep, growth, vaccines, and more — all in one beautifully designed app.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
```

- [ ] **Step 6: Verify dev server starts**

```bash
cd /Users/petr/Documents/GitHub/bebilog-website
npm run dev
```

Expected: Dev server starts on localhost:3000 with no errors.

- [ ] **Step 7: Commit**

```bash
cd /Users/petr/Documents/GitHub/bebilog-website
git add -A
git commit -m "chore: scaffold Next.js project with Tailwind and Framer Motion"
```

---

### Task 2: i18n Setup (next-intl)

**Files:**
- Create: `i18n/request.ts`, `i18n/routing.ts`, `i18n/messages/en.json`, `i18n/messages/zh.json`, `middleware.ts`
- Modify: `next.config.ts`, `app/[locale]/layout.tsx`

- [ ] **Step 1: Create routing config**

Create `i18n/routing.ts`:

```ts
import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "zh"],
  defaultLocale: "en",
});
```

- [ ] **Step 2: Create request config**

Create `i18n/request.ts`:

```ts
import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;
  if (!locale || !routing.locales.includes(locale as "en" | "zh")) {
    locale = routing.defaultLocale;
  }
  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default,
  };
});
```

- [ ] **Step 3: Create initial English translations**

Create `i18n/messages/en.json`:

```json
{
  "meta": {
    "title": "Bebilog — Baby Tracking, Simplified",
    "description": "Track feeding, sleep, growth, vaccines, and more — all in one beautifully designed app."
  },
  "nav": {
    "features": "Features",
    "pricing": "Pricing",
    "download": "Download"
  },
  "hero": {
    "badge": "Available on iOS",
    "badgeAndroid": "Android coming soon",
    "titleLine1": "Baby tracking,",
    "titleLine2": "simplified.",
    "subtitle": "Track feeding, sleep, growth, vaccines, and more — all in one beautifully designed app. Insights that help you care with confidence.",
    "downloadIOS": "Download for iOS",
    "androidComingSoon": "Android — Coming Soon"
  },
  "features": {
    "tracking": {
      "label": "All-in-One Tracking",
      "title": "Everything your baby needs,",
      "titleHighlight": "one tap away.",
      "description": "12 record types designed by parents, for parents. Log feeds, sleep, diapers, growth, and more in seconds — not minutes."
    },
    "insights": {
      "label": "Insights",
      "title": "See the",
      "titleHighlight": "full picture.",
      "description": "Six-dimension analysis across weight, height, head circumference, feeding, sleep, and diapers. Spot trends, catch anomalies, and share professional reports with your pediatrician."
    },
    "predictions": {
      "label": "Smart Predictions",
      "title": "Know when,",
      "titleHighlight": "before it happens.",
      "description": "Bebilog learns your baby's rhythm and predicts the next feed and sleep window. No more guessing — just timely notifications when it's time."
    },
    "growth": {
      "label": "Growth Charts",
      "title": "Medical-grade",
      "titleHighlight": "growth tracking.",
      "description": "WHO standard growth charts with z-score references. Born early? INTERGROWTH-21st preterm charts activate automatically with corrected age display."
    },
    "vaccine": {
      "label": "Vaccine Schedule",
      "title": "Never miss",
      "titleHighlight": "a shot.",
      "description": "Smart scheduling for China (NIP), US (CDC), Japan, and Europe. Tracks doses, minimum intervals, and live-vaccine rules automatically."
    },
    "food": {
      "label": "Baby Food Hub",
      "title": "Introduce food",
      "titleHighlight": "with confidence.",
      "description": "AI-powered 7-day meal plans by age stage. Track allergen introduction with clear status indicators and safety cooldown windows."
    }
  },
  "grid": {
    "title": "What else can Bebilog do?",
    "subtitle": "And so much more — all included.",
    "items": {
      "multiBaby": { "title": "Multi-Baby", "description": "Manage siblings independently" },
      "appleWatch": { "title": "Apple Watch", "description": "Log from your wrist" },
      "siri": { "title": "Siri Shortcuts", "description": "Hands-free logging" },
      "widget": { "title": "Home Widget", "description": "Quick-add from home screen" },
      "wholeBrain": { "title": "Whole Brain", "description": "Parenting strategies" },
      "earlyEd": { "title": "Early Education", "description": "Age-specific activities" },
      "doctorReport": { "title": "Doctor Reports", "description": "Export PDF summaries" },
      "languages": { "title": "31 Languages", "description": "Localized worldwide" },
      "preterm": { "title": "Preterm Mode", "description": "Corrected age + special charts" },
      "alerts": { "title": "Smart Alerts", "description": "Timely reminders & presets" },
      "icloud": { "title": "iCloud Sync", "description": "Backup & sync across devices" },
      "piggyBank": { "title": "Piggy Bank", "description": "Savings tracker for baby" }
    }
  },
  "pricing": {
    "title": "Simple, honest pricing.",
    "subtitle": "Start free. Upgrade when you're ready.",
    "free": {
      "name": "Free",
      "price": "$0",
      "period": "Forever free",
      "features": [
        "All 12 record types",
        "WHO growth charts",
        "Vaccine scheduling",
        "Smart predictions",
        "Doctor PDF export",
        "Multi-baby support",
        "Apple Watch"
      ]
    },
    "pro": {
      "name": "Pro",
      "badge": "BEST VALUE",
      "price": "$5.99",
      "period": "lifetime",
      "altPricing": "Or $0.99/mo · $2.99/yr",
      "features": [
        "Everything in Free",
        "Baby Food Hub + AI meals",
        "Siri Shortcuts",
        "Home Widget",
        "Custom app icons",
        "Unlimited photos & media",
        "iCloud sync & backup"
      ]
    }
  },
  "footerCTA": {
    "title": "Start tracking today.",
    "subtitle": "Free to use. No account needed."
  },
  "footer": {
    "privacy": "Privacy Policy",
    "terms": "Terms",
    "support": "Support",
    "copyright": "© 2026 Bebilog. All rights reserved."
  }
}
```

- [ ] **Step 4: Create Chinese translations**

Create `i18n/messages/zh.json`:

```json
{
  "meta": {
    "title": "Bebilog — 宝宝记录，化繁为简",
    "description": "喂奶、睡眠、成长、疫苗……一个精心设计的 App，全部搞定。"
  },
  "nav": {
    "features": "功能",
    "pricing": "价格",
    "download": "下载"
  },
  "hero": {
    "badge": "iOS 已上线",
    "badgeAndroid": "Android 即将推出",
    "titleLine1": "宝宝记录，",
    "titleLine2": "化繁为简。",
    "subtitle": "喂奶、睡眠、成长、疫苗……一个精心设计的 App，全部搞定。数据洞察，助你从容育儿。",
    "downloadIOS": "下载 iOS 版",
    "androidComingSoon": "Android — 即将推出"
  },
  "features": {
    "tracking": {
      "label": "一站式追踪",
      "title": "宝宝所需，",
      "titleHighlight": "一键记录。",
      "description": "12 种记录类型，由父母为父母设计。喂奶、睡眠、换尿布、成长……几秒搞定。"
    },
    "insights": {
      "label": "数据洞察",
      "title": "全貌，",
      "titleHighlight": "尽在掌握。",
      "description": "体重、身高、头围、喂养、睡眠、换尿布六维分析。发现趋势，识别异常，生成专业报告与儿科医生分享。"
    },
    "predictions": {
      "label": "智能预测",
      "title": "未卜先知，",
      "titleHighlight": "从容应对。",
      "description": "Bebilog 学习宝宝的作息规律，智能预测下次喂奶和睡眠窗口。不再猜测——准时提醒。"
    },
    "growth": {
      "label": "生长曲线",
      "title": "医疗级别的",
      "titleHighlight": "成长追踪。",
      "description": "WHO 标准生长曲线 + z 值参考线。早产宝宝？INTERGROWTH-21st 早产儿专属曲线自动激活，显示矫正年龄。"
    },
    "vaccine": {
      "label": "疫苗排程",
      "title": "疫苗接种，",
      "titleHighlight": "绝不遗漏。",
      "description": "支持中国（NIP）、美国（CDC）、日本、欧洲疫苗计划。自动追踪剂次、最小间隔和减毒活疫苗规则。"
    },
    "food": {
      "label": "辅食管理",
      "title": "添加辅食，",
      "titleHighlight": "信心满满。",
      "description": "AI 生成 7 天分龄餐单。追踪过敏原引入状态，安全间隔提醒，让辅食添加有据可循。"
    }
  },
  "grid": {
    "title": "Bebilog 还能做什么？",
    "subtitle": "远不止这些——全部包含。",
    "items": {
      "multiBaby": { "title": "多宝宝", "description": "独立管理每个宝宝" },
      "appleWatch": { "title": "Apple Watch", "description": "抬腕即可记录" },
      "siri": { "title": "Siri 快捷指令", "description": "解放双手" },
      "widget": { "title": "桌面小组件", "description": "主屏幕快速记录" },
      "wholeBrain": { "title": "全脑育儿", "description": "科学育儿策略" },
      "earlyEd": { "title": "早教中心", "description": "分龄活动推荐" },
      "doctorReport": { "title": "医生报告", "description": "导出 PDF 摘要" },
      "languages": { "title": "31 种语言", "description": "全球本地化支持" },
      "preterm": { "title": "早产模式", "description": "矫正月龄 + 专属曲线" },
      "alerts": { "title": "智能提醒", "description": "及时提醒 & 预设方案" },
      "icloud": { "title": "iCloud 同步", "description": "跨设备备份同步" },
      "piggyBank": { "title": "存钱罐", "description": "宝宝储蓄追踪" }
    }
  },
  "pricing": {
    "title": "简单透明的定价。",
    "subtitle": "免费开始，随时升级。",
    "free": {
      "name": "免费版",
      "price": "$0",
      "period": "永久免费",
      "features": [
        "全部 12 种记录类型",
        "WHO 生长曲线",
        "疫苗排程",
        "智能预测",
        "医生 PDF 报告导出",
        "多宝宝支持",
        "Apple Watch"
      ]
    },
    "pro": {
      "name": "专业版",
      "badge": "最超值",
      "price": "$5.99",
      "period": "终身买断",
      "altPricing": "或 $0.99/月 · $2.99/年",
      "features": [
        "包含免费版全部功能",
        "辅食管理 + AI 餐单",
        "Siri 快捷指令",
        "桌面小组件",
        "自定义 App 图标",
        "无限照片与媒体",
        "iCloud 同步与备份"
      ]
    }
  },
  "footerCTA": {
    "title": "今天就开始记录。",
    "subtitle": "免费使用，无需注册。"
  },
  "footer": {
    "privacy": "隐私政策",
    "terms": "使用条款",
    "support": "技术支持",
    "copyright": "© 2026 Bebilog. 保留所有权利。"
  }
}
```

- [ ] **Step 5: Create middleware for locale detection**

Create `middleware.ts`:

```ts
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
```

- [ ] **Step 6: Update next.config.ts with next-intl plugin**

Replace `next.config.ts`:

```ts
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig = {};

export default withNextIntl(nextConfig);
```

- [ ] **Step 7: Update locale layout**

Replace `app/[locale]/layout.tsx`:

```tsx
import { NextIntlClientProvider, useMessages } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import type { Metadata } from "next";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const messages = await getMessages({ locale });
  const meta = messages.meta as { title: string; description: string };
  return {
    title: meta.title,
    description: meta.description,
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
```

- [ ] **Step 8: Update locale page with placeholder**

Replace `app/[locale]/page.tsx`:

```tsx
import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <MainPage />;
}

function MainPage() {
  const t = useTranslations("hero");
  return (
    <main className="min-h-screen">
      <div className="flex items-center justify-center min-h-screen">
        <h1 className="text-5xl font-bold">
          {t("titleLine1")}{" "}
          <span className="bg-gradient-to-r from-brand via-sleep to-growth bg-clip-text text-transparent">
            {t("titleLine2")}
          </span>
        </h1>
      </div>
    </main>
  );
}
```

- [ ] **Step 9: Verify i18n works**

```bash
cd /Users/petr/Documents/GitHub/bebilog-website
npm run dev
```

Visit `http://localhost:3000` — should redirect to `/en`. Visit `/zh` — should show Chinese text. Verify both render the gradient title.

- [ ] **Step 10: Commit**

```bash
cd /Users/petr/Documents/GitHub/bebilog-website
git add -A
git commit -m "feat: add i18n setup with English and Chinese translations"
```

---

### Task 3: Constants and Shared Data

**Files:**
- Create: `lib/constants.ts`

- [ ] **Step 1: Create constants file**

Create `lib/constants.ts`:

```ts
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
  colorRgb: string; // for rgba() usage
  gradientTo: string;
  bgTint: string; // subtle background gradient direction color
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
```

- [ ] **Step 2: Commit**

```bash
cd /Users/petr/Documents/GitHub/bebilog-website
git add lib/constants.ts
git commit -m "feat: add shared constants for colors, features, and data"
```

---

### Task 4: AnimateInView + Nav Components

**Files:**
- Create: `components/AnimateInView.tsx`, `components/LanguageToggle.tsx`, `components/Nav.tsx`

- [ ] **Step 1: Create AnimateInView wrapper**

Create `components/AnimateInView.tsx`:

```tsx
"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right";
};

export default function AnimateInView({
  children,
  className,
  delay = 0,
  direction = "up",
}: Props) {
  const initial = {
    opacity: 0,
    y: direction === "up" ? 40 : 0,
    x: direction === "left" ? -40 : direction === "right" ? 40 : 0,
  };

  return (
    <motion.div
      initial={initial}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
```

- [ ] **Step 2: Create LanguageToggle**

Create `components/LanguageToggle.tsx`:

```tsx
"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";

export default function LanguageToggle() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  function switchLocale(newLocale: string) {
    const segments = pathname.split("/");
    segments[1] = newLocale;
    router.push(segments.join("/"));
  }

  return (
    <div className="flex gap-1 p-1 rounded-md bg-white/5">
      <button
        onClick={() => switchLocale("en")}
        className={`text-xs px-2 py-0.5 rounded transition-colors ${
          locale === "en"
            ? "bg-white/10 text-white"
            : "text-white/40 hover:text-white/60"
        }`}
      >
        EN
      </button>
      <button
        onClick={() => switchLocale("zh")}
        className={`text-xs px-2 py-0.5 rounded transition-colors ${
          locale === "zh"
            ? "bg-white/10 text-white"
            : "text-white/40 hover:text-white/60"
        }`}
      >
        中文
      </button>
    </div>
  );
}
```

- [ ] **Step 3: Create Nav**

Create `components/Nav.tsx`:

```tsx
"use client";

import { useTranslations } from "next-intl";
import { useState, useEffect } from "react";
import LanguageToggle from "./LanguageToggle";
import { APP_STORE_URL } from "@/lib/constants";

export default function Nav() {
  const t = useTranslations("nav");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-white/[0.06]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-brand to-[#FF8E8E]" />
          <span className="text-white font-bold text-base">Bebilog</span>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-6">
          <a
            href="#features"
            className="text-white/50 text-sm hover:text-white/80 transition-colors hidden sm:block"
          >
            {t("features")}
          </a>
          <a
            href="#pricing"
            className="text-white/50 text-sm hover:text-white/80 transition-colors hidden sm:block"
          >
            {t("pricing")}
          </a>
          <LanguageToggle />
          <a
            href={APP_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-1.5 bg-gradient-to-br from-brand to-[#FF5252] rounded-lg text-white text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            {t("download")}
          </a>
        </div>
      </div>
    </nav>
  );
}
```

- [ ] **Step 4: Verify Nav renders**

Add `<Nav />` to `app/[locale]/page.tsx` temporarily and verify it renders with sticky behavior on scroll.

- [ ] **Step 5: Commit**

```bash
cd /Users/petr/Documents/GitHub/bebilog-website
git add components/AnimateInView.tsx components/LanguageToggle.tsx components/Nav.tsx
git commit -m "feat: add AnimateInView, LanguageToggle, and Nav components"
```

---

### Task 5: Hero Section + PhoneMockup

**Files:**
- Create: `components/Hero.tsx`, `components/PhoneMockup.tsx`

- [ ] **Step 1: Create PhoneMockup**

Create `components/PhoneMockup.tsx`:

```tsx
"use client";

import { motion } from "framer-motion";

export default function PhoneMockup() {
  return (
    <motion.div
      className="relative"
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
    >
      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[400px] bg-[radial-gradient(ellipse,rgba(255,107,107,0.15)_0%,rgba(175,130,255,0.1)_40%,transparent_70%)] blur-[40px]" />

      {/* Phone frame */}
      <div className="relative w-[260px] h-[520px] bg-[#1c1c1e] rounded-[40px] border-[3px] border-white/10 p-3 shadow-[0_20px_60px_rgba(0,0,0,0.5),0_0_40px_rgba(255,107,107,0.1)]">
        {/* Dynamic Island */}
        <div className="w-[90px] h-[26px] bg-[#0a0a0a] rounded-b-2xl mx-auto mb-2" />

        {/* Screen - placeholder for real screenshot */}
        <div className="bg-[#1c1c1e] rounded-3xl h-[440px] overflow-hidden flex items-center justify-center">
          <div className="text-center px-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand to-[#FF8E8E] mx-auto mb-3" />
            <p className="text-white/40 text-xs">App screenshot placeholder</p>
            <p className="text-white/20 text-[10px] mt-1">Replace with real screenshot</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
```

- [ ] **Step 2: Create Hero**

Create `components/Hero.tsx`:

```tsx
"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import PhoneMockup from "./PhoneMockup";
import { APP_STORE_URL } from "@/lib/constants";

export default function Hero() {
  const t = useTranslations("hero");

  return (
    <section className="relative pt-32 pb-20 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 bg-brand/10 border border-brand/20 rounded-full mb-8"
        >
          <span className="text-xs">🍎</span>
          <span className="text-white/70 text-xs">{t("badge")}</span>
          <span className="text-white/30 text-xs">·</span>
          <span className="text-brand/70 text-xs">{t("badgeAndroid")}</span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6"
        >
          {t("titleLine1")}
          <br />
          <span className="bg-gradient-to-r from-brand via-sleep to-growth bg-clip-text text-transparent">
            {t("titleLine2")}
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-white/50 text-lg max-w-xl mx-auto mb-10 leading-relaxed"
        >
          {t("subtitle")}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-16"
        >
          <a
            href={APP_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 bg-white rounded-xl text-[#0a0a0a] font-semibold text-base hover:bg-white/90 transition-colors"
          >
            <span className="text-lg">🍎</span>
            {t("downloadIOS")}
          </a>
          <div className="flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-white/50 text-base cursor-default">
            <span className="text-lg">🤖</span>
            {t("androidComingSoon")}
          </div>
        </motion.div>

        {/* Phone Mockup */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex justify-center"
        >
          <PhoneMockup />
        </motion.div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#0a0a0a] to-transparent" />
    </section>
  );
}
```

- [ ] **Step 3: Verify Hero renders**

Update `app/[locale]/page.tsx` to render `<Hero />` and verify it loads with animations on `localhost:3000`.

- [ ] **Step 4: Commit**

```bash
cd /Users/petr/Documents/GitHub/bebilog-website
git add components/Hero.tsx components/PhoneMockup.tsx
git commit -m "feat: add Hero section with phone mockup and animations"
```

---

### Task 6: Reusable FeatureSection Component

**Files:**
- Create: `components/FeatureSection.tsx`

- [ ] **Step 1: Create FeatureSection**

Create `components/FeatureSection.tsx`:

```tsx
"use client";

import { useTranslations } from "next-intl";
import AnimateInView from "./AnimateInView";
import type { FeatureConfig } from "@/lib/constants";
import { ReactNode } from "react";

type Props = {
  feature: FeatureConfig;
  children: ReactNode; // The visual content (chart, grid, timeline, etc.)
};

export default function FeatureSection({ feature, children }: Props) {
  const t = useTranslations(`features.${feature.key}`);

  const textContent = (
    <AnimateInView
      direction={feature.layout === "text-left" ? "left" : "right"}
      className="flex-1"
    >
      <div
        className="text-sm font-semibold uppercase tracking-widest mb-3"
        style={{ color: `rgba(${feature.colorRgb}, 0.8)` }}
      >
        {t("label")}
      </div>
      <h2 className="text-3xl md:text-4xl font-extrabold text-white leading-tight mb-4">
        {t("title")}
        <br />
        <span
          className="bg-clip-text text-transparent"
          style={{
            backgroundImage: `linear-gradient(135deg, ${feature.color}, ${feature.gradientTo})`,
          }}
        >
          {t("titleHighlight")}
        </span>
      </h2>
      <p className="text-white/50 text-base leading-relaxed max-w-md">
        {t("description")}
      </p>
    </AnimateInView>
  );

  const visualContent = (
    <AnimateInView
      direction={feature.layout === "text-left" ? "right" : "left"}
      delay={0.15}
      className="flex-1"
    >
      {children}
    </AnimateInView>
  );

  return (
    <section
      className="py-24 px-6"
      style={{
        background: `linear-gradient(180deg, #0a0a0a 0%, ${feature.bgTint} 100%)`,
      }}
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-12 items-center">
        {feature.layout === "text-left" ? (
          <>
            {textContent}
            {visualContent}
          </>
        ) : (
          <>
            {visualContent}
            {textContent}
          </>
        )}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
cd /Users/petr/Documents/GitHub/bebilog-website
git add components/FeatureSection.tsx
git commit -m "feat: add reusable FeatureSection component with alternating layout"
```

---

### Task 7: Feature Visuals — TrackingGrid, InsightsViz, PredictionTimeline

**Files:**
- Create: `features/TrackingGrid.tsx`, `features/InsightsViz.tsx`, `features/PredictionTimeline.tsx`

- [ ] **Step 1: Create TrackingGrid**

Create `features/TrackingGrid.tsx`:

```tsx
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
```

- [ ] **Step 2: Create InsightsViz**

Create `features/InsightsViz.tsx`:

```tsx
const DIMENSIONS = [
  { label: "WEIGHT", value: "P72", pct: 72, color: "#50C878", colorRgb: "80,200,120" },
  { label: "HEIGHT", value: "P65", pct: 65, color: "#AF82DE", colorRgb: "175,130,255" },
  { label: "HEAD", value: "P58", pct: 58, color: "#32ADE6", colorRgb: "50,173,230" },
  { label: "FEEDING", value: "8x", sub: "avg/day", color: "#FFD700", colorRgb: "255,200,50" },
  { label: "SLEEP", value: "14.5h", sub: "avg/day", color: "#AF82DE", colorRgb: "175,130,255" },
  { label: "DIAPERS", value: "7x", sub: "avg/day", color: "#E682E6", colorRgb: "230,130,230" },
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
            <div
              className="text-xl font-bold"
              style={{ color: d.color }}
            >
              {d.value}
            </div>
            {"pct" in d && d.pct ? (
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
```

- [ ] **Step 3: Create PredictionTimeline**

Create `features/PredictionTimeline.tsx`:

```tsx
const EVENTS = [
  { type: "feed", label: "Feed — 120ml", time: "10:30 AM", done: true, color: "#FFD700", colorRgb: "255,200,50" },
  { type: "sleep", label: "Nap — 1h 20min", time: "11:00 AM - 12:20 PM", done: true, color: "#AF82DE", colorRgb: "175,130,255" },
  { type: "feed", label: "Next Feed", time: "~1:00 PM", done: false, countdown: "in 40 min", color: "#FFD700", colorRgb: "255,200,50" },
  { type: "sleep", label: "Sleep Window", time: "~2:30 PM", done: false, countdown: "in 2h 10min", color: "#AF82DE", colorRgb: "175,130,255" },
];

export default function PredictionTimeline() {
  return (
    <div className="bg-[rgba(175,130,255,0.04)] border border-[rgba(175,130,255,0.1)] rounded-2xl p-6">
      <div className="relative pl-5">
        {/* Vertical line */}
        <div className="absolute left-[6px] top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#FFD700] via-[#AF82DE] to-[rgba(175,130,255,0.2)]" />

        <div className="flex flex-col gap-4">
          {EVENTS.map((event, i) => (
            <div key={i} className="relative">
              {/* Dot */}
              <div
                className="absolute -left-[18px] top-1 w-2.5 h-2.5 rounded-full"
                style={
                  event.done
                    ? { background: event.color, boxShadow: `0 0 8px ${event.color}66` }
                    : { border: `2px solid ${event.color}`, boxShadow: `0 0 12px ${event.color}4d` }
                }
              />
              {/* Card */}
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
```

- [ ] **Step 4: Commit**

```bash
cd /Users/petr/Documents/GitHub/bebilog-website
git add features/TrackingGrid.tsx features/InsightsViz.tsx features/PredictionTimeline.tsx
git commit -m "feat: add TrackingGrid, InsightsViz, and PredictionTimeline visuals"
```

---

### Task 8: Feature Visuals — GrowthChart, VaccineSchedule, BabyFoodHub

**Files:**
- Create: `features/GrowthChart.tsx`, `features/VaccineSchedule.tsx`, `features/BabyFoodHub.tsx`

- [ ] **Step 1: Create GrowthChart**

Create `features/GrowthChart.tsx`:

```tsx
export default function GrowthChart() {
  return (
    <div className="bg-[rgba(80,200,120,0.04)] border border-[rgba(80,200,120,0.1)] rounded-2xl p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div className="text-white text-sm font-semibold">Weight for Age</div>
        <div className="flex gap-2">
          <span className="text-[10px] text-white/30 px-2 py-0.5 bg-white/5 rounded-md">WHO</span>
          <span className="text-[10px] text-growth px-2 py-0.5 bg-growth/10 rounded-md">0-24m</span>
        </div>
      </div>

      {/* Chart SVG */}
      <svg width="100%" height="160" viewBox="0 0 400 160" className="overflow-visible">
        {/* Reference band */}
        <path d="M0,140 Q100,130 200,115 T400,80" fill="none" stroke="rgba(80,200,120,0.1)" strokeWidth="40" />
        {/* SD lines */}
        <path d="M0,120 Q100,110 200,95 T400,60" fill="none" stroke="rgba(80,200,120,0.15)" strokeWidth="1" strokeDasharray="4,4" />
        <path d="M0,100 Q100,90 200,75 T400,40" fill="none" stroke="rgba(80,200,120,0.15)" strokeWidth="1" strokeDasharray="4,4" />
        {/* Median */}
        <path d="M0,110 Q100,100 200,85 T400,50" fill="none" stroke="rgba(80,200,120,0.4)" strokeWidth="1.5" />
        {/* Baby's curve */}
        <path d="M0,115 Q50,108 100,98 T200,82 L260,72" fill="none" stroke="#50C878" strokeWidth="2.5" />
        {/* Current point */}
        <circle cx="260" cy="72" r="5" fill="#50C878" stroke="#0a0a0a" strokeWidth="2" />
        <text x="270" y="68" fill="#50C878" fontSize="10" fontWeight="600">6.2 kg</text>
        {/* X axis labels */}
        <text x="0" y="155" fill="rgba(255,255,255,0.3)" fontSize="9">0m</text>
        <text x="100" y="155" fill="rgba(255,255,255,0.3)" fontSize="9">3m</text>
        <text x="200" y="155" fill="rgba(255,255,255,0.3)" fontSize="9">6m</text>
        <text x="300" y="155" fill="rgba(255,255,255,0.3)" fontSize="9">9m</text>
        <text x="380" y="155" fill="rgba(255,255,255,0.3)" fontSize="9">12m</text>
      </svg>

      {/* Preterm badge */}
      <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-food/10 border border-food/20 rounded-lg mt-3">
        <span className="text-food text-xs font-semibold">🏥 Preterm mode: INTERGROWTH-21st charts available</span>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Create VaccineSchedule**

Create `features/VaccineSchedule.tsx`:

```tsx
import { useTranslations } from "next-intl";

const VACCINES = [
  { name: "Hepatitis B — Dose 1", age: "At birth", status: "done" },
  { name: "BCG", age: "At birth", status: "done" },
  { name: "DTaP — Dose 1", age: "2 months", status: "upcoming" },
  { name: "IPV — Dose 1", age: "2 months", status: "scheduled" },
];

const REGIONS = [
  { flag: "🇨🇳", name: "China" },
  { flag: "🇺🇸", name: "US" },
  { flag: "🇯🇵", name: "Japan" },
  { flag: "🇪🇺", name: "Europe" },
];

export default function VaccineSchedule() {
  return (
    <div>
      <div className="bg-[rgba(255,69,58,0.04)] border border-[rgba(255,69,58,0.1)] rounded-2xl p-6">
        <div className="flex flex-col gap-2.5">
          {VACCINES.map((v, i) => {
            const statusStyles = {
              done: { bg: "rgba(80,200,120,0.06)", border: "rgba(80,200,120,0.12)", color: "#50C878", label: "✓ Done" },
              upcoming: { bg: "rgba(255,200,50,0.06)", border: "rgba(255,200,50,0.15)", color: "#FFD700", label: "Upcoming" },
              scheduled: { bg: "rgba(255,255,255,0.02)", border: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.3)", label: "Scheduled" },
            }[v.status];

            return (
              <div
                key={i}
                className="flex justify-between items-center px-4 py-3 rounded-xl border"
                style={{ background: statusStyles.bg, borderColor: statusStyles.border }}
              >
                <div>
                  <div className={`text-sm font-semibold ${v.status === "scheduled" ? "text-white/60" : "text-white"}`}>
                    {v.name}
                  </div>
                  <div className={`text-xs mt-0.5 ${v.status === "scheduled" ? "text-white/30" : "text-white/40"}`}>
                    {v.age}
                  </div>
                </div>
                <div className="text-xs font-semibold" style={{ color: statusStyles.color }}>
                  {statusStyles.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Region pills — rendered outside the card, passed via FeatureSection's text side */}
    </div>
  );
}
```

- [ ] **Step 3: Create BabyFoodHub**

Create `features/BabyFoodHub.tsx`:

```tsx
const MEALS = [
  { icon: "🥕", name: "Carrot + Rice Porridge", desc: "Lunch · Grains + Vegetables" },
  { icon: "🍌", name: "Banana Mash", desc: "Snack · Fruits" },
];

const ALLERGENS = [
  { icon: "🥚", name: "Egg", status: "safe" },
  { icon: "🥜", name: "Peanut", status: "safe" },
  { icon: "🥛", name: "Dairy", status: "testing" },
  { icon: "🌾", name: "Wheat", status: "pending" },
  { icon: "🐟", name: "Fish", status: "pending" },
];

export default function BabyFoodHub() {
  return (
    <div className="bg-[rgba(255,159,67,0.04)] border border-[rgba(255,159,67,0.1)] rounded-2xl p-6">
      <div className="text-white text-sm font-semibold mb-1">Today&apos;s Meal Plan</div>
      <div className="text-white/40 text-xs mb-4">8-10 months stage</div>

      {/* Meals */}
      <div className="flex flex-col gap-2 mb-4">
        {MEALS.map((meal, i) => (
          <div key={i} className="flex items-center gap-3 px-3.5 py-2.5 bg-food/[0.08] rounded-xl">
            <span className="text-lg">{meal.icon}</span>
            <div>
              <div className="text-white text-xs font-semibold">{meal.name}</div>
              <div className="text-white/40 text-[10px]">{meal.desc}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Allergens */}
      <div className="text-white/50 text-xs font-semibold mb-2">Allergen Status</div>
      <div className="flex gap-1.5 flex-wrap">
        {ALLERGENS.map((a, i) => {
          const style = {
            safe: { bg: "rgba(80,200,120,0.12)", border: "rgba(80,200,120,0.2)", color: "#50C878", suffix: " ✓" },
            testing: { bg: "rgba(255,200,50,0.12)", border: "rgba(255,200,50,0.2)", color: "#FFD700", suffix: " ⏳" },
            pending: { bg: "rgba(255,255,255,0.04)", border: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.4)", suffix: "" },
          }[a.status];

          return (
            <span
              key={i}
              className="px-2.5 py-1 rounded-md text-[10px] border"
              style={{ background: style.bg, borderColor: style.border, color: style.color }}
            >
              {a.icon} {a.name}{style.suffix}
            </span>
          );
        })}
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Commit**

```bash
cd /Users/petr/Documents/GitHub/bebilog-website
git add features/GrowthChart.tsx features/VaccineSchedule.tsx features/BabyFoodHub.tsx
git commit -m "feat: add GrowthChart, VaccineSchedule, and BabyFoodHub visuals"
```

---

### Task 9: FeatureGrid, Pricing, FooterCTA, Footer

**Files:**
- Create: `components/FeatureGrid.tsx`, `components/Pricing.tsx`, `components/FooterCTA.tsx`, `components/Footer.tsx`

- [ ] **Step 1: Create FeatureGrid**

Create `components/FeatureGrid.tsx`:

```tsx
"use client";

import { useTranslations } from "next-intl";
import AnimateInView from "./AnimateInView";
import { GRID_ITEMS } from "@/lib/constants";

export default function FeatureGrid() {
  const t = useTranslations("grid");

  return (
    <section className="py-24 px-6" id="features">
      <div className="max-w-6xl mx-auto">
        <AnimateInView className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-3">
            {t("title")}
          </h2>
          <p className="text-white/40 text-base">{t("subtitle")}</p>
        </AnimateInView>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 max-w-3xl mx-auto">
          {GRID_ITEMS.map((item, i) => (
            <AnimateInView key={item.key} delay={i * 0.03}>
              <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-5 text-center hover:border-white/[0.12] hover:-translate-y-0.5 transition-all">
                <div className="text-3xl mb-2">{item.icon}</div>
                <div className="text-white text-sm font-semibold">
                  {t(`items.${item.key}.title`)}
                </div>
                <div className="text-white/40 text-xs mt-1">
                  {t(`items.${item.key}.description`)}
                </div>
              </div>
            </AnimateInView>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Create Pricing**

Create `components/Pricing.tsx`:

```tsx
"use client";

import { useTranslations } from "next-intl";
import AnimateInView from "./AnimateInView";

export default function Pricing() {
  const t = useTranslations("pricing");

  const freeFeatures = t.raw("free.features") as string[];
  const proFeatures = t.raw("pro.features") as string[];

  return (
    <section className="py-24 px-6" id="pricing">
      <div className="max-w-6xl mx-auto">
        <AnimateInView className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-3">
            {t("title")}
          </h2>
          <p className="text-white/40 text-base">{t("subtitle")}</p>
        </AnimateInView>

        <div className="flex flex-col md:flex-row gap-5 max-w-2xl mx-auto">
          {/* Free */}
          <AnimateInView direction="left" className="flex-1">
            <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-8 h-full">
              <div className="text-white/50 text-sm font-semibold uppercase tracking-wider mb-4">
                {t("free.name")}
              </div>
              <div className="text-4xl font-extrabold text-white mb-1">{t("free.price")}</div>
              <div className="text-white/30 text-sm mb-6">{t("free.period")}</div>
              <div className="flex flex-col gap-2.5">
                {freeFeatures.map((f, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className="text-growth text-xs">✓</span>
                    <span className="text-white/60 text-sm">{f}</span>
                  </div>
                ))}
              </div>
            </div>
          </AnimateInView>

          {/* Pro */}
          <AnimateInView direction="right" className="flex-1">
            <div className="relative bg-gradient-to-b from-brand/[0.08] to-sleep/[0.08] border border-brand/20 rounded-2xl p-8 h-full">
              <div className="absolute -top-2.5 right-5 px-3 py-1 bg-gradient-to-r from-brand to-sleep rounded-md text-white text-[11px] font-bold">
                {t("pro.badge")}
              </div>
              <div className="text-brand/80 text-sm font-semibold uppercase tracking-wider mb-4">
                {t("pro.name")}
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-extrabold text-white">{t("pro.price")}</span>
                <span className="text-white/40 text-sm">{t("pro.period")}</span>
              </div>
              <div className="text-white/30 text-sm mb-6">{t("pro.altPricing")}</div>
              <div className="flex flex-col gap-2.5">
                {proFeatures.map((f, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className="text-brand text-xs">★</span>
                    <span className="text-white/60 text-sm">{f}</span>
                  </div>
                ))}
              </div>
            </div>
          </AnimateInView>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Create FooterCTA**

Create `components/FooterCTA.tsx`:

```tsx
"use client";

import { useTranslations } from "next-intl";
import AnimateInView from "./AnimateInView";
import { APP_STORE_URL } from "@/lib/constants";

export default function FooterCTA() {
  const t = useTranslations("footerCTA");
  const heroT = useTranslations("hero");

  return (
    <section className="py-24 px-6 bg-[radial-gradient(ellipse_at_center,rgba(255,107,107,0.06)_0%,transparent_70%)]">
      <AnimateInView className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
          {t("title")}
        </h2>
        <p className="text-white/40 text-base mb-8">{t("subtitle")}</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href={APP_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-7 py-3.5 bg-white rounded-xl text-[#0a0a0a] font-semibold text-base hover:bg-white/90 transition-colors"
          >
            🍎 {heroT("downloadIOS")}
          </a>
          <div className="flex items-center justify-center gap-2 px-7 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white/50 text-base cursor-default">
            🤖 {heroT("androidComingSoon")}
          </div>
        </div>
      </AnimateInView>
    </section>
  );
}
```

- [ ] **Step 4: Create Footer**

Create `components/Footer.tsx`:

```tsx
import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="border-t border-white/[0.06] px-6 py-8">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-gradient-to-br from-brand to-[#FF8E8E]" />
          <span className="text-white/50 text-sm font-semibold">Bebilog</span>
        </div>
        <div className="flex gap-6">
          <a href="#" className="text-white/30 text-sm hover:text-white/50 transition-colors">
            {t("privacy")}
          </a>
          <a href="#" className="text-white/30 text-sm hover:text-white/50 transition-colors">
            {t("terms")}
          </a>
          <a href="#" className="text-white/30 text-sm hover:text-white/50 transition-colors">
            {t("support")}
          </a>
        </div>
        <div className="text-white/20 text-xs">{t("copyright")}</div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 5: Commit**

```bash
cd /Users/petr/Documents/GitHub/bebilog-website
git add components/FeatureGrid.tsx components/Pricing.tsx components/FooterCTA.tsx components/Footer.tsx
git commit -m "feat: add FeatureGrid, Pricing, FooterCTA, and Footer components"
```

---

### Task 10: Assemble Full Page

**Files:**
- Modify: `app/[locale]/page.tsx`

- [ ] **Step 1: Compose all sections in page.tsx**

Replace `app/[locale]/page.tsx`:

```tsx
import { setRequestLocale } from "next-intl/server";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import FeatureSection from "@/components/FeatureSection";
import TrackingGrid from "@/features/TrackingGrid";
import InsightsViz from "@/features/InsightsViz";
import PredictionTimeline from "@/features/PredictionTimeline";
import GrowthChart from "@/features/GrowthChart";
import VaccineSchedule from "@/features/VaccineSchedule";
import BabyFoodHub from "@/features/BabyFoodHub";
import FeatureGrid from "@/components/FeatureGrid";
import Pricing from "@/components/Pricing";
import FooterCTA from "@/components/FooterCTA";
import Footer from "@/components/Footer";
import { FEATURES } from "@/lib/constants";

type Props = {
  params: Promise<{ locale: string }>;
};

const FEATURE_VISUALS: Record<string, React.ComponentType> = {
  tracking: TrackingGrid,
  insights: InsightsViz,
  predictions: PredictionTimeline,
  growth: GrowthChart,
  vaccine: VaccineSchedule,
  food: BabyFoodHub,
};

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="min-h-screen bg-[#0a0a0a]">
      <Nav />
      <Hero />
      {FEATURES.map((feature) => {
        const Visual = FEATURE_VISUALS[feature.key];
        return (
          <FeatureSection key={feature.key} feature={feature}>
            <Visual />
          </FeatureSection>
        );
      })}
      <FeatureGrid />
      <Pricing />
      <FooterCTA />
      <Footer />
    </main>
  );
}
```

- [ ] **Step 2: Verify full page renders**

```bash
cd /Users/petr/Documents/GitHub/bebilog-website
npm run dev
```

Visit `http://localhost:3000/en` — all 12 sections should render with scroll animations. Visit `/zh` — all text should be in Chinese. Check responsive layout at mobile width.

- [ ] **Step 3: Fix any rendering issues**

Walk through each section. Check:
- Nav sticks on scroll with blur effect
- Hero badge, title gradient, phone mockup with floating animation
- Each feature section alternates text/visual layout
- Feature grid shows 4 columns on desktop, 2 on mobile
- Pricing cards render side by side on desktop, stacked on mobile
- Footer CTA has subtle radial glow
- Language toggle switches between EN/ZH

- [ ] **Step 4: Commit**

```bash
cd /Users/petr/Documents/GitHub/bebilog-website
git add app/[locale]/page.tsx
git commit -m "feat: assemble full landing page with all sections"
```

---

### Task 11: SEO, Metadata, and Final Polish

**Files:**
- Modify: `app/[locale]/layout.tsx`
- Create: `app/robots.ts`, `app/sitemap.ts`

- [ ] **Step 1: Add hreflang and Open Graph metadata**

Update `app/[locale]/layout.tsx` `generateMetadata` function — add after the existing return:

```tsx
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const messages = await getMessages({ locale });
  const meta = messages.meta as { title: string; description: string };
  return {
    title: meta.title,
    description: meta.description,
    metadataBase: new URL("https://bebilog.cn"),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        en: "/en",
        zh: "/zh",
      },
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: `https://bebilog.cn/${locale}`,
      siteName: "Bebilog",
      type: "website",
    },
  };
}
```

- [ ] **Step 2: Add robots.ts**

Create `app/robots.ts`:

```ts
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://bebilog.cn/sitemap.xml",
  };
}
```

- [ ] **Step 3: Add sitemap.ts**

Create `app/sitemap.ts`:

```ts
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "https://bebilog.cn/en", lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: "https://bebilog.cn/zh", lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
  ];
}
```

- [ ] **Step 4: Verify build succeeds**

```bash
cd /Users/petr/Documents/GitHub/bebilog-website
npm run build
```

Expected: Build succeeds with no errors. Static pages generated for `/en` and `/zh`.

- [ ] **Step 5: Commit**

```bash
cd /Users/petr/Documents/GitHub/bebilog-website
git add -A
git commit -m "feat: add SEO metadata, robots.txt, and sitemap"
```

---

### Task 12: Push to GitHub

- [ ] **Step 1: Push all commits**

```bash
cd /Users/petr/Documents/GitHub/bebilog-website
git push -u origin main
```

- [ ] **Step 2: Verify repo on GitHub**

Visit https://github.com/PetrGuan/bebilog-website and confirm all files are present.
