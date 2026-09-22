import { copyText } from './copy-text';

function stubClipboard(writeText: (text: string) => Promise<void>) {
  Object.defineProperty(navigator, 'clipboard', { value: { writeText }, configurable: true });
}

test('복사에 성공하면 true를 돌려준다', async () => {
  const writeText = vi.fn().mockResolvedValue(undefined);
  stubClipboard(writeText);

  expect(await copyText('hello')).toBe(true);
  expect(writeText).toHaveBeenCalledWith('hello');
});

test('권한이 거부되면 예외 대신 false를 돌려준다', async () => {
  stubClipboard(vi.fn().mockRejectedValue(new Error('NotAllowedError')));

  expect(await copyText('hello')).toBe(false);
});
