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
