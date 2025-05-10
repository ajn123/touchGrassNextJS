'use client';

import { useOptimistic, useTransition } from 'react';
import { addFeedback, Feedback } from '@/server_actions/feedback';
import { toast } from 'react-hot-toast';

export default function FeedbackForm() {
    const [isPending, startTransition] = useTransition();
    const [optimisticFeedbacks, addOptimisticFeedback] = useOptimistic<Feedback[]>([]);

    async function handleSubmit(formData: FormData) {
        const message = formData.get('message') as string;
        
        // Create optimistic feedback
        const optimisticFeedback: Feedback = {
            id: 'temp-' + Date.now(),
            message,
            createdAt: new Date()
        };

        // Add optimistic feedback immediately
        addOptimisticFeedback(prev => [...prev, optimisticFeedback]);

        // Clear the form
        formData.set('message', '');

        startTransition(async () => {
            try {
                addFeedback(formData);
                toast.success('Feedback submitted successfully!', {
                    duration: 3000,
                    position: 'top-right',
                    style: {
                        background: '#10B981',
                        color: '#fff',
                    },
                });
            } catch (error) {
                toast.error('Failed to submit feedback. Please try again.', {
                    duration: 4000,
                    position: 'top-right',
                    style: {
                        background: '#EF4444',
                        color: '#fff',
                    },
                });

                // Remove the optimistic feedback on error
                addOptimisticFeedback(prev => 
                    prev.filter(f => f.id !== optimisticFeedback.id)
                );

                console.error('Error submitting feedback:', error);
            }
        });
    }

    return (
        <div className="space-y-6">
            <form action={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                        Your Feedback
                    </label>
                    <textarea
                        id="message"
                        name="message"
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        rows={4}
                    />
                </div>
                <button
                    type="submit"
                    disabled={isPending}
                    className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                        isPending ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                >
                    {isPending ? 'Submitting...' : 'Submit Feedback'}
                </button>
            </form>

            {/* Display optimistic feedbacks */}
            <div className="mt-8">
                <h3 className="text-lg font-medium mb-4">Recent Feedback</h3>
                <div className="space-y-4">
                    {optimisticFeedbacks.map((feedback) => (
                        <div
                            key={feedback.id}
                            className="p-4 bg-white rounded-lg shadow"
                        >
                            <p className="text-gray-800">{feedback.message}</p>
                            <p className="text-sm text-gray-500 mt-2">
                                {feedback.createdAt?.toLocaleString()}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
} 