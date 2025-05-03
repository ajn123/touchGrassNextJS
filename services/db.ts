import { MongoClient } from 'mongodb';

let client: MongoClient | null = null;
let isConnecting = false;

export const connectToDB = async () => {
  if (client) {
    return client;
  }

  if (isConnecting) {
    // This block only executes if another connection attempt is already in progress
    // On the first connection attempt, isConnecting is false, so this block is skipped
    // and execution continues to the try/finally block below where the actual connection happens
    
    // For subsequent concurrent connection attempts, this creates a waiting mechanism
    while (isConnecting) {
      // Pause execution for 100ms using a Promise-based timeout
      // This prevents tight CPU-bound loops while waiting
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    // Once isConnecting becomes false (set in the finally block of the first connection),
    // the while loop exits and we return the now-established client connection
    // This is not an infinite loop because the first connection attempt will eventually
    // set isConnecting to false in its finally block, allowing all waiting calls to proceed
    return client;
  }

  try {
    isConnecting = true;
    client = new MongoClient(process.env.MONGODB_URI as string);
    await client.connect();
    return client;
  } finally {
    isConnecting = false;
  }
};

export const disconnectFromDB = async () => {
  if (client) {
    await client.close();
    client = null;
  }
};

export const getDB = async () => {
  if (!client) {
    await connectToDB();
  }
  return client;
};
