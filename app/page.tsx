"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center bg-linear-to-br from-indigo-600 via-blue-500 to-sky-400 text-white">
      {/* Glowing animated background blob */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0.4 }}
        animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.6, 0.4] }}
        transition={{ repeat: Infinity, duration: 6 }}
        className="absolute h-96 w-96 bg-green-400/40 blur-[120px] rounded-full top-1/3 left-1/2 -translate-x-1/2"
      ></motion.div>

      {/* Floating decorative circles */}
      <motion.div
        className="absolute top-10 left-10 w-32 h-32 bg-blue-400/50 rounded-full blur-3xl"
        animate={{ y: [0, 20, 0] }}
        transition={{ repeat: Infinity, duration: 5 }}
      />
      <motion.div
        className="absolute bottom-10 right-10 w-40 h-40 bg-green-500/30 rounded-full blur-3xl"
        animate={{ y: [0, -20, 0] }}
        transition={{ repeat: Infinity, duration: 5 }}
      />

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="z-10 text-center px-6 max-w-2xl"
      >
        <motion.h1
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-7xl font-extrabold mb-4 drop-shadow-lg"
        >
          Welcome to <span className="text-green-400">Revisify</span>
        </motion.h1>

        <p className="text-lg md:text-xl text-white/90 mb-8">
          The smart way to organize, track, and master your study revisions.
        </p>

        <div className="flex justify-center gap-4">
          <Link href="/about">
            <Button
              size="lg"
              className="bg-linear-to-r from-green-400 to-emerald-600 text-white font-semibold px-8 py-6 rounded-full shadow-lg hover:scale-105 transition-all duration-300"
            >
              Learn More
            </Button>
          </Link>

          <Link href="/dashboard">
            <Button
              variant="outline"
              size="lg"
              className= " bg-transparent text-white border-2 border-white/80 hover:bg-white/10 rounded-full px-8 py-6 font-semibold backdrop-blur-sm"
            >
              Get Started
            </Button>
          </Link>
        </div>
      </motion.div>

      {/* Subtle footer */}
      <div className="absolute bottom-6 text-center text-white/60 text-sm">
        © {new Date().getFullYear()} Revisify — Focus. Revise. Succeed.
      </div>
    </div>
  );
}
