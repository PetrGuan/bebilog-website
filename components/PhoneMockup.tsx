"use client";

import { motion } from "framer-motion";

export default function PhoneMockup() {
  return (
    <motion.div
      className="relative"
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[400px] bg-[radial-gradient(ellipse,rgba(255,107,107,0.15)_0%,rgba(175,130,255,0.1)_40%,transparent_70%)] blur-[40px]" />
      <div className="relative w-[260px] h-[520px] bg-[#1c1c1e] rounded-[40px] border-[3px] border-white/10 p-3 shadow-[0_20px_60px_rgba(0,0,0,0.5),0_0_40px_rgba(255,107,107,0.1)]">
        <div className="w-[90px] h-[26px] bg-[#0a0a0a] rounded-b-2xl mx-auto mb-2" />
        <div className="rounded-3xl h-[440px] overflow-hidden">
          <img
            src="/images/screenshot-home.png"
            alt="Bebilog app home screen"
            className="w-full h-full object-cover object-top"
          />
        </div>
      </div>
    </motion.div>
  );
}
