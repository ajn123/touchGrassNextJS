const API_URL =  "https://touchgrassdc-production.up.railway.app";
const INTERNAL_API_URL = API_URL;

import { Event } from '@/types/event';

export const getEvent = async (event_id: string): Promise<Event | null> => {
  try {
    const url = typeof window === 'undefined' ? INTERNAL_API_URL : API_URL;
    const response = await fetch(`${url}/api/events/${event_id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch event');
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching event:', error);
    return null;
  }
};

export const getEvents = async (): Promise<Event[]> => {
  try {
    const url = typeof window === 'undefined' ? INTERNAL_API_URL : API_URL;
    console.log('Fetching from:', `${url}/api/events`);
    
    const response = await fetch(`${url}/api/events`, {
      headers: {
        'Accept': 'application/json',
      },
      cache: 'no-store'
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch events');
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching events:', error);
    return [];
  }
};


export const getFeaturedEvents = async (): Promise<Event[]> => {
  try {
    const url = typeof window === 'undefined' ? INTERNAL_API_URL : API_URL;
    console.log('Fetching from:', `${url}/api/events/featured`);
    const response = await fetch(`${url}/api/events/featured`);
    if (!response.ok) {
      throw new Error('Failed to fetch featured events');
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching featured events:', error);
    return [];
  }
};

export const getRecurringEvents = async (): Promise<Event[]> => {
  try {
    const url = typeof window === 'undefined' ? INTERNAL_API_URL : API_URL;
    console.log('Fetching from:', `${url}/api/events/recurring`);
    const response = await fetch(`${url}/api/events/recurring`);
    if (!response.ok) {
      throw new Error('Failed to fetch recurring events');
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching recurring events:', error);
    return [];
  }
};

export const createEvent = async (event: Omit<Event, '_id'>): Promise<Event> => {
  const response = await fetch(`${API_URL}/api/events`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(event),
  });
  if (!response.ok) {
    throw new Error('Failed to create event');
  }
  return response.json();
}; 