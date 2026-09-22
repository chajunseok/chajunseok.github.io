export const MEMORY_EMOJIS = ['🌟', '🎨', '🎮', '🎵', '🚀', '💡', '🎯', '🎪'] as const;

export interface MemoryCard {
  /** 짝끼리 같은 값 */
  pairId: number;
  emoji: string;
  /** 덱에서의 위치 */
  uniqueId: number;
}

export interface MemoryState {
  cards: MemoryCard[];
  flipped: number[];
  matched: number[];
  moves: number;
}

/** 이모지마다 두 장씩 만들어 섞은 새 게임. random은 테스트에서 주입한다. */
export function createMemoryGame(random: () => number = Math.random): MemoryState {
  const deck = [...MEMORY_EMOJIS, ...MEMORY_EMOJIS].map((emoji) => ({
    pairId: MEMORY_EMOJIS.indexOf(emoji),
    emoji,
  }));
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return { cards: deck.map((card, uniqueId) => ({ ...card, uniqueId })), flipped: [], matched: [], moves: 0 };
}

/**
 * 카드 한 장을 뒤집는다. 두 번째 장이면 움직임을 세고, 짝이면 바로 맞춘 카드로 옮긴다.
 * 짝이 아니면 두 장을 뒤집힌 채 두므로 UI가 잠시 뒤 hideUnmatched를 부른다.
 */
export function flipCard(state: MemoryState, uniqueId: number): MemoryState {
  const { cards, flipped, matched } = state;
  if (flipped.length === 2 || flipped.includes(uniqueId) || matched.includes(uniqueId)) return state;
  if (flipped.length === 0) return { ...state, flipped: [uniqueId] };

  const moves = state.moves + 1;
  const first = flipped[0];
  if (cards[first].pairId === cards[uniqueId].pairId) {
    return { ...state, flipped: [], matched: [...matched, first, uniqueId], moves };
  }
  return { ...state, flipped: [first, uniqueId], moves };
}

export const hideUnmatched = (state: MemoryState): MemoryState => ({ ...state, flipped: [] });

export const isRevealed = (state: MemoryState, uniqueId: number) =>
  state.flipped.includes(uniqueId) || state.matched.includes(uniqueId);

export const isMemoryComplete = (state: MemoryState) =>
  state.cards.length > 0 && state.matched.length === state.cards.length;
