"use client";

import { motion } from "framer-motion";
import React from "react";

export default function HeaderSection() {
  return (
    <div className="overflow-hidden whitespace-nowrap border-y border-gray-200 dark:border-gray-700 py-1">
      <motion.div
        className="flex gap-12"
        animate={{ x: ["0%", "-100%"] }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: 15,
        }}
      >
        {Array.from({ length: 20 }).map((_, i) => (
          <span
            key={i}
            className="text-2xl font-bold uppercase tracking-wide text-gray-800 dark:text-white"
          >
            GrosPack
          </span>
        ))}
      </motion.div>
    </div>
  );
}
