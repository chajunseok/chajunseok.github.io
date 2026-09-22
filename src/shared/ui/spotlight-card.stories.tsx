import type { Meta, StoryObj } from '@storybook/react-vite';
import { SpotlightCard } from './spotlight-card';

const meta = {
  title: 'shared/ui/SpotlightCard',
  component: SpotlightCard,
  args: {
    className: 'w-80 p-6',
    children: (
      <>
        <h3 className="text-lg font-semibold">BeeVarium</h3>
        <p className="text-muted-foreground mt-2 text-sm">마우스를 올려 보세요.</p>
      </>
    ),
  },
} satisfies Meta<typeof SpotlightCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
