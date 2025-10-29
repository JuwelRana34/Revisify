// "use client";

// import { Revision } from "@/actions/revisions";
// import { Badge } from "@/components/ui/badge";
// import { cn } from "@/lib/utils";
// import { motion } from "framer-motion";

// interface Props {
//   revision: Revision;
// }

// export function RevisionProgressCard({ revision }: Props) {
//   const today = new Date().toISOString().split("T")[0];

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.6 }}
//       className="relative bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 p-6 sm:p-8 rounded-3xl shadow-2xl border border-slate-700 overflow-hidden flex flex-col items-center z-10"
//     >
//       {/* Background glow */}
//       <div className="absolute inset-0 bg-[radial-linear(circle_at_center,rgba(255,255,255,0.05)_0%,transparent_80%)]" />

//       <h3 className="text-2xl font-bold text-white mb-8 tracking-wide relative z-10 text-center">
//         {revision.topicName}
//       </h3>

//       {/* Timeline wrapper */}
//       <div className="flex flex-col sm:flex-row items-center sm:items-start justify-center sm:justify-between gap-10 sm:gap-6 w-full relative z-10 max-w-3xl">
//         {revision.nextRevisionDates.map((date, i) => {
//           const dateObj = new Date(date);
//           const todayObj = new Date(today);

//           let status: "done" | "current" | "upcoming";
//           if (dateObj < todayObj) status = "done";
//           else if (date === today) status = "current";
//           else status = "upcoming";

//           const isLast = i === revision.nextRevisionDates.length - 1;

//           return (
//             <div
//               key={i}
//               className="relative flex flex-col sm:flex-1 items-center"
//             >
//               {/* Connector line */}
//               {!isLast && (
//                 <>
//                   {/* Horizontal line (desktop) */}
//                   <div
//                     className={cn(
//                       "hidden sm:block absolute top-1/2 left-1/2 translate-y-[-50%] w-full h-[3px] z-0 rounded-full",
//                       status === "done"
//                         ? "bg-linear-to-r from-green-400 to-emerald-500"
//                         : status === "current"
//                         ? "bg-linear-to-r from-orange-500 to-red-500 animate-pulse"
//                         : "bg-slate-700"
//                     )}
//                   />
//                   {/* Vertical line (mobile) */}
//                   <div
//                     className={cn(
//                       "sm:hidden absolute left-1/2 top-full translate-x-[-50%] w-[3px] h-10 z-0 rounded-full",
//                       status === "done"
//                         ? "bg-linear-to-b from-green-400 to-emerald-500"
//                         : status === "current"
//                         ? "bg-linear-to-b from-orange-500 to-red-500 animate-pulse"
//                         : "bg-slate-700"
//                     )}
//                   />
//                 </>
//               )}

//               {/* Glowing Circle */}
//               <motion.div
//                 animate={
//                   status === "current"
//                     ? {
//                         scale: [1, 1.2, 1],
//                         boxShadow: [
//                           "0 0 25px rgba(255,100,0,0.5)",
//                           "0 0 45px rgba(255,50,0,0.8)",
//                           "0 0 30px rgba(255,140,0,0.6)",
//                         ],
//                       }
//                     : { scale: 1, boxShadow: "none" }
//                 }
//                 transition={{
//                   duration: 1.5,
//                   repeat: status === "current" ? Infinity : 0,
//                   ease: "easeInOut",
//                 }}
//                 className={cn(
//                   "relative md:top-10 w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center font-bold text-base sm:text-lg z-10 transition-all duration-500",
//                   status === "done"
//                     ? "bg-green-500 text-white"
//                     : status === "current"
//                     ? "bg-linear-to-br from-orange-500 to-red-600 text-white"
//                     : "bg-slate-700 text-gray-400"
//                 )}
//               >
//                 {/* Fire animation layer */}
//                 {status === "current" && (
//                   <motion.div
//                     className="absolute inset-0 rounded-full bg-[radial-linear(circle_at_center,rgba(255,140,0,0.5)_0%,transparent_70%)] blur-md"
//                     animate={{ opacity: [0.7, 1, 0.7], scale: [1, 1.25, 1] }}
//                     transition={{ duration: 1.2, repeat: Infinity }}
//                   />
//                 )}
//                 <span className="relative z-10 drop-shadow-md">{i + 1}</span>
//               </motion.div>

//               {/* Badge */}
//               <Badge
//                 variant="secondary"
//                 className={cn(
//                   "mt-2 md:mt-12 text-xs sm:text-sm font-medium border-none px-3 py-1 rounded-full ",
//                   status === "done"
//                     ? "bg-green-500/20 text-green-300"
//                     : status === "current"
//                     ? "bg-orange-500/20 text-orange-300"
//                     : "bg-slate-600/40 text-gray-400"
//                 )}
//               >
//                 Day {i + 1}
//               </Badge>

//               <p className="text-[11px] sm:text-xs text-slate-400 mt-1">
//                 {date}
//               </p>
//             </div>
//           );
//         })}
//       </div>
//     </motion.div>
//   );
// }

"use client";

import { getAllRevisions, Revision } from "@/actions/revisions";
import { Badge } from "@/components/ui/badge";
import { account } from "@/lib/appwriteClient"; // make sure you import your Appwrite account
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function RevisionProgressCard() {
  const [allRevisions, setAllRevisions] = useState<Revision[]>([]);

  useEffect(() => {
    const fetchRevisions = async () => {
      const user = await account.get();
      if (!user.$id) throw new Error("Unauthenticated");
      const data = await getAllRevisions(user.$id);
      setAllRevisions(data);
    };
    fetchRevisions();
  }, []);

  const today = new Date().toISOString().split("T")[0];

  return (
    <>
      {allRevisions.map((revision) => {
        const dates = revision.nextRevisionDates.map((d) => new Date(d));

        // Compute day numbers: 1, 3, 7, 15 dynamically
        const dayNumbers: number[] = [];

        dates.forEach((date, i) => {
          if (i === 0) {
            dayNumbers.push(1); // first revision is day 1
          } else {
            // difference from the previous revision
            const diffDays = Math.round(
              (date.getTime() - dates[i - 1].getTime()) / (1000 * 60 * 60 * 24)
            );
            dayNumbers.push(dayNumbers[i - 1] + diffDays);
          }
        });

        return (
          <motion.div
            key={revision.$id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative bg-transparent backdrop-blur-3xl p-6 sm:p-8 rounded-3xl shadow-2xl border border-slate-700 overflow-hidden flex flex-col items-center z-10"
          >
            <div className="absolute inset-0 bg-[radial-linear(circle_at_center,rgba(255,255,255,0.05)_0%,transparent_80%)]" />

            <h3 className="text-2xl font-bold text-white mb-8 tracking-wide relative z-10 text-center capitalize">
              {revision.topicName}
            </h3>

            {/* Timeline */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-10 sm:gap-6 w-full relative z-10 max-w-3xl">
              {dates.map((date, i) => {
                const dateStr = date.toISOString().split("T")[0];
                const todayObj = new Date(today);
                let status: "done" | "current" | "upcoming";

                if (date < todayObj) status = "done";
                else if (dateStr === today) status = "current";
                else status = "upcoming";

                const isLast = i === dates.length - 1;

                return (
                  <div
                    key={i}
                    className="relative flex flex-col sm:flex-1 items-center"
                  >
                    {/* Connector */}
                    {!isLast && (
                      <>
                        <div
                          className={cn(
                            "hidden sm:block absolute top-1/2 left-1/2 translate-y-[-50%] w-full h-[3px] rounded-full",
                            status === "done"
                              ? "bg-linear-to-r from-green-400 to-emerald-500"
                              : status === "current"
                              ? "bg-linear-to-r from-orange-500 to-red-500 animate-pulse"
                              : "bg-slate-700"
                          )}
                        />
                        <div
                          className={cn(
                            "sm:hidden absolute left-1/2 top-full translate-x-[-50%] w-[3px] h-10 rounded-full",
                            status === "done"
                              ? "bg-linear-to-b from-green-400 to-emerald-500"
                              : status === "current"
                              ? "bg-linear-to-b from-orange-500 to-red-500 animate-pulse"
                              : "bg-slate-700"
                          )}
                        />
                      </>
                    )}

                    {/* Circle */}
                    <motion.div
                      animate={
                        status === "current"
                          ? {
                              scale: [1, 1.2, 1],
                              boxShadow: [
                                "0 0 25px rgba(255,100,0,0.5)",
                                "0 0 45px rgba(255,50,0,0.8)",
                                "0 0 30px rgba(255,140,0,0.6)",
                              ],
                            }
                          : { scale: 1, boxShadow: "none" }
                      }
                      transition={{
                        duration: 1.5,
                        repeat: status === "current" ? Infinity : 0,
                        ease: "easeInOut",
                      }}
                      className={cn(
                        "relative md:top-10 w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center font-bold text-base sm:text-lg transition-all duration-500 z-10",
                        status === "done"
                          ? "bg-green-500 text-white"
                          : status === "current"
                          ? "bg-linear-to-br from-orange-500 to-red-600 text-white"
                          : "bg-slate-700 text-gray-400"
                      )}
                    >
                      {status === "current" && (
                        <motion.div
                          className="absolute inset-0 rounded-full bg-[radial-linear(circle_at_center,rgba(255,140,0,0.5)_0%,transparent_70%)] blur-md"
                          animate={{
                            opacity: [0.7, 1, 0.7],
                            scale: [1, 1.25, 1],
                          }}
                          transition={{ duration: 1.2, repeat: Infinity }}
                        />
                      )}
                      <span className="relative z-10 drop-shadow-md">
                        {dayNumbers[i]}
                      </span>
                    </motion.div>

                    {/* Badge */}
                    <Badge
                      variant="secondary"
                      className={cn(
                        "mt-2 md:mt-12 text-xs sm:text-sm font-medium border-none px-3 py-1 rounded-full",
                        status === "done"
                          ? "bg-green-500/20 text-green-300"
                          : status === "current"
                          ? "bg-orange-500/20 text-orange-300"
                          : "bg-slate-600/40 text-gray-400"
                      )}
                    >
                      Day {dayNumbers[i]}
                    </Badge>

                    <p className="text-[11px] sm:text-xs text-slate-400 mt-1">
                      {dateStr}
                    </p>
                  </div>
                );
              })}
            </div>
          </motion.div>
        );
      })}
    </>
  );
}
