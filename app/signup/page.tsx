'use client'
import { useState } from "react";   
import { Signup } from "@/types/signup";
import { signupForDating } from "@/services/api";
import { motion, AnimatePresence } from "framer-motion";

export default function SignupForm() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const signup: Signup = { name, email };
        signupForDating(signup).then(() => {
            setName("");
            setEmail("");
            setIsSubmitted(true);
            setTimeout(() => {
                setIsSubmitted(false);
            }, 3000);
        });
    };

    return (
        <div>
            <AnimatePresence>
                {!isSubmitted ? (
                    <motion.form
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0, y: -50 }}
                        onSubmit={handleSubmit}
                        className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md"
                    >
                        <h2 className="text-2xl font-bold mb-6 text-black text-center">Sign Up for Match Making</h2>
                        <p className="text-gray-600 text-center font-bold">
                            We will email you when our match making service is ready!
                        </p>
                        <ul className="list-disc list-inside text-gray-600 text-left">
                            <li> We want to provide free match making for the DMV area</li>
                            <li> There will be no swiping only dating prospects and if you both are interested you can message them or we can arrange a date.</li>
                            <li> We will match you with people based on your interests and preferences</li>
                            <li> We will not share your information with anyone</li>
                            <li> We will always be free and never ask for your credit card information</li>
                        </ul>
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full text-black px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full text-black px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors duration-300"
                        >
                            Sign Up
                        </button>
                        <p className="mt-4 text-sm text-gray-600 text-center">
                            We will email you when our match making service is ready!
                        </p>
                    </motion.form>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -50 }}
                        className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md"
                    >
                        <h2 className="text-2xl font-bold text-black text-center">Congratulations!</h2>
                        <p className="mt-4 text-gray-600 text-center">
                            Thank you for signing up. We will be in touch soon!
                            Follow us on <a href="https://www.instagram.com/touchgrassdc/" className="text-blue-500">Instagram</a> for updates.
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}