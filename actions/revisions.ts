"use server";

import { ID, serverDatabases } from "@/lib/appwrite";
import { Models, Query } from "node-appwrite";


// ✅ Fetch today’s revisions
export interface Revision extends Models.Document {
  userId: string;
  topicName: string;
  nextRevisionDates: string[];
  done: boolean;
}


// Helper function to calculate next revision dates as array of strings
// function generateNextRevisions() {
//   const now = new Date();
//   return [1, 3, 7, 15].map(
//     (d) =>
//       new Date(now.getTime() + d * 24 * 60 * 60 * 1000)
//         .toISOString()
//         .split("T")[0]
//   );
// }

function generateNextRevisions() {
  const now = new Date();
  return [1, 3, 7, 15].map((d) => {
    const localDate = new Date(
      now.getTime() + d * 24 * 60 * 60 * 1000
    );
    // Convert to local YYYY-MM-DD (not UTC)
    return localDate.toLocaleDateString("en-CA", { timeZone: "Asia/Dhaka" });
  });
}


//Add new topic
export async function addRevision(userId: string, topicName: string) {
  try {
    const nextRevisionDates = generateNextRevisions();
    const doc = await serverDatabases.createDocument(
      process.env.DATABASE_ID!,
      process.env.COLLECTION_ID!,
      ID.unique(),
      {
        userId,
        topicName,
        nextRevisionDates, // array of strings
        done: false,
      }
    );

    return { success: true, data: doc };
  } catch (err) {
    console.error("Add revision error:", err);
    return { success: false, error: err };
  }
}


export async function getTodayRevisions(userId: string): Promise<Revision[]> {
  try {
   const today = new Date().toLocaleDateString("en-CA", { timeZone: "Asia/Dhaka" });


    const res = await serverDatabases.listDocuments<Revision>( // Here we tell Appwrite what shape to expect
      process.env.DATABASE_ID!, // "!" tells TypeScript it's not undefined
      process.env.COLLECTION_ID!,
      [Query.equal("userId", userId)]
    );

    // Filter revisions scheduled for today
    const todayRevisions = res.documents.filter((doc) =>
      doc.nextRevisionDates.includes(today)
    );

    return todayRevisions;
  } catch (err) {
    console.error("Fetch error:", err);
    return [];
  }
}

export async function getAllRevisions(userId: string): Promise<Revision[]> {
  try {
    console.log("userId:", userId);

    const res = await serverDatabases.listDocuments<Revision>(
      process.env.DATABASE_ID!,
      process.env.COLLECTION_ID!,
      [
        Query.equal("userId", userId), // filter by userId
        Query.orderAsc("$createdAt"), // oldest first
        Query.limit(2)
      ]
    );
    return res.documents; // typed as Revision[]
  } catch (err) {
    console.error("Fetch error:", err);
    return [];
  }
}

export async function deleteRevision(revisionId: string) {
  try {
    await serverDatabases.deleteDocument(
      process.env.DATABASE_ID!, // "!" tells TypeScript it's not undefined
      process.env.COLLECTION_ID!,
      revisionId
    );
    return { success: true };
  } catch (err) {
    console.error("Delete revision error:", err);
    return { success: false, error: err };
  }
}
