'use client';

import { Question } from "@/types/question";
import { useState } from "react";

interface QuestionAnswerProps {
  question: Question;
  onAnswerChange: (value: string) => void;
}

export default function QuestionAnswer({ question, onAnswerChange }: QuestionAnswerProps) {
    const [answer, setAnswer] = useState(question.answer || '');
    
    const handleAnswerChange = (value: string) => {
        setAnswer(value);
        console.log("Answer:", value);
        onAnswerChange(value);
    };

    return (
        <div className="space-y-4">
            <p className="text-black">{question.question}</p>
            <div className="space-y-2">
                {question.type === 'text' && (
                    <input
                        type="text"
                        id={`question-${question._id}`}
                        value={answer || ''}
                        onChange={(e) => handleAnswerChange(e.target.value)}
                        required={question.required}
                        className="text-black w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Your answer..."
                    />
                )}
                {question.type === 'number' && (
                    <input
                        type="number"
                        id={`question-${question._id}`}
                        value={answer}
                        onChange={(e) => handleAnswerChange(e.target.value)}
                        required={question.required}
                        className="text-black w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter a number..."
                    />
                )}
                {question.type === 'textarea' && (
                    <textarea
                        id={`question-${question._id}`}
                        value={answer}
                        onChange={(e) => handleAnswerChange(e.target.value)}
                        required={question.required}
                        className="text-black w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter your detailed response..."
                        rows={4}
                    />
                )}
                {question.type === 'select' && (
                    <select
                        id={`question-${question._id}`}
                        value={answer}
                        onChange={(e) => handleAnswerChange(e.target.value)}
                        required={question.required}
                        className="text-black w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                        <option value="">Select an option...</option>
                        {question.options?.map((option, index) => (
                            <option key={index} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                )}
                {question.type === 'multiselect' && (
                    <div className="max-h-60 overflow-y-auto border border-gray-300 rounded-md p-2">
                        <div className="space-y-2">
                            {question.options?.map((option, index) => (
                                <div key={index} className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id={`question-${question._id}-option-${index}`}
                                        checked={answer?.split(',').includes(option)}
                                        onChange={(e) => {
                                            const currentSelections = answer ? answer.split(',') : [];
                                            let newSelections;
                                            if (e.target.checked) {
                                                newSelections = [...currentSelections, option];
                                            } else {
                                                newSelections = currentSelections.filter(item => item !== option);
                                            }
                                            handleAnswerChange(newSelections.join(','));
                                        }}
                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                    />
                                    <label 
                                        htmlFor={`question-${question._id}-option-${index}`}
                                        className="ml-2 block text-sm text-gray-900"
                                    >
                                        {option}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                
                {question.required && (
                    <p className="text-sm text-red-500">* Required</p>
                )}
            </div>
        </div>
    )
}