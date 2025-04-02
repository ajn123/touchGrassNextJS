'use client';

import { BingoCell } from '@/types/bingo';

interface BingoSquareProps {
  cell: BingoCell;
  onClick: () => void;
  gender: 'guys' | 'girls';
}

export default function BingoSquare({ cell, onClick, gender }: BingoSquareProps) {
  // Define color schemes for each gender
  const colorScheme = {
    guys: {
      unmarked: 'bg-blue-500 text-white hover:bg-blue-600',
      marked: 'bg-white border-2 border-blue-500',
      checkmark: 'text-blue-500',
      hover: 'hover:bg-blue-50'
    },
    girls: {
      unmarked: 'bg-rose-400 text-white hover:bg-rose-500',
      marked: 'bg-white border-2 border-rose-400',
      checkmark: 'text-rose-400',
      hover: 'hover:bg-rose-50'
    }
  };

  const colors = colorScheme[gender];

  return (
    <button
      onClick={onClick}
      title={cell.description}
      className={`
        group relative
        w-full aspect-square
        flex items-center justify-center
        transition-all duration-300
        ${cell.isMarked 
          ? `${colors.marked} text-gray-600 ${colors.hover}` 
          : colors.unmarked
        }
        rounded-lg
        overflow-hidden
      `}
    >
      {/* Text container with responsive font size */}
      <div className="absolute inset-2 flex items-center justify-center">
        <span className="text-center text-[min(2.5vw,1rem)] md:text-base leading-tight">
          {cell.text}
        </span>
      </div>
      
      {/* Checkmark overlay */}
      {cell.isMarked && (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-90">
          <span className={`text-[min(8vw,2rem)] md:text-4xl ${colors.checkmark}`}>
            ✓
          </span>
        </div>
      )}
      
      {/* Tooltip */}
      <div className={`
        absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2
        ${gender === 'guys' ? 'bg-blue-700' : 'bg-rose-700'} 
        text-white text-xs rounded-lg w-48 max-w-[90vw]
        opacity-0 group-hover:opacity-100 transition-opacity duration-200
        pointer-events-none z-20
      `}>
        {cell.description}
        <div className={`
          absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2
          border-4 border-transparent 
          ${gender === 'guys' ? 'border-t-blue-700' : 'border-t-rose-700'}
        `}/>
      </div>
    </button>
  );
} 