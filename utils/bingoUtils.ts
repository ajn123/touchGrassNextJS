import { BingoCell } from '@/types/bingo';

export function checkForWin(board: BingoCell[]): boolean {
  const winningCombos = [
    // Rows
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    // Columns
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    // Diagonals
    [0, 4, 8],
    [2, 4, 6]
  ];

  return winningCombos.some(combo => 
    combo.every(index => !board[index].isMarked)  // Check for completed (unmarked) squares
  );
} 