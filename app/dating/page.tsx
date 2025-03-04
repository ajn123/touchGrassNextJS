'use client';
import { useState } from 'react';
import { createDatingProfile } from '@/services/api';

const Dating = () => {
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        gender: '',
        gender_interest: '',
        age_range: [] as string[],
        description: ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        try {


            if (!formData.age) {
                alert('Please enter your age');
                return;
            }
            const response = await createDatingProfile({
                name: formData.name,
                age: parseInt(formData.age),
                gender: formData.gender,
                gender_interest: formData.gender_interest,
                age_range: formData.age_range,
                description: formData.description
            });
            if (!response) {
                throw new Error('Failed to submit form');
            }

            // Reset form
            setFormData({
                name: '',
                age: '',
                gender: '',
                gender_interest: '',
                age_range: [],
                description: ''
            });
            alert('Profile submitted successfully!');

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
        <div className="max-w-lg mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
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
                            className="mt-1 block w-full rounded-md bg-black text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-black" 
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
                            className="mt-1 block w-full rounded-md border-gray-800 bg-black text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 " 
                        />
                    </div>

                    <div>
                        <label htmlFor="gender" className="block text-sm font-medium text-black">Your Gender</label>
                        <select 
                            id="gender" 
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-800 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-black"
                        >
                            <option value="">Select gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="non-binary">Non-binary</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="gender_interest" className="block text-sm font-medium text-black">Interested In</label>
                        <select 
                            id="gender_interest" 
                            name="gender_interest"
                            value={formData.gender_interest}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-black"
                        >
                            <option value="">Select gender interest</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="non-binary">Non-binary</option>
                            <option value="everyone">Everyone</option>
                        </select>
                    </div>
                    <div className="space-y-2">
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

                    <div>
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
    );
}

export default Dating;