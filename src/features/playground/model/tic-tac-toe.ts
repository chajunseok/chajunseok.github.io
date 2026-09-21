export type Player = 'X' | 'O';
export type Cell = Player | null;
export type TicTacToeResult = { winner: Player; line: readonly number[] } | { winner: 'draw' } | null;

const LINES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8], // 가로
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8], // 세로
  [0, 4, 8],
  [2, 4, 6], // 대각선
] as const;

export const createBoard = (): Cell[] => Array<Cell>(9).fill(null);

/** 세 칸이 같은 줄이 있으면 승자와 그 줄을, 칸이 다 차면 무승부를, 아니면 null을 돌려준다. */
export function calculateWinner(board: readonly Cell[]): TicTacToeResult {
  for (const line of LINES) {
    const [a, b, c] = line;
    const mark = board[a];
    if (mark && mark === board[b] && mark === board[c]) return { winner: mark, line };
  }
  return board.every((cell) => cell !== null) ? { winner: 'draw' } : null;
}

/** 빈 칸에 말을 둔 새 보드. 이미 찬 칸이면 null. */
export function placeMark(board: readonly Cell[], index: number, player: Player): Cell[] | null {
  if (board[index]) return null;
  return board.map((cell, i) => (i === index ? player : cell));
}
