import { Component, type ReactNode } from 'react';

type ErrorBoundaryProps = { fallback: ReactNode; children: ReactNode };

/** 하위 트리의 렌더·lazy 청크 로드 실패를 잡아 fallback을 보여준다. 다시 시도하려면 `key`를 바꾼다. */
export class ErrorBoundary extends Component<ErrorBoundaryProps, { hasError: boolean }> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: unknown) {
    console.error(error);
  }

  render() {
    return this.state.hasError ? this.props.fallback : this.props.children;
  }
}
