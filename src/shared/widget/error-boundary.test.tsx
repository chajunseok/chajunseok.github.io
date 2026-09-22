import { render, screen } from '@testing-library/react';
import { ErrorBoundary } from './error-boundary';

function Broken(): never {
  throw new Error('boom');
}

test('하위 컴포넌트가 실패하면 fallback을 보여준다', () => {
  vi.spyOn(console, 'error').mockImplementation(() => {});

  render(
    <ErrorBoundary fallback={<p>불러오지 못했습니다</p>}>
      <Broken />
    </ErrorBoundary>,
  );

  expect(screen.getByText('불러오지 못했습니다')).toBeInTheDocument();
});
