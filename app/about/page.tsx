'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import type { ReactElement } from 'react';

export default function AboutPage() {
    const [grassBlades, setGrassBlades] = useState<ReactElement[]>([]);

    useEffect(() => {
        // Generate random grass blades for the background
        const blades: ReactElement[] = [];
        const numBlades = 100;
        
        for (let i = 0; i < numBlades; i++) {
            const left = Math.random() * 100;
            const height = 30 + Math.random() * 70;
            const width = 2 + Math.random() * 8;
            const delay = Math.random() * 2;
            const zIndex = Math.floor(Math.random() * 10);
            
            blades.push(
                <div 
                    key={i}
                    className="absolute bottom-0 bg-green-500"
                    style={{
                        left: `${left}%`,
                        height: `${height}px`,
                        width: `${width}px`,
                        zIndex: zIndex,
                        opacity: 0.6 + Math.random() * 0.4,
                        transform: `rotate(${-10 + Math.random() * 20}deg)`,
                        animation: `sway ${2 + Math.random()}s ease-in-out infinite alternate`,
                        animationDelay: `${delay}s`,
                        borderTopLeftRadius: '10px',
                        borderTopRightRadius: '10px',
                        backgroundColor: `rgb(${60 + Math.random() * 40}, ${120 + Math.random() * 50}, ${30 + Math.random() * 40})`,
                    }}
                />
            );
        }
        
        setGrassBlades(blades);
    }, []);

    return (
        <div className="relative min-h-screen overflow-hidden">
            {/* Grass background */}
            <div className="fixed inset-0 bg-green-100 -z-10">
                {grassBlades}
                <style jsx global>{`
                    @keyframes sway {
                        0% { transform: rotate(-5deg); }
                        100% { transform: rotate(5deg); }
                    }
                `}</style>
            </div>


            
            <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8 relative z-10">
                <h1 className="text-3xl font-bold text-center text-gray-900 mb-12">About Touch Grass DC</h1>
                
                <div className="mb-10">
                    <p className="text-lg text-gray-700 mb-6">
                        Touch Grass DC is a platform designed to help people in the DC area discover outdoor activities, 
                        events, and opportunities to connect with others while enjoying what the city has to offer.
                    </p>
                    <p className="text-lg text-gray-700">
                        Our mission is simple: get people outside, exploring their community, and making meaningful connections.
                    </p>
                </div>
                

                <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-6">Our Events</h2>
                    
                    <div className="space-y-4">
                        <h3 className="text-xl font-medium text-indigo-600 mb-2">Do you guys throw your own events?</h3>
                        <p className="text-gray-700">
                            Yes! We are currently working on throwing our own events to bring the DC community together. 
                            Our team is passionate about creating unique outdoor experiences that help people connect 
                            with each other and with the beautiful spaces around our city.
                        </p>
                        <p className="text-gray-700">
                            If you want to sponsor events or collaborate with us, please email 
                            <a href="mailto:hello@touchgrassdc.com" className="text-indigo-600 hover:text-indigo-800 ml-1">
                                hello@touchgrassdc.com
                            </a>
                        </p>
                    </div>
                </div>


                <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-6">Frequently Asked Questions</h2>
                    
                    <div className="space-y-6">
                        <div className="border-b border-gray-200 pb-4">
                            <h3 className="text-xl font-medium text-indigo-600 mb-2">What is Touch Grass DC?</h3>
                            <p className="text-gray-700">
                                Touch Grass DC is a community platform that helps DC residents find local events, outdoor activities, 
                                and social gatherings. We&apos;re all about encouraging people to step away from screens and engage with 
                                the real world around them.
                            </p>
                        </div>
                        
                        <div className="border-b border-gray-200 pb-4">
                            <h3 className="text-xl font-medium text-indigo-600 mb-2">Is Touch Grass DC free to use?</h3>
                            <p className="text-gray-700">
                                Yes! Our platform is completely free for users to browse events and activities in the DC area.
                            </p>
                        </div>
                        
                        <div className="border-b border-gray-200 pb-4">
                            <h3 className="text-xl font-medium text-indigo-600 mb-2">What kinds of events can I find here?</h3>
                            <p className="text-gray-700">
                                We feature a wide variety of events including outdoor adventures, community gatherings, 
                                sports activities, cultural events, workshops, and more. If it gets you outside and connecting 
                                with others, you&apos;ll probably find it here!
                            </p>
                        </div>
                        
                        <div className="border-b border-gray-200 pb-4">
                            <h3 className="text-xl font-medium text-indigo-600 mb-2">How do I submit my own event?</h3>
                            <p className="text-gray-700">
                                We&apos;re currently working on a feature that will allow community members to submit their own events. 
                                Stay tuned for updates on this exciting addition to our platform!
                            </p>
                        </div>
                        
                        <div className="pb-4">
                            <h3 className="text-xl font-medium text-indigo-600 mb-2">What does &quot;Touch Grass&quot; mean?</h3>
                            <p className="text-gray-700">
                                &quot;Touch grass&quot; is a playful phrase that encourages people to disconnect from digital devices and 
                                reconnect with nature and the physical world. Our platform embodies this philosophy by helping 
                                DC residents find meaningful ways to engage with their community in person.
                            </p>
                        </div>
                    </div>
                </div>
                
                <div className="bg-indigo-50 rounded-lg p-6">
                    <h2 className="text-xl font-semibold text-indigo-700 mb-4">Join Our Community</h2>
                    <p className="text-gray-700 mb-4">
                        Ready to discover the best of what DC has to offer? Start exploring events today and connect 
                        with others who are looking to make the most of this amazing city.
                    </p>
                    <div className="flex justify-center">
                        <Link href="/" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            Explore Events
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}