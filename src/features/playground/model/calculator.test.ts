import { initialCalculatorState, pressKey, type CalculatorKey } from './calculator';

const run = (keys: string) => [...keys].reduce((s, k) => pressKey(s, k as CalculatorKey), initialCalculatorState);

test('숫자 입력은 처음 0을 대체하고 이어 붙인다', () => {
  expect(run('0012').display).toBe('12');
});

test('연산자를 이어 누르면 앞 결과를 누적한다', () => {
  expect(run('2+3×').display).toBe('5');
  expect(run('2+3×4=').display).toBe('20');
});

test('등호 뒤 새 연산은 결과값에서 이어진다', () => {
  expect(run('2+3=+1=').display).toBe('6');
});

test('소수점은 한 번만 붙고, 연산 직후에는 0.으로 시작한다', () => {
  expect(run('1..5').display).toBe('1.5');
  expect(run('1+.').display).toBe('0.');
  expect(run('1+.5=').display).toBe('1.5');
});

test('0으로 나누면 Infinity를 보여준다', () => {
  expect(run('5÷0=').display).toBe('Infinity');
});

test('C는 모든 상태를 초기화한다', () => {
  expect(run('5+3C')).toEqual(initialCalculatorState);
});

test('±는 부호를 뒤집는다', () => {
  expect(run('5±').display).toBe('-5');
  expect(run('5±±').display).toBe('5');
});

test('%는 연산이 없으면 100으로 나눈다', () => {
  expect(run('50%').display).toBe('0.5');
});

test('%는 +/-에서 앞 값의 퍼센트를 더하거나 빼고 연산을 끝낸다', () => {
  const plus = run('200+10%');
  expect(plus).toEqual({ display: '220', prevValue: null, operator: null, waitingForOperand: true });
  expect(run('200-10%').display).toBe('180');
});

test('%는 ×/÷에서 앞 값의 퍼센트만 남긴다', () => {
  expect(run('200×10%').display).toBe('20');
  expect(run('200÷10%').display).toBe('20');
});
