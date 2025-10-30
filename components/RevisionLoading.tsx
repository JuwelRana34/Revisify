"use client";

import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";

export default function RevisionLoading() {
  return (
    <div className="min-h-screen bg-gray-900 py-10 px-2 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Glowing background blobs */}
      <div className="h-68 w-68 z-0 bg-blue-700 blur-[120px] shadow-2xl fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
      <div className="hidden md:block h-40 w-40 z-0 bg-violet-700 blur-[130px] shadow-2xl absolute bottom-0 right-0" />

      {/* Center content skeleton */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto p-6 rounded-lg shadow-lg bg-white/5 backdrop-blur-lg border border-gray-600"
      >
        {/* Header */}
        <div className="flex items-center justify-center gap-4 mb-6">
          <Skeleton className="h-14 w-14 rounded-full" />
          <Skeleton className="h-8 w-64 rounded-md" />
        </div>

        {/* Input + Button Skeleton */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <Skeleton className="flex-1 h-12 rounded-md" />
          <Skeleton className="h-12 w-32 rounded-md" />
        </div>

        {/* Divider */}
        <Separator className="mb-2 bg-gray-300" />

        {/* Section title */}
        <Skeleton className="h-6 w-48 mb-4 rounded-md" />

        {/* Revisions list */}
        <div className="flex flex-col gap-4">
          {[...Array(4)].map((_, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/5 backdrop-blur-lg rounded-xl p-4 shadow"
            >
              <Skeleton className="h-5 w-3/4 mb-2 rounded-md" />
              <div className="flex gap-2">
                <Skeleton className="h-6 w-16 rounded-full" />
                <Skeleton className="h-6 w-16 rounded-full" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Progress Card Skeleton */}
        <div className="mt-6">
          <Skeleton className="h-24 w-full rounded-xl" />
        </div>
      </motion.div>
    </div>
  );
}
