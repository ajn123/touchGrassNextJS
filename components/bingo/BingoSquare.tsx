'use client';

import { BingoCell } from '@/types/bingo';

interface BingoSquareProps {
  cell: BingoCell;
  onClick: () => void;
}

export default function BingoSquare({ cell, onClick }: BingoSquareProps) {
  return (
    <button
      onClick={onClick}
      title={cell.description}
      className={`
        group relative
        aspect-square p-4 rounded
        flex items-center justify-center text-center
        transition-all duration-300 text-base
        ${cell.isMarked 
          ? 'bg-white border-2 border-pink-500 text-gray-400' 
          : 'bg-pink-500 text-white hover:bg-pink-600'
        }
        ${cell.text === 'FREE SPACE ❤️' ? 'font-bold' : ''}
      `}
    >
      {/* Always show the text */}
      <span className="relative z-10">
        {cell.text}
      </span>
      
      {/* Show checkmark overlay when marked */}
      {cell.isMarked && (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-90">
          <span className="text-4xl text-green-500">✓</span>
        </div>
      )}
      
      {/* Tooltip */}
      <div className="
        absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2
        bg-gray-800 text-white text-xs rounded-lg w-48
        opacity-0 group-hover:opacity-100 transition-opacity duration-200
        pointer-events-none z-20
      ">
        {cell.description}
        <div className="
          absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2
          border-4 border-transparent border-t-gray-800
        "/>
      </div>
    </button>
  );
} 