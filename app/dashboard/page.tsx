"use client";

import {
  addRevision,
  deleteRevision,
  getTodayRevisions,
  Revision,
} from "@/actions/revisions";
import { RevisionProgressCard } from "@/components/RevisionProgressCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { account } from "@/lib/appwriteClient";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";

export default function DashboardPage() {
  const [topic, setTopic] = useState("");
  const [revisions, setRevisions] = useState<Revision[]>([]);
  const [isLoading, startTransition] = useTransition();
  const [addLoading, startAddTransition] = useTransition();

  const router = useRouter();
  const today = new Date().toISOString().split("T")[0];

  // Fetch today's revisions
  useEffect(() => {
    startTransition(async () => {
      try {
        const user = await account.get();
        if (!user.$id) throw new Error("Unauthenticated");
        const data = await getTodayRevisions(user.$id);
        setRevisions(data);
      } catch {
        router.push("/login");
      }
    });
  }, [router]);

  if (isLoading) return <p className="text-center mt-10">Loading...</p>;

  const handleAdd = async () => {
    if (!topic.trim()) return alert("Please enter a topic name");
    startAddTransition(async () => {
      try {
        const user = await account.get();
        const USER_ID = user.$id;
        const res = await addRevision(USER_ID, topic);
        if (res.success) {
          setTopic("");
          const data: Revision[] = await getTodayRevisions(USER_ID);
          setRevisions(data);
        } else {
          alert("Failed to add topic");
          console.error(res.error);
        }
      } catch (err) {
        console.error("Error fetching user:", err);
        alert("User not logged in or session expired");
      }
    });
  };

  const handleComplete = async (rev: Revision) => {
    try {
      await deleteRevision(rev.$id);
      setRevisions(revisions.filter((r) => r.$id !== rev.$id));
    } catch (err) {
      console.error("Failed to complete revision:", err);
      alert("Could not complete revision.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 py-10 px-2 sm:px-6 lg:px-8 relative">
      <div className="h-68 w-68 z-0  bg-blue-700 blur-[120px] shadow-2xl  top-1/2 left-1/2 fixed transform -translate-x-1/2 -translate-y-1/2  " />
      <div className=" z-0 hidden md:block h-40 w-40  bg-violet-700 blur-[130px] shadow-2xl  bottom-0 right-0 absolute " />

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto backdrop-blur-lg  border border-gray-600 rounded-lg shadow-lg bg-white/5 p-6"
      >
        <div className="text-3xl font-bold text-center text-gray-900 mb-6 md:flex items-center justify-center gap-1.5">
          <Image
            src={"/task.gif"}
            height={1000}
            width={1000}
            alt="task"
            className="h-14 rounded w-14 inline"
          />
          <h1 className="bg-linear-to-r from-blue-500 to-emerald-500 text-transparent bg-clip-text">
            Smart Revision Tracker{" "}
          </h1>
        </div>

        {/* Input + Add Button */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <Textarea
            placeholder="Enter topic name"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="flex-1 placeholder:text-gray-200 text-white/80"
          />
          <Button
            onClick={handleAdd}
            disabled={addLoading}
            className="w-full disabled:opacity-70 disabled:cursor-not-allowed bg-blue-500 hover:bg-blue-600 sm:w-auto"
          >
            {addLoading ? "adding.." : "Add"}
          </Button>
        </div>

        {/* Divider */}
       <Separator className="mb-2 bg-gray-300"/>

        <h2 className="text-lg font-semibold text-gray-300 mb-4">
          Today’s Revisions
        </h2>

        {revisions.length === 0 ? (
          <div className="text-center text-gray-200 mt-6">
            {" "}
            <Image
              src={"/business.png"}
              height={1000}
              width={1000}
              alt="task"
              className="h-14 rounded w-14 inline"
            />
            <p>No revisions yet </p>{" "}
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {revisions.map((rev, index) => {
              const dates = rev.nextRevisionDates;
              const currentIndex = dates.findIndex((d) => d === today);
              const isLast = currentIndex === dates.length - 1;

              const nextDate = !isLast ? dates[currentIndex + 1] : null;

              return (
                <motion.div
                  key={rev.$id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-transparent backdrop-blur-lg  rounded-xl p-4 shadow hover:shadow-md transition"
                >
                  <div className="flex flex-col gap-2">
                    <span className="text-lg font-semibold text-gray-200 capitalize">
                      {rev.topicName}
                    </span>

                    {!isLast ? (
                      <>
                        <div className="flex flex-wrap gap-2 mt-1">
                          <Badge
                            variant="secondary"
                            className="bg-green-200 text-green-500"
                          >
                            Current: {today}
                          </Badge>
                          {nextDate && (
                            <Badge
                              variant="secondary"
                              className="bg-blue-200 text-blue-500"
                            >
                              Next: {nextDate}
                            </Badge>
                          )}
                        </div>
                      </>
                    ) : (
                      <Button
                        variant="default"
                        className="mt-2"
                        onClick={() => handleComplete(rev)}
                      >
                        Complete
                      </Button>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </motion.div>

      <div className="flex flex-col gap-4 relative z-50 mt-5 ">
        <RevisionProgressCard />
      </div>
    </div>
  );
}
