//const API_URL =  "http://eventsdc-backend:8000";
const INTERNAL_API_URL = process.env.API_URL;
const API_URL = process.env.API_URL;

import { Event } from '@/types/event';
import { DatingProfile, Match } from '@/types/datingProfile';
import { Signup } from '@/types/signup';
import { Question } from '@/types/question';
import { getSession } from 'next-auth/react';
import { UserAnswer } from '@/types/userAnswer';
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


export const getCategories = async (): Promise<string[]> => {
  try {
    const url = typeof window === 'undefined' ? INTERNAL_API_URL : API_URL;
    console.log('Fetching from:', `${url}/api/events/categories`);
    const response = await fetch(`${url}/api/events/categories`);
    if (!response.ok) {
      throw new Error('Failed to fetch categories');
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
};

export const getCategory = async (category_id: string): Promise<Event[]> => {
  try {
    const url = typeof window === 'undefined' ? INTERNAL_API_URL : API_URL;
    console.log('Fetching from:', `${url}/api/events/category/${category_id}`);
    const response = await fetch(`${url}/api/events/category/${category_id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch category');
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching category:', error);
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

export const createDatingProfile = async (dating_profile: DatingProfile): Promise<DatingProfile> => {
    console.log('Creating dating profile:', process.env.NEXT_PUBLIC_ENVIRONMENT);
    console.log('Creating dating profile:', API_URL);
  const response = await fetch(`${API_URL}/api/dating`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(dating_profile),
  });
  if (!response.ok) {
    throw new Error('Failed to create dating profile');
  }
  return response.json();
};

export const getMatchProfiles = async (): Promise<Match[]> => {
  const response = await fetch(`${API_URL}/api/dating/matches`);
  if (!response.ok) {
    throw new Error('Failed to fetch match profiles');
  }
  return response.json();
};


export const getUnmatchedProfiles = async (): Promise<DatingProfile[]> => {
  const response = await fetch(`${API_URL}/api/dating/unmatched`);
  if (!response.ok) {
    throw new Error('Failed to fetch unmatched profiles');
  }
  return response.json();
};

export const signupForDating = async (signup: Signup): Promise<Signup> => {
  const response = await fetch(`${API_URL}/api/dating/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(signup),
  });
  return response.json();
};

export const getQuestions = async (): Promise<Question[]> => {
  const response = await fetch(`${API_URL}/api/questions`);
  if (!response.ok) {
    throw new Error('Failed to fetch questions');
  }
  return response.json();
};



export const submitAnswers = async (questions: Question[]): Promise<Question[]> => {
  const session = await getSession();
  const url = typeof window === 'undefined' ? INTERNAL_API_URL : API_URL;

  if (!session?.user?.accessToken) {
    throw new Error('No authentication token found');
  }
  else {
    console.log("Session found:", session);
  }

  const response = await fetch(`${process.env.API_URL}/api/questions/submit`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${session?.user?.accessToken}`,
    },
    credentials: 'include',
    body: JSON.stringify(questions),
  });

  if (!response.ok) {
    throw new Error('Failed to submit answers');
  }

  const data = await response.json();
  return data;
};
