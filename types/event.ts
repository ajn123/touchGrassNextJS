export interface Socials {
    facebook: string;
    instagram: string;
    website: string;
}

export interface Cost {
    type: string;
    currency: string;
    amount: number;
}

export interface Schedule {
    days: string[];
    recurrence_type: string;
    time: string;
}

export interface Event {
    _id: string;
    title: string;
    date: string;
    venue: string;
    description: string;
    category: string;
    image_url: string;
    socials: Socials;
    schedules: Schedule[];
    cost: Cost;
} 



