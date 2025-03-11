import { Question } from "@/types/question";

export default function QuestionAnswer({ question }: { question: Question }) {
    return (
        
        <div className="mb-4 my-4 border-b border-gray-500">
            <label className="block text-gray-700 text-sm font-bold mb-2">
                {question.title}
                {question.required && <span className="text-red-500">*</span>}
            </label>
            {question.type === 'text' && (
                <input
                    type="text"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    maxLength={question.maxLength}
                    required={question.required}
                />
            )}
            {question.type === 'multiselect' && question.options && (
                <select
                    multiple
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required={question.required}
                >
                    {question.options.map((option, index) => (
                        <option key={index} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            )}
            {question.type === 'textarea' && (
                <textarea
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    maxLength={question.maxLength}
                    required={question.required}
                    rows={4}
                />
            )}
            {question.type === 'select' && question.options && (
                <select 
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required={question.required}
                >
                    <option value="">Select an option</option>
                    {question.options.map((option, index) => (
                        <option key={index} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            )}
            <p className="text-sm text-gray-600 mt-1">{question.question}</p>
        </div>
    )
}