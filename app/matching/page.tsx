'use client';
import { useState, useEffect } from 'react';
import { getMatchProfiles } from '@/services/api';
import { DatingProfile } from '@/types/datingProfile';
import { motion, AnimatePresence } from 'framer-motion';

export interface Match {
    profile1: DatingProfile;
    profile2: DatingProfile;
}

export default function MatchingPage() {
    const [profiles, setProfiles] = useState<Match[]>([]);
    const [startIndex, setStartIndex] = useState<number>(0);

    const fetchProfiles = async () => {
        try {
            const matchProfiles = await getMatchProfiles();
            setProfiles(matchProfiles);

            console.log(matchProfiles);
        } catch (error) {
            console.error('Error fetching profiles:', error);
        }
    };

    console.log(startIndex);
    useEffect(() => {
        fetchProfiles();
    }, []);

    return (
        <div className="max-w-4xl mx-auto mt-8 p-6">
            <div className="flex justify-center gap-4 mb-6">
                <button 
                    onClick={() => setStartIndex(profiles.length)} 
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Show All Matches
                </button>
                <button 
                    onClick={() => setStartIndex((prev) => prev + 1)}
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                >
                    Show One Match
                </button>
                <button 
                    onClick={() => fetchProfiles()}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                    Randomize
                </button>
            </div>
            <div className="text-center mb-4">
                <p className="text-lg text-white">
                    Showing {startIndex} of {profiles.length} matches
                </p>
            </div>
            <h1 className="text-2xl font-bold mb-6 text-white text-center">Available Matches</h1>
            <div className="space-y-4">
                <AnimatePresence>
                    {profiles.slice(0, startIndex).map((match, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                            className="bg-white p-6 rounded-lg shadow-md"
                        >
                            <div className="grid grid-cols-2 gap-4">
                                <div className="border-r pr-4">
                                    <h2 className="text-xl font-semibold text-black">{match.profile1.name}</h2>
                                    <p className="mt-2 text-gray-600">{match.profile1.description}</p>
                                </div>
                                <div className="pl-4">
                                    <h2 className="text-xl font-semibold text-black">{match.profile2.name}</h2>
                                    <p className="mt-2 text-black">{match.profile2.description}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </div>
    );
}