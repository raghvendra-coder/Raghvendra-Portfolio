import { MongoClient } from "mongodb";

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

let clientPromise: Promise<MongoClient> | undefined;

// Connects lazily — only when a route handler actually calls
// getMessagesCollection() — so importing this file (e.g. during `next build`)
// never tries to open a network connection.
function getClientPromise(): Promise<MongoClient> {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error(
      "Missing MONGODB_URI environment variable. Add it to .env.local (see .env.local.example)."
    );
  }

  if (process.env.NODE_ENV === "development") {
    // Reuse the connection across hot-reloads in dev.
    if (!global._mongoClientPromise) {
      global._mongoClientPromise = new MongoClient(uri).connect();
    }
    return global._mongoClientPromise;
  }

  if (!clientPromise) {
    clientPromise = new MongoClient(uri).connect();
  }
  return clientPromise;
}

export async function getMessagesCollection() {
  const client = await getClientPromise();
  const db = client.db(); // uses the database name from the connection string
  return db.collection("messages");
}
