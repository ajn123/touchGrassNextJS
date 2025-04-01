'use client';

import { BingoCell } from '@/types/bingo';
import BingoSquare from './BingoSquare';

interface BingoBoardProps {
  board: BingoCell[];
  onCellClick: (index: number) => void;
}

export default function BingoBoard({ board, onCellClick }: BingoBoardProps) {
  return (
    <div className="max-w-lg mx-auto">
      <div className="grid grid-cols-3 gap-3">
        {board.map((cell, index) => (
          <BingoSquare
            key={cell.id}
            cell={cell}
            onClick={() => onCellClick(index)}
          />
        ))}
      </div>
      <div className="mt-8 text-center text-gray-600">
        <p>Click a tile to mark it as completed</p>
        <p className="text-sm mt-2">Completed tasks will show a checkmark</p>
      </div>
    </div>
  );
} 