import type { Meta, StoryObj } from '@storybook/react-vite';
import { GithubIcon } from './icons';

const meta = {
  title: 'shared/ui/Icons',
  component: GithubIcon,
  args: { className: 'size-8' },
} satisfies Meta<typeof GithubIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Github: Story = {};
