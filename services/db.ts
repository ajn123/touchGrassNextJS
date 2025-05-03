import { MongoClient } from 'mongodb';

let client: MongoClient | null = null;
let isConnecting = false;

export const connectToDB = async () => {
  if (client) {
    return client;
  }

  if (isConnecting) {
    // Wait for the connection to be established
    while (isConnecting) {
      await new Promise(resolve => setTimeout(resolve, 100));
    }
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
