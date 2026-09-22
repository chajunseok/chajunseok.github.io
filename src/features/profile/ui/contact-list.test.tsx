import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ContactList } from './contact-list';

test('이메일 복사 버튼을 누르면 클립보드에 복사하고 결과를 알린다', async () => {
  const user = userEvent.setup();
  render(<ContactList />);

  await user.click(screen.getByRole('button', { name: '이메일 복사' }));

  expect(await screen.findByText('이메일을 복사했습니다.')).toBeInTheDocument();
  expect(await navigator.clipboard.readText()).toBe('wnstjr401@gmail.com');
});
