import type { Preview } from '@storybook/react-vite';

// 컴포넌트가 useTranslation을 쓰므로 스토리에서도 i18n을 초기화한다.
import '../src/shared/i18n';
import '../src/styles/index.css';

const preview: Preview = {
  parameters: {
    controls: { expanded: true },
  },
};

export default preview;
