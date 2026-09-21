import { createMemoryGame, flipCard, hideUnmatched, isMemoryComplete, MEMORY_EMOJIS } from './memory-game';

const PAIRS = MEMORY_EMOJIS.length;
// random이 1에 가까우면 매번 자기 자리와 바꾸므로 순서가 그대로다: 짝 i는 i와 i + PAIRS.
const unshuffled = () => createMemoryGame(() => 0.999999);

test('이모지마다 두 장씩, uniqueId가 위치인 덱을 만든다', () => {
  const { cards } = unshuffled();
  expect(cards).toHaveLength(PAIRS * 2);
  expect(cards.map((c) => c.uniqueId)).toEqual([...cards.keys()]);
  for (const emoji of MEMORY_EMOJIS) expect(cards.filter((c) => c.emoji === emoji)).toHaveLength(2);
});

test('주입한 random으로 섞는다', () => {
  const pairIds = (random: () => number) => createMemoryGame(random).cards.map((c) => c.pairId);
  expect(pairIds(() => 0)).not.toEqual(pairIds(() => 0.999999));
});

test('짝이 맞으면 두 장을 맞춘 카드로 옮기고 움직임을 센다', () => {
  const state = flipCard(flipCard(unshuffled(), 0), PAIRS);
  expect(state).toMatchObject({ flipped: [], matched: [0, PAIRS], moves: 1 });
});

test('짝이 틀리면 두 장이 뒤집힌 채 남고, 그동안 다른 카드는 못 뒤집는다', () => {
  const state = flipCard(flipCard(unshuffled(), 0), 1);
  expect(state).toMatchObject({ flipped: [0, 1], matched: [], moves: 1 });
  expect(flipCard(state, 2)).toBe(state);
  expect(hideUnmatched(state).flipped).toEqual([]);
});

test('이미 뒤집힌 카드나 맞춘 카드는 다시 뒤집지 않는다', () => {
  const one = flipCard(unshuffled(), 0);
  expect(flipCard(one, 0)).toBe(one);
  const matched = flipCard(one, PAIRS);
  expect(flipCard(matched, 0)).toBe(matched);
});

test('모든 짝을 맞추면 게임이 끝난다', () => {
  let state = unshuffled();
  for (let i = 0; i < PAIRS; i++) {
    expect(isMemoryComplete(state)).toBe(false);
    state = flipCard(flipCard(state, i), i + PAIRS);
  }
  expect(isMemoryComplete(state)).toBe(true);
  expect(state.moves).toBe(PAIRS);
});
