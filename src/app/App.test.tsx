import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

test('사이드 내비게이션으로 화면을 이동하고 언어를 바꾼다', async () => {
  render(<App />);
  const user = userEvent.setup();

  expect(await screen.findByRole('heading', { name: '홈' })).toBeInTheDocument();

  await user.click(screen.getByRole('link', { name: '프로젝트' }));
  expect(await screen.findByRole('heading', { name: '프로젝트' })).toBeInTheDocument();

  await user.click(screen.getByRole('button', { name: 'English' }));
  expect(await screen.findByRole('heading', { name: 'Projects' })).toBeInTheDocument();
});
