import { MongoClient } from 'mongodb';

if (!process.env.MONGODB_URI) {
    console.error('MONGODB_URI is not defined in environment variables');
    throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

const uri = process.env.MONGODB_URI;
console.log('MongoDB URI format check:', uri.startsWith('mongodb://') || uri.startsWith('mongodb+srv://'));

const options = {
    ssl: true,
    tls: true,
    tlsAllowInvalidCertificates: false,
    retryWrites: true,
    w: 'majority' as const
};

let client: MongoClient | null = null;
let isConnecting = false;

export async function connectToDB() {
    // If we're in a prerender/build context, return null
    if (process.env.NODE_ENV === 'production' && !process.env.MONGODB_URI) {
        console.log('Skipping database connection during build/prerender');
        return null;
    }

    if (client) {
        console.log('Using existing database connection');
        return client;
    }

    if (isConnecting) {
        console.log('Waiting for existing connection attempt to complete');
        // Wait for the existing connection attempt to complete
        await new Promise(resolve => setTimeout(resolve, 100));
        return connectToDB();
    }

    try {
        console.log('Attempting to connect to MongoDB...');
        isConnecting = true;
        client = new MongoClient(uri, options);
        await client.connect();
        console.log('Successfully connected to MongoDB');
        return client;
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        client = null;
        return null;
    } finally {
        isConnecting = false;
    }
}

export async function disconnectFromDB() {
    if (client) {
        console.log('Closing database connection');
        await client.close();
        client = null;
    }
}

export async function getDB() {
    const client = await connectToDB();
    if (!client) {
        console.error('Failed to establish database connection');
    }
    return client;
}
