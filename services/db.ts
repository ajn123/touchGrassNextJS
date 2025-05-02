


import { MongoClient } from 'mongodb';

let client: MongoClient;

export const connectToDB = async () => {
  client = new MongoClient(process.env.MONGODB_URI as string);
  await client.connect();
  return client;
};

export const disconnectFromDB = async () => {
  await client.close();
};

export const getDB = async () => {
  return client;
};
