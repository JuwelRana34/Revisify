import { serverDatabases } from "@/lib/appwrite";
import { NextResponse } from "next/server";


export async function DELETE() {
  try {
  
    const today = new Date().toISOString().split("T")[0];

    // Get all documents (you can paginate if large)
    const result = await serverDatabases.listDocuments(process.env.DATABASE_ID!, process.env.COLLECTION_ID!);

    // Filter docs where *all* revision dates are older than today
    const oldDocs = result.documents.filter((doc) => {
      if (!doc.nextRevisionDates || !Array.isArray(doc.nextRevisionDates)) return false;

      return doc.nextRevisionDates.every((date: string) => date < today);
    });

    if (oldDocs.length === 0) {
      return NextResponse.json({ success: true, message: "No old data found" });
    }

    // Delete old documents
    for (const doc of oldDocs) {
      await serverDatabases.deleteDocument(process.env.DATABASE_ID!, process.env.COLLECTION_ID!, doc.$id);
    }

    return NextResponse.json({
      success: true,
      deletedCount: oldDocs.length,
      message: `${oldDocs.length} old items deleted successfully`,
    });
  } catch (error) {
    console.error("Delete old revisions error:", error);
    return NextResponse.json(
      { success: false, error: String(error) },
      { status: 500 }
    );
  }
}
