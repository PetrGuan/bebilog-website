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
