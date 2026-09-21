import type { Meta, StoryObj } from '@storybook/react-vite';
import { SectionHeading } from './section-heading';

const meta = {
  title: 'shared/ui/SectionHeading',
  component: SectionHeading,
  args: { eyebrow: '01', title: '기술 스택', description: '주로 쓰는 언어와 도구입니다.' },
} satisfies Meta<typeof SectionHeading>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const PageTitle: Story = { args: { as: 'h1', eyebrow: undefined } };
