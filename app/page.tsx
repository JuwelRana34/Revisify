"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-linear-to-br from-indigo-600 via-blue-500 to-sky-400 text-white">
      {/* Blurred glowing blob background */}
      <div className="absolute h-72 w-72 bg-green-500 blur-[120px] opacity-40 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-2xl rounded-full"></div>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="z-10 text-center px-6"
      >
        <h1 className="text-5xl font-bold mb-3 drop-shadow-md">
          Welcome to <span className="text-green-300">Revisify</span>
        </h1>
        <p className="text-lg text-white/90 mb-6">
          Your smart study revision tracker
        </p>

        <Link href="/login">
          <Button
            size="lg"
            className="bg-linear-to-r from-green-500 to-emerald-600 text-white font-semibold px-8 py-6 rounded-full shadow-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-300"
          >
            Login
          </Button>
        </Link>
      </motion.div>
    </div>
  );
}
