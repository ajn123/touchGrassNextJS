'use client';

import { useState } from 'react';
import BingoBoard from '@/components/bingo/BingoBoard';
import { BingoCell } from '@/types/bingo';
import { toast } from 'react-hot-toast';

export default function BingoPage() {
  const [bingoBoard, setBingoBoard] = useState<BingoCell[]>(generateInitialBoard());
  
  const handleCellClick = (index: number) => {
    const newBoard = [...bingoBoard];
    newBoard[index] = {
      ...newBoard[index],
      isMarked: !newBoard[index].isMarked
    };
    setBingoBoard(newBoard);
    
    if (newBoard[index].isMarked) {
      toast.success(`Completed: ${newBoard[index].text}!`, {
        duration: 2000,
      });
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold text-center mb-8">Dating Mini-Bingo</h1>
      <p className="text-center mb-8 text-gray-600">Click tasks as you complete them!</p>
      <BingoBoard board={bingoBoard} onCellClick={handleCellClick} />
    </div>
  );
}

function generateInitialBoard(): BingoCell[] {
  const tasks = [
    // First Row
    "Find Someone with the Same Hobby",
    "Learn Their Favorite Food",
    "Discover Their Dream Job",
    
    // Second Row
    "Meet Someone from Another Country",
    "Get a coffee date",
    "Exchange Contact Info",
    
    // Third Row
    "Find a Common Interest",
    "Learn a Fun Fact About Someone",
    "Make Plans to Meet Again"
  ];

  return tasks.map((task, index) => ({
    id: index,
    text: task,
    isMarked: task === "FREE SPACE ❤️",  // Only FREE SPACE starts marked
    column: "123"[Math.floor(index / 3)],
    description: getTaskDescription(task)
  }));
}

function getTaskDescription(task: string): string {
  const descriptions: { [key: string]: string } = {
    "Coffee Date": "The classic casual first meeting over coffee",
    "Made Them Laugh": "Successfully shared a joke or funny moment",
    "Deep Talk": "Had a meaningful heart-to-heart conversation",
    "Shared Photos": "Exchanged pictures of your lives",
    "FREE SPACE ❤️": "Love is in the air!",
    "Movie Night": "Cuddled up for a film together",
    "Good Morning Text": "Started the day thinking of each other",
    "Inside Jokes": "Developed your own special humor",
    "Future Plans": "Made plans for future adventures"
  };
  
  return descriptions[task] || task;
}
