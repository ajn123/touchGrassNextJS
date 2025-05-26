'use client'
import { saveFeedback } from "@/server_actions/contactForm";
import { FormState } from "@/types/formState";
import { useActionState,  startTransition, useOptimistic } from "react";
import { Toaster, toast } from "react-hot-toast";

export const dynamic = 'force-dynamic'

const initialState: FormState = {
    message: "",
    errors: {
        name: null,
        email: null,
        message: null
    }
};

export default function ContactPage() {
    const [state, formAction] = useActionState(saveFeedback, initialState);

    const [optimisticState, updateOptimisticState] = useOptimistic(initialState, () => {
        return {
            message: "Sending...",
            errors: {
                name: null,
                email: null,
                message: null
            }
        };  
    });

    const handleSubmit = (formData: FormData) => {
        updateOptimisticState(() => {
            return {
                message: "Sending...",
                errors: {
                    name: null,
                    email: null,
                    message: null
                }
            };
        });

        startTransition(async () => {
            await formAction(formData);
            toast.success('Feedback submitted successfully!', {
                duration: 3000,
                position: 'top-right',
                style: {
                    background: '#10B981',
                    color: '#fff',
                },
            });
        });
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
            <Toaster position="top-center" reverseOrder={false} />
            <h1 className="text-4xl font-bold mb-8">Contact</h1>
            {optimisticState.message.includes("success") && (
                <div className={`w-full max-w-md mb-4 p-4 rounded-md ${
                    optimisticState.message.includes("success") ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                }`}>
                    {optimisticState.message}
                </div>
            )}
            {
                optimisticState.message.includes("Sending") && (
                    <div className={`w-full max-w-md mb-4 p-4 rounded-md bg-yellow-200 text-black`}>
                        {optimisticState.message}
                    </div>
                )
            }
            {
                optimisticState.message.includes("error") && (
                    <div className={`w-full max-w-md mb-4 p-4 rounded-md bg-red-100 text-red-700`}>
                        {optimisticState.message}
                    </div>
                )
            }

            <form action={handleSubmit} className="w-full max-w-md space-y-4">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1 text-white">
                        Name
                    </label>
                    <input 
                        type="text" 
                        id="name"
                        name="name"
                        placeholder="Your name" 
                        className={`w-full px-3 py-2 border rounded-md text-black ${
                            state.errors.name ? "border-red-500" : "border-gray-300"
                        }`}
                        required
                    />
                    {state.errors.name && (
                        <p className="mt-1 text-sm text-red-500">{state.errors.name}</p>
                    )}
                </div>

                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1 text-white">
                        Email
                    </label>
                    <input 
                        type="email" 
                        id="email"
                        name="email"
                        placeholder="Your email" 
                        className={`w-full px-3 py-2 border rounded-md text-black ${
                            state.errors.email ? "border-red-500" : "border-gray-300"
                        }`}
                        required
                    />
                    {state.errors.email && (
                        <p className="mt-1 text-sm text-red-500">{state.errors.email}</p>
                    )}
                </div>

                <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1 text-white">
                        Message
                    </label>
                    <textarea 
                        id="message"
                        name="message"
                        placeholder="Your message" 
                        className={`w-full px-3 py-2 border rounded-md text-black ${
                            state.errors.message ? "border-red-500" : "border-gray-300"
                        }`}
                        rows={4}
                        required
                    />
                    {state.errors.message && (
                        <p className="mt-1 text-sm text-red-500">{state.errors.message}</p>
                    )}
                </div>

                <button 
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                >
                    Send Message
                </button>
            </form>
        </div>
    );
}