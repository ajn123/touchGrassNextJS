'use client';

import { useState } from 'react';

interface FAQ {
  question: string;
  answer: string;
}

export default function DatingFAQPage() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const faqs: FAQ[] = [
    {
      question: "What is the DMV Dating Service?",
      answer: "We're a free matchmaking service dedicated to helping singles in the DC, Maryland, and Virginia area find meaningful connections. Our service focuses on creating genuine matches based on compatibility, interests, and lifestyle."
    },
    {
      question: "How does the matching process work?",
      answer: "Our process involves completing a detailed questionnaire about your interests, values, and what you're looking for in a partner. We use this information to suggest compatible matches in the DMV area. Each match is carefully reviewed to ensure compatibility."
    },
    {
      question: "Is this service really free?",
      answer: "Yes! Our basic matchmaking service is completely free for DMV residents. We believe everyone deserves a chance to find meaningful connections without financial barriers."
    },
    {
      question: "Who can join?",
      answer: "Anyone 18 or older living in the DC, Maryland, or Virginia area can join. We welcome people of all backgrounds who are seriously looking for meaningful relationships."
    },
    {
      question: "How do I get started?",
      answer: "Simply create an account, complete our compatibility questionnaire, and upload a recent photo. Once your profile is verified, you'll start receiving carefully selected matches from the DMV area."
    },
    {
      question: "How are matches made?",
      answer: "We consider multiple factors including location within the DMV, shared interests, relationship goals, lifestyle compatibility, and personal preferences. Each match is reviewed before being suggested."
    },
    {
      question: "What areas do you cover?",
      answer: "We cover the entire DMV area including Washington DC, Northern Virginia (Alexandria, Arlington, Fairfax, etc.), and Maryland suburbs (Bethesda, Silver Spring, Rockville, etc.)."
    },
    {
      question: "How is my privacy protected?",
      answer: "Your privacy is our priority. Your personal information is never shared without your consent, and you control what information is visible to potential matches."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-4">DMV Dating Service</h1>
      <p className="text-center text-gray-600 mb-12">
        Connecting hearts in the DC, Maryland, and Virginia area
      </p>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
          >
            <button
              onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
              className={`w-full px-6 py-4 text-left flex justify-between items-center
                ${expandedIndex === index 
                  ? 'bg-rose-50 text-rose-700' 
                  : 'bg-white text-gray-800 hover:bg-gray-50'
                }
                transition-colors duration-200`}
            >
              <span className="font-medium">{faq.question}</span>
              <span className={`text-2xl ${
                expandedIndex === index ? 'text-rose-500' : 'text-gray-400'
              }`}>
                {expandedIndex === index ? '−' : '+'}
              </span>
            </button>
            {expandedIndex === index && (
              <div className="px-6 py-4 bg-white border-t">
                <p className="text-gray-700 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <h2 className="text-2xl font-semibold mb-4">Ready to find your match?</h2>
        <button
          onClick={() => window.location.href = '/signup'}
          className="bg-rose-500 text-white px-8 py-3 rounded-full 
            hover:bg-rose-600 transition-colors
            shadow-md hover:shadow-lg"
        >
          Get Started
        </button>
      </div>
    </div>
  );
}