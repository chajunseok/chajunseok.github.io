import { calculateWinner, createBoard, placeMark, type Cell } from './tic-tac-toe';

const board = (cells: string) => [...cells].map((c) => (c === '.' ? null : c)) as Cell[];

test('빈 보드는 결과가 없다', () => {
  expect(calculateWinner(createBoard())).toBeNull();
});

test.each([
  ['가로', 'XXX' + 'OO.' + '...', [0, 1, 2], 'X'],
  ['세로', 'O.X' + 'O.X' + 'O..', [0, 3, 6], 'O'],
  ['대각선', 'X.O' + '.XO' + '..X', [0, 4, 8], 'X'],
  ['역대각선', 'X.O' + 'XO.' + 'O..', [2, 4, 6], 'O'],
])('%s 줄이 같으면 승자와 그 줄을 돌려준다', (_, cells, line, winner) => {
  expect(calculateWinner(board(cells))).toEqual({ winner, line });
});

test('칸이 모두 찼는데 승자가 없으면 무승부다', () => {
  expect(calculateWinner(board('XOX' + 'XOO' + 'OXX'))).toEqual({ winner: 'draw' });
});

test('마지막 수로 칸이 다 차도 줄이 완성되면 승리다', () => {
  expect(calculateWinner(board('XOX' + 'OXO' + 'OXX'))).toEqual({ winner: 'X', line: [0, 4, 8] });
});

test('빈 칸에만 말을 둘 수 있다', () => {
  const next = placeMark(createBoard(), 4, 'X');
  expect(next?.[4]).toBe('X');
  expect(placeMark(next!, 4, 'O')).toBeNull();
});
