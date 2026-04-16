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

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-white/50 text-lg max-w-xl mx-auto mb-10 leading-relaxed"
        >
          {t("subtitle")}
        </motion.p>

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

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex justify-center"
        >
          <PhoneMockup />
        </motion.div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#0a0a0a] to-transparent" />
    </section>
  );
}
