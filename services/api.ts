//const API_URL =  "http://eventsdc-backend:8000";
const INTERNAL_API_URL = process.env.API_URL;
const API_URL = process.env.API_URL;

import { Event } from '@/types/event';
import { connectToDB, getDB } from './db';
import { ObjectId } from 'mongodb';

export async function getCategory(id: string): Promise<Event[]> {
    try {
        const db = await getDB();
        if (!db) {
            throw new Error("Database connection not available");
        }

        const events = await db.db().collection("events")
            .find({ categoryId: id })
            .toArray();

        return events.map(event => ({
            ...event,
            _id: event._id.toString()
        })) as Event[];
    } catch (error) {
        console.error('Error fetching category:', error);
        return [];
    }
}

export async function getEvent(id: string): Promise<Event | null> {
    try {
        const db = await getDB();
        if (!db) {
            throw new Error("Database connection not available");
        }

        const event = await db.db().collection("events").findOne({ 
            _id: new ObjectId(id) 
        });

        if (!event) return null;

        return {
            ...event,
            _id: event._id.toString()
        } as Event;
    } catch (error) {
        console.error('Error fetching event:', error);
        return null;
    }
}

export async function getEvents(): Promise<Event[]> {
    try {
        const db = await getDB();
        if (!db) {
            throw new Error("Database connection not available");
        }

        const events = await db.db().collection("events").find({}).toArray();
        return events.map(event => ({
            ...event,
            _id: event._id.toString()
        })) as Event[];
    } catch (error) {
        console.error('Error fetching events:', error);
        return [];
    }
}

export async function getFeaturedEvents(): Promise<Event[]> {
    try {
        const db = await getDB();
        if (!db) {
            throw new Error("Database connection not available");
        }

        const events = await db.db().collection("events")
            .find({ featured: true })
            .toArray();
        return events.map(event => ({
            ...event,
            _id: event._id.toString()
        })) as Event[];
    } catch (error) {
        console.error('Error fetching featured events:', error);
        return [];
    }
}

export async function getCategories(): Promise<any[]> {
    try {
        const db = await getDB();
        if (!db) {
            throw new Error("Database connection not available");
        }

        const categories = await db.db().collection("categories").find({}).toArray();
        return categories.map(category => ({
            ...category,
            _id: category._id.toString()
        }));
    } catch (error) {
        console.error('Error fetching categories:', error);
        return [];
    }
}

export async function getRecurringEvents(): Promise<Event[]> {
    try {
        const db = await getDB();
        if (!db) {
            throw new Error("Database connection not available");
        }

        const events = await db.db().collection("events")
            .find({ recurring: true })
            .toArray();
        return events.map(event => ({
            ...event,
            _id: event._id.toString()
        })) as Event[];
    } catch (error) {
        console.error('Error fetching recurring events:', error);
        return [];
    }
}

export async function createEvent(event: Omit<Event, '_id'>): Promise<Event | null> {
    try {
        const db = await getDB();
        if (!db) {
            throw new Error("Database connection not available");
        }

        const result = await db.db().collection("events").insertOne(event);
        return {
            ...event,
            _id: result.insertedId.toString()
        } as Event;
    } catch (error) {
        console.error('Error creating event:', error);
        return null;
    }
} 
