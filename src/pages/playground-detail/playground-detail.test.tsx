import { render, screen } from '@testing-library/react';
import App from '@/app/App';

afterEach(() => {
  window.location.hash = '';
});

test('데모 id로 들어오면 데모 보기를 보여준다', async () => {
  window.location.hash = '#/playground/simple-motion';
  render(<App />);

  expect(await screen.findByRole('heading', { level: 1, name: '요소 변화 Animation' })).toBeInTheDocument();
});

test('없는 데모 id면 플레이그라운드 목록으로 보낸다', async () => {
  window.location.hash = '#/playground/unknown';
  render(<App />);

  expect(await screen.findByRole('heading', { level: 1, name: '플레이그라운드' })).toBeInTheDocument();
  expect(window.location.hash).toBe('#/playground');
});
