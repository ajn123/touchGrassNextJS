'use server'

import { getDB } from "@/services/db";

export type Feedback = {
    id?: string;
    message: string;
    createdAt?: Date;
};

export async function addFeedback(formData: FormData): Promise<Feedback> {
    const message = formData.get('message') as string;
    
    if (!message) {
        throw new Error('Message is required');
    }

    const db = await getDB();
    if (!db) {
        throw new Error('Database connection failed');
    }

    const result = await db.db().collection('feedback').insertOne({
        message,
        createdAt: new Date()
    });

    return {
        id: result.insertedId.toString(),
        message,
        createdAt: new Date()
    };
} 