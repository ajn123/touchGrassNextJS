'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { motion, AnimatePresence } from 'framer-motion';
import QuestionAnswer from './questionAnswer';
import { submitAnswers } from '@/services/api';
import { Question } from '@/types/question';
import { toast } from 'react-hot-toast';

export default function QuestionForm() {
  const { data: session } = useSession();
  const [currentQuestions, setCurrentQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [questions, setQuestions] = useState<Question[]>([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        // for client side you need NEXT_PUBLIC_API_URL 
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/questions/user`, {
          credentials: 'include',
          headers: {
            'Authorization': `Bearer ${session?.user?.accessToken}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch questions');
        }

        const data = await response.json();
        console.log("Fetched questions:", data);
        setQuestions(data);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };

    if (session?.user?.accessToken) {
      fetchQuestions();
    }
  }, [session]);

  useEffect(() => {
    if (questions.length > 0) {
      setCurrentQuestions(questions);
    
    }
  }, [questions]);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const result = await submitAnswers(questions);
      console.log("Result:", result);
      toast.success('Your answers have been submitted successfully!');
      
    } catch (error) {
      toast.error('Failed to submit answers. Please try again.');
      console.error('Error submitting answers:', error);
    }
  };

  const handleNext = () => {
    const currentQuestion = questions[currentQuestionIndex];
    if (currentQuestion.required && !currentQuestion.answer) {
      toast.error('Please answer this question before continuing');
      return;
    }
    
    if (currentQuestionIndex < questions.length - 1) {
      setDirection(1);
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    setDirection(-1);
    setCurrentQuestionIndex(prev => Math.max(prev - 1, 0));
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  if (currentQuestions.length === 0) {
    return <div>Loading questions...</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="relative h-[300px] overflow-hidden">
        <AnimatePresence initial={false} mode="wait" custom={direction}>
          <motion.div
            key={questions[currentQuestionIndex]._id || questions[currentQuestionIndex].title}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}
            className="absolute w-full"
          >
            <QuestionAnswer 
              question={questions[currentQuestionIndex]}
              onAnswerChange={(value) => {
                setQuestions(prevQuestions => {
                  prevQuestions[currentQuestionIndex].answer = value;
                  return prevQuestions;
                });
              }}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex justify-between items-center mt-6">
        <button
          type="button"
          onClick={handlePrevious}
          disabled={currentQuestionIndex === 0}
          className={`px-4 py-2 rounded-md transition-all duration-200 ${
            currentQuestionIndex === 0
              ? 'bg-gray-300 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
        >
          Previous
        </button>

        <div className="text-sm text-gray-500">
          Question {currentQuestionIndex + 1} of {questions.length}
        </div>

        {currentQuestionIndex === questions.length - 1 ? (
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
          >
            Submit
          </button>
        ) : (
          <button
            type="button"
            onClick={handleNext}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Next
          </button>
        )}
      </div>
      <div className="mt-8 border-t pt-4">
        <h3 className="text-lg font-medium mb-3">Jump to Question</h3>
        <div className="flex flex-wrap gap-2">
          {questions.map((question, index) => (
            <button
              key={question._id || question.title}
              type="button"
              onClick={() => setCurrentQuestionIndex(index)}
              className={`px-3 py-1 text-sm rounded-full transition-colors ${
                currentQuestionIndex === index
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </form>
  );
}
