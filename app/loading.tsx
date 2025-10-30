"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";

export default function Loading() {
  return (
    <motion.div
      className="flex flex-col space-y-6 p-8 md:p-16 w-full max-w-4xl mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Header skeleton */}
      <div className="flex flex-col space-y-2">
        <Skeleton className="h-8 w-1/3" />
        <Skeleton className="h-4 w-1/4" />
      </div>

      {/* Content skeletons */}
      <div className="space-y-4">
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-11/12" />
        <Skeleton className="h-5 w-10/12" />
        <Skeleton className="h-5 w-2/3" />
      </div>

      {/* Section skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="space-y-3">
            <Skeleton className="h-32 w-full rounded-xl" />
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        ))}
      </div>
    </motion.div>
  );
}
