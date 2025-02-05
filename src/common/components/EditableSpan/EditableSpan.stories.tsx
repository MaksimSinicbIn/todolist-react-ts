import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { EditableSpan } from './EditableSpan';

const meta: Meta<typeof EditableSpan> = {
    title: 'TODOLISTS/EditableSpan',
    component: EditableSpan,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        onChange: { description: 'Button clicked inside form' },
    },
    args: {
        onChange: fn(),
        oldTitle: 'Test Text'
    },

};

export default meta;
type Story = StoryObj<typeof EditableSpan>;

export const EditableSpanStory: Story = {}