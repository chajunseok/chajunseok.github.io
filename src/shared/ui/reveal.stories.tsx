import type { Meta, StoryObj } from '@storybook/react-vite';
import { Reveal } from './reveal';

const meta = {
  title: 'shared/ui/Reveal',
  component: Reveal,
  args: { children: <p className="text-2xl font-bold">스크롤 진입 시 떠오릅니다</p> },
} satisfies Meta<typeof Reveal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Delayed: Story = { args: { delay: 0.4 } };
