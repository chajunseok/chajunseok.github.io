import type { Meta, StoryObj } from '@storybook/react-vite';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './tabs';

const meta = {
  title: 'shared/ui/Tabs',
  component: Tabs,
  args: { defaultValue: 'language' },
  render: (args) => (
    <Tabs {...args}>
      <TabsList>
        <TabsTrigger value="language">언어</TabsTrigger>
        <TabsTrigger value="framework">프레임워크</TabsTrigger>
      </TabsList>
      <TabsContent value="language">Python · JavaScript</TabsContent>
      <TabsContent value="framework">React · Vue</TabsContent>
    </Tabs>
  ),
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
