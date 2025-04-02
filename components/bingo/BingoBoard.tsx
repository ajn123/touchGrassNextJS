'use client';

import { BingoCell } from '@/types/bingo';
import BingoSquare from './BingoSquare';

interface BingoBoardProps {
  board: BingoCell[];
  onCellClick: (index: number) => void;
  gender: 'guys' | 'girls';
}

export default function BingoBoard({ board, onCellClick, gender }: BingoBoardProps) {
  return (
    <div className="w-full max-w-lg mx-auto">
      {/* Fixed width container for the grid */}
      <div className="aspect-square w-full">
        <div className="grid grid-cols-3 gap-2 h-full">
          {board.map((cell, index) => (
            <BingoSquare
              key={cell.id}
              cell={cell}
              onClick={() => onCellClick(index)}
              gender={gender}
            />
          ))}
        </div>
      </div>
      <div className="mt-8 text-center text-gray-600">
        <p>Click a tile to mark it as completed</p>
        <p className="text-sm mt-2">Completed tasks will show a checkmark</p>
      </div>
    </div>
  );
} 