'use client';

import { useState } from 'react';
import BingoBoard from '@/components/bingo/BingoBoard';
import { BingoCell } from '@/types/bingo';
import { toast } from 'react-hot-toast';

type Gender = 'guys' | 'girls';

export default function BingoPage() {
  const [activeTab, setActiveTab] = useState<Gender>('guys');
  const [guysBingoBoard, setGuysBingoBoard] = useState<BingoCell[]>(generateInitialBoard('guys'));
  const [girlsBingoBoard, setGirlsBingoBoard] = useState<BingoCell[]>(generateInitialBoard('girls'));
  
  const handleCellClick = (index: number) => {
    const setBoard = activeTab === 'guys' ? setGuysBingoBoard : setGirlsBingoBoard;
    const currentBoard = activeTab === 'guys' ? guysBingoBoard : girlsBingoBoard;

    const newBoard = [...currentBoard];
    newBoard[index] = {
      ...newBoard[index],
      isMarked: !newBoard[index].isMarked
    };
    setBoard(newBoard);
    
    if (newBoard[index].isMarked) {
      toast.success(`Completed: ${newBoard[index].text}!`, {
        duration: 2000,
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Dating Mini-Bingo</h1>
      
      {/* Tabs */}
      <div className="flex justify-center mb-8">
        <div className="bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setActiveTab('guys')}
            className={`px-4 sm:px-6 py-2 rounded-md transition-all duration-200 text-sm sm:text-base ${
              activeTab === 'guys' 
                ? 'bg-blue-500 text-white shadow-lg' 
                : 'text-blue-500 hover:bg-blue-50'
            }`}
          >
            For Guys
          </button>
          <button
            onClick={() => setActiveTab('girls')}
            className={`px-4 sm:px-6 py-2 rounded-md ml-2 transition-all duration-200 text-sm sm:text-base ${
              activeTab === 'girls' 
                ? 'bg-rose-400 text-white shadow-lg' 
                : 'text-rose-400 hover:bg-rose-50'
            }`}
          >
            For Girls
          </button>
        </div>
      </div>

      <p className="text-center mb-8 text-gray-600">Click tasks as you complete them!</p>
      
      {/* Boards Container */}
      <div className="w-full max-w-md mx-auto">
        {activeTab === 'guys' ? (
          <BingoBoard board={guysBingoBoard} onCellClick={handleCellClick} gender="guys" />
        ) : (
          <BingoBoard board={girlsBingoBoard} onCellClick={handleCellClick} gender="girls" />
        )}
      </div>
    </div>
  );
}

function generateInitialBoard(gender: Gender): BingoCell[] {
  const tasks = gender === 'guys' ? getGuysTask() : getGirlsTasks();

  return tasks.map((task, index) => ({
    id: index,
    text: task,
    isMarked: false,
    column: "123"[Math.floor(index / 3)],
    description: getTaskDescription(task, gender)
  }));
}

function getGuysTask(): string[] {
  return [
    "Find out someone's passions in life",
    "Ask someone about their favorite memory",
    "Give three compliments to someone",
    "Find Someone with the Same Hobby",
    "Get a date with someone you don't know",
    "Shoot your shot at someone way out of your league",
    "Get a selfie with someone you don't know",
    "Offer a Drink To Someone you like",
    "Ask: If you had three wishes, what would you wish for?"
  ];
}

function getGirlsTasks(): string[] {
  return [
    "Have a conversation with someone where you don't talk about your job",
    "Talk about your deepest fear",
    "Give someone a compliment",
    "Introduce someone at the event to someone else at the event",
    "Say Yes to a Date ❤️",
    "Give someone your number",
    "Learn a Fun Fact About Someone",
    "Share Your Life Goals",
    "Find Someone with the Same Hobby"
  ];
}

function getTaskDescription(task: string, gender: Gender): string {
  const descriptions: { [key: string]: { [key in Gender]: string } } = {
    "Start a Conversation": {
      guys: "Break the ice and initiate a friendly chat",
      girls: ""
    },
    "Get Her Name": {
      guys: "Introduce yourself and learn her name",
      girls: ""
    },
    "Make Her Smile": {
      guys: "Share something funny or charming",
      girls: ""
    },
    "Find Common Interest": {
      guys: "Discover something you both enjoy",
      girls: ""
    },
    "Ask a Girl Out ❤️": {
      guys: "Take the initiative and ask for a proper date",
      girls: ""
    },
    "Exchange Numbers": {
      guys: "Get her contact info to stay in touch",
      girls: ""
    },
    "Dance Together": {
      guys: "Ask her to dance and have fun",
      girls: ""
    },
    "Offer a Drink": {
      guys: "Politely offer to get her a drink",
      girls: ""
    },
    "Make Plans": {
      guys: "Set up a specific time to meet again",
      girls: ""
    },
    "Share a Story": {
      guys: "",
      girls: "Share something meaningful about yourself"
    },
    "Ask Questions": {
      guys: "",
      girls: "Show curiosity about their interests and life"
    },
    "Show Interest": {
      guys: "",
      girls: "Demonstrate genuine interest in their passions"
    },
    "Be Authentic": {
      guys: "",
      girls: "Stay true to yourself and your values"
    },
    "Express Yourself": {
      guys: "",
      girls: "Share your thoughts and feelings openly"
    },
    "Be Present": {
      guys: "",
      girls: "Stay engaged in the moment without distractions"
    },
    "Say Yes to a Date ❤️": {
      guys: "",
      girls: "Accept an invitation from someone who interests you"
    }
  };
  
  return descriptions[task]?.[gender] || task;
}
