import { render, screen } from '@testing-library/react';
import App from '@/app/App';

afterEach(() => {
  window.location.hash = '';
});

test('프로젝트 id로 들어오면 상세를 보여준다', async () => {
  window.location.hash = '#/projects/potless';
  render(<App />);

  expect(await screen.findByRole('heading', { level: 1, name: 'POTLESS' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: '트러블슈팅' })).toBeInTheDocument();
});

test('없는 프로젝트 id면 프로젝트 목록으로 보낸다', async () => {
  window.location.hash = '#/projects/unknown';
  render(<App />);

  expect(await screen.findByRole('heading', { level: 1, name: '프로젝트' })).toBeInTheDocument();
  expect(window.location.hash).toBe('#/projects');
});
