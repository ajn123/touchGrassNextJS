//const API_URL =  "http://eventsdc-backend:8000";
const INTERNAL_API_URL = process.env.API_URL;
const API_URL = process.env.API_URL;

import { Event } from '@/types/event';
import {  getDB } from './db';
import { ObjectId } from 'mongodb';

export const getEvent = async (event_id: string): Promise<any | null> => {
  try {
    const db = await getDB();
    if (!db) {
      throw new Error('Failed to connect to database');
    }
    const event = await db.db().collection('events').findOne({_id: new ObjectId(event_id)});
    return event;
  } catch (error) {
    console.error('Error fetching event:', error);
    return null;
  }
};

export const getEvents = async (): Promise<any[]> => {
  const db = await getDB();
  if (!db) {
    throw new Error('Failed to connect to database');
  }
  const events = await db.db().collection('events').find({}).toArray();
  return events;
};

export const getFeaturedEvents = async (): Promise<any[]> => {
  const db = await getDB();
  if (!db) {
    throw new Error('Failed to connect to database');
  }
  const events = await db.db().collection('events').find({schedules: {$exists: false}}).toArray();
  console.log(`Retrieved ${events.length} events from database`);
  return events;
};

export const getCategories = async (): Promise<string[]> => {
  const db = await getDB();
  if (!db) {
    throw new Error('Failed to connect to database');
  }
  const categories = await db.db().collection('events').distinct('category');
  return categories;
};

export const getCategory = async (category_id: string): Promise<Event[]> => {
  const db = await getDB();
  if (!db) {
    throw new Error('Failed to connect to database');
  }
  const events = await db.db().collection('events').find({category: category_id}).toArray();
  return events.map((event: any) => ({
    ...event,
    _id: event._id.toString(),
    schedules: event.schedules || []
  }));
};

export const getRecurringEvents = async (): Promise<any[]> => {
  const db = await getDB();
  if (!db) {
    throw new Error('Failed to connect to database');
  }
  const events = await db.db().collection('events').find({schedules: {$exists: true}}).toArray();
  return events;
};

export const createEvent = async (event: Omit<Event, '_id'>): Promise<any> => {
  const db = await getDB();
  if (!db) {
    throw new Error('Failed to connect to database');
  }
  const newEvent = await db.db().collection('events').insertOne(event);
  return newEvent;
}; 
