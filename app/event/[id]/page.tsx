"use client";

import { getEvent } from "@/services/api";
import Link from "next/link";
import SocialMediaIcon from "@/components/buttons/socialMedia/socialMediaIcon";
import DateHeader from "@/components/dates/dateHeader";
import { useState, useEffect } from "react";
import { use } from 'react';

type Props = {
    params: Promise<{
        id: string;
    }>;
    searchParams: { [key: string]: string | string[] | undefined };
}

export default function EventPage({ params, searchParams }: Props) {
    const resolvedParams = use(params);
    const [event, setEvent] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const data = await getEvent(resolvedParams.id);
                setEvent(data);
            } catch (error) {
                console.error('Error fetching event:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchEvent();
    }, [resolvedParams.id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!event) {
        return <div>Event not found</div>;
    }

    return (
    <section className="flex flex-col items-center justify-center min-h-screen p-4 md:p-8">
        <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="relative w-full h-64 md:h-96">
                <img 
                    src={event.image_url} 
                    alt={event.title}
                    className="w-full h-full object-cover"
                />
            </div>
            <div className="p-6 md:p-8">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                    {event.title}
                </h1>
                <h3 className="text-lg md:text-xl text-gray-600 mb-8">
                    {event.venue}
                </h3>
                <div className="top-2 right-2 z-10 flex gap-2">
                    <SocialMediaIcon {...event} />
                </div>
                <DateHeader {...event} />
                <div className="prose max-w-none text-black">
                    {event.description}
                </div>
            </div>
        </div>
    </section>
    );
}
