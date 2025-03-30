import ProtectedRoute from '@/components/auth/ProtectedRoute';
import QuestionAnswer from '@/components/questions/questionAnswer';
import QuestionForm from '@/components/questions/questionForm';
import { getSession } from 'next-auth/react';

export default async function DashboardPage() {
  // The questions will be fetched inside the QuestionForm component
  const questions = [];

  return (
    <ProtectedRoute>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold mb-6 text-black">Your Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-black">Questions</h2>
            <QuestionForm />
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
} 