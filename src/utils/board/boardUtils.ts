import { BlockStatus } from '../../types/board';

export const initBoard = (width: number, height: number): number[][] => {
  const board: number[][] = [];
  for (let y = -1; y < height + 1; y++) {
    board[y] = [];
    for (let x = -1; x < width + 1; x++) {
      board[y][x] = y === height || x < 0 || x >= 10 ? 1 : 0;
    }
  }
  return board;
};

export const initBlock = (): BlockStatus => {
  return {
    blockIndex: Math.floor(Math.random() * 7 + 1),
    x: 4,
    y: 0,
    rotation: Math.floor(Math.random() * 4),
  };
};
