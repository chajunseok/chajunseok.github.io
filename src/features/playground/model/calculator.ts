export type Operator = '+' | '-' | '×' | '÷';
export type Digit = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9';
export type CalculatorKey = Digit | Operator | '.' | '=' | '%' | '±' | 'C';

export interface CalculatorState {
  display: string;
  prevValue: number | null;
  operator: Operator | null;
  waitingForOperand: boolean;
}

export const initialCalculatorState: CalculatorState = {
  display: '0',
  prevValue: null,
  operator: null,
  waitingForOperand: false,
};

function compute(a: number, b: number, operator: Operator) {
  switch (operator) {
    case '+':
      return a + b;
    case '-':
      return a - b;
    case '×':
      return a * b;
    case '÷':
      return a / b; // 0으로 나누면 Infinity/NaN을 그대로 보여준다(레거시 동작).
  }
}

// 대기 중인 연산이 있으면 계산해 누적하고, 다음 연산자를 건다. '='는 next가 null.
function performOperation(state: CalculatorState, next: Operator | null): CalculatorState {
  const value = parseFloat(state.display);
  let { prevValue, display } = state;
  if (prevValue === null) {
    prevValue = value;
  } else if (state.operator) {
    prevValue = compute(prevValue, value, state.operator);
    display = String(prevValue);
  }
  return { display, prevValue, operator: next, waitingForOperand: true };
}

// 연산 중이면 앞 값의 퍼센트로 +/-는 가감, ×/÷는 퍼센트 값만 남긴다. 아니면 100으로 나눈다.
function inputPercent(state: CalculatorState): CalculatorState {
  const value = parseFloat(state.display);
  const { prevValue, operator } = state;
  if (prevValue === null || operator === null) return { ...state, display: String(value / 100) };

  const percent = (prevValue * value) / 100;
  const result = operator === '+' ? prevValue + percent : operator === '-' ? prevValue - percent : percent;
  return { display: String(result), prevValue: null, operator: null, waitingForOperand: true };
}

/** 키 하나를 눌렀을 때의 다음 상태. */
export function pressKey(state: CalculatorState, key: CalculatorKey): CalculatorState {
  const { display, waitingForOperand } = state;
  switch (key) {
    case 'C':
      return initialCalculatorState;
    case '±':
      return { ...state, display: display.startsWith('-') ? display.slice(1) : '-' + display };
    case '%':
      return inputPercent(state);
    case '=':
      return performOperation(state, null);
    case '+':
    case '-':
    case '×':
    case '÷':
      return performOperation(state, key);
    case '.':
      if (waitingForOperand) return { ...state, display: '0.', waitingForOperand: false };
      return display.includes('.') ? state : { ...state, display: display + '.' };
    default:
      if (waitingForOperand) return { ...state, display: key, waitingForOperand: false };
      return { ...state, display: display === '0' ? key : display + key };
  }
}
