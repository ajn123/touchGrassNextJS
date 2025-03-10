'use client';
import { useEffect, useState } from 'react';
import { createDatingProfile } from '@/services/api';
import { motion } from 'framer-motion';

const Dating = () => {

    const [formData, setFormData] = useState({
        _id: '',
        name: '',
        age: '',
        gender: '',
        gender_interest: '',
        age_range: [] as string[],
        description: ''
    });

    const loadProfile = () => {
        if (typeof window !== 'undefined') {
            const profileCookie = document.cookie
            .split('; ')
            .find(row => row.startsWith('profileId='));

            if (profileCookie) {
                // Get stored profile data from localStorage
                const storedProfile = localStorage.getItem('datingProfile');
                if (storedProfile) {
                    const profileData = JSON.parse(storedProfile);
                    setFormData({
                        _id: profileData._id,
                        name: profileData.name || '',
                        age: profileData.age?.toString() || '',
                        gender: profileData.gender || '',
                        gender_interest: profileData.gender_interest || '',
                        age_range: profileData.age_range || [],
                        description: profileData.description || ''
                    });
                }
            }
        }
    }

    // Check for existing profile data when component mounts
    useEffect(() => {
        loadProfile();

    }, []);

    const [isFlipped, setIsFlipped] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (!formData.age) {
                alert('Please enter your age');
                return;
            }
            const response = await createDatingProfile({
                '_id': formData._id,
                name: formData.name,
                age: parseInt(formData.age),
                gender: formData.gender,
                gender_interest: formData.gender_interest,
                age_range: formData.age_range,
                description: formData.description
            });
            console.log(`response: ${JSON.stringify(response)}`);
            if (!response) {
                throw new Error('Failed to submit form');
            }
            else {
            // Store profile data in localStorage
            localStorage.setItem('datingProfile', JSON.stringify(response));
            // Set a cookie with basic profile info
            document.cookie = `profileId=${response._id}; path=/; max-age=2592000`; // 30 days expiry
            loadProfile();
            }
            // Flip the card
            setIsFlipped(true);

            // Reset form after delay
            setTimeout(() => {
                setIsFlipped(false);
            }, 4000);

        } catch (error) {
            console.error('Error:', error);
            alert('Failed to submit profile. Please try again.');
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            age_range: checked 
                ? [...prev.age_range, value]
                : prev.age_range.filter(range => range !== value)
        }));
    };

    return (
        <div className="max-w-lg mx-auto mt-8 p-6 bg-gray-100">
            <motion.div 
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.6 }}
                style={{ transformStyle: 'preserve-3d' }}
            >
                {!isFlipped ? (
                    <div className="bg-white rounded-lg shadow-md">
                        <h1 className="text-2xl font-bold mb-6 text-black text-center">Speed Dating</h1>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="bg-white p-4 rounded-lg">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-black">Your Name</label>
                                    <input 
                                        type="text" 
                                        id="name" 
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="mt-1 block w-full rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500  bg-gray-200 text-black" 
                                    />
                                </div>
                                <div>
                                    <label htmlFor="age" className="block text-sm font-medium text-black">Your Age</label>
                                    <input 
                                        type="number" 
                                        id="age" 
                                        name="age" 
                                        min="18" 
                                        max="100"
                                        value={formData.age}
                                        onChange={handleChange}
                                        className="mt-1 block w-full rounded-md border-gray-800 bg-black shadow-sm focus:border-indigo-500 focus:ring-indigo-500 bg-gray-200 text-black" 
                                    />
                                </div>

                                <div className="mt-4 "> 
                                    <label htmlFor="gender" className="block text-sm font-medium text-black">Your Gender</label>
                                    <select 
                                        id="gender" 
                                        name="gender"
                                        value={formData.gender}
                                        onChange={handleChange}
                                        className="mt-1 block w-full rounded-md border-indigo-500 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-black bg-gray-200"
                                    >
                                        <option value="">Select gender</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                        <option value="non-binary">Non-binary</option>
                                    </select>
                                </div>

                                <div className="mt-4">
                                    <label htmlFor="gender_interest" className="block text-sm font-medium text-black">Interested In</label>
                                    <select 
                                        id="gender_interest" 
                                        name="gender_interest"
                                        value={formData.gender_interest}
                                        onChange={handleChange}
                                        className="mt-1 block w-full rounded-md border-gray-300 bg-gray-200 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-black"
                                    >
                                        <option value="">Select gender interest</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                        <option value="non-binary">Non-binary</option>
                                        <option value="everyone">Everyone</option>
                                    </select>
                                </div>
                                <div className="space-y-2 mt-8">
                                    <p className="block text-sm font-medium text-black">Age Range YOU want to meet (can select multiple)</p>
                                    <div className="space-y-1">
                                        <div className="flex items-center">
                                            <input 
                                                type="checkbox" 
                                                id="age21-25" 
                                                name="ageRange" 
                                                value="21-25"
                                                checked={formData.age_range.includes('21-25')}
                                                onChange={handleCheckboxChange}
                                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" 
                                            />
                                            <label htmlFor="age21-25" className="ml-2 text-sm text-black">21-25</label>
                                        </div>
                                        <div className="flex items-center">
                                            <input 
                                                type="checkbox" 
                                                id="age26-30" 
                                                name="ageRange" 
                                                value="26-30"
                                                checked={formData.age_range.includes('26-30')}
                                                onChange={handleCheckboxChange}
                                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" 
                                            />
                                            <label htmlFor="age26-30" className="ml-2 text-sm text-black">26-30</label>
                                        </div>
                                        <div className="flex items-center">
                                            <input 
                                                type="checkbox" 
                                                id="age31-35" 
                                                name="ageRange" 
                                                value="31-35"
                                                checked={formData.age_range.includes('31-35')}
                                                onChange={handleCheckboxChange}
                                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" 
                                            />
                                            <label htmlFor="age31-35" className="ml-2 text-sm text-black">31-35</label>
                                        </div>
                                        <div className="flex items-center">
                                            <input 
                                                type="checkbox" 
                                                id="age36-40" 
                                                name="ageRange" 
                                                value="36-40"
                                                checked={formData.age_range.includes('36-40')}
                                                onChange={handleCheckboxChange}
                                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" 
                                            />
                                            <label htmlFor="age36-40" className="ml-2 text-sm text-black">36-40</label>
                                        </div>
                                        <div className="flex items-center">
                                            <input 
                                                type="checkbox" 
                                                id="age41-45" 
                                                name="ageRange" 
                                                value="41-45"
                                                checked={formData.age_range.includes('41-45')}
                                                onChange={handleCheckboxChange}
                                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" 
                                            />
                                            <label htmlFor="age41-45" className="ml-2 text-sm text-black">41-45</label>
                                        </div>
                                        <div className="flex items-center">
                                            <input 
                                                type="checkbox" 
                                                id="age46plus" 
                                                name="ageRange" 
                                                value="46+"
                                                checked={formData.age_range.includes('46+')}
                                                onChange={handleCheckboxChange}
                                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" 
                                            />
                                            <label htmlFor="age46plus" className="ml-2 text-sm text-black">46+</label>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-8">
                                    <label htmlFor="description" className="block text-sm font-medium text-black">Describe yourself so others can find you</label>
                                    <textarea 
                                        id="description" 
                                        name="description" 
                                        rows={4}
                                        value={formData.description}
                                        onChange={handleChange}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-black" 
                                        placeholder="Describe your outfit..."
                                    ></textarea>
                                </div>
                            </div>

                            <button type="submit" className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                                Submit
                            </button>
                        </form>
                    </div>
                ) : (
                    <div className="bg-indigo-600 rounded-lg shadow-md p-8 text-center" style={{ transform: 'rotateY(180deg)' }}>
                        <h2 className="text-3xl font-bold text-white mb-4">Congratulations!</h2>
                        <p className="text-white text-lg">Your profile has been submitted successfully.  You can resubmit with different information if you want to.</p>
                    </div>
                )}
            </motion.div>
        </div>
    );
}

export default Dating;