import { Client, Databases, ID } from "node-appwrite"; // ✅ node-appwrite

const serverClient = new Client()
  .setEndpoint("https://fra.cloud.appwrite.io/v1")
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!)
  .setKey(process.env.APPWRITE_API_KEY!); // ✅ server API key

export const serverDatabases = new Databases(serverClient);
export { serverClient, ID }; // export ID for createDocument
