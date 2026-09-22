import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

test('사이드 내비게이션으로 화면을 이동하고 언어를 바꾼다', async () => {
  render(<App />);
  const user = userEvent.setup();

  expect(await screen.findByRole('heading', { level: 1, name: '차준석' })).toBeInTheDocument();

  await user.click(screen.getByRole('link', { name: '프로젝트' }));
  expect(await screen.findByRole('heading', { level: 1, name: '프로젝트' })).toBeInTheDocument();

  // 언어 토글은 모바일 상단 바와 데스크톱 사이드바 두 곳에 있다(CSS로 하나만 보임). jsdom엔 CSS가 없어 첫 번째를 누른다.
  await user.click(screen.getAllByRole('button', { name: 'English' })[0]);
  expect(await screen.findByRole('heading', { level: 1, name: 'Projects' })).toBeInTheDocument();
});
