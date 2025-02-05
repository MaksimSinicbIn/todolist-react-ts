import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { AddItemForm } from './AddItemForm';

const meta: Meta<typeof AddItemForm> = {
    title: 'TODOLISTS/AddItemForm',
    component: AddItemForm,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        addItem: { description: 'Button clicked inside form' },
    },
    args: {
        addItem: fn(),
    }
};

export default meta;
type Story = StoryObj<typeof AddItemForm>;

export const AddItemFormStory: Story = {}

export const AddItemFormDisabledStory: Story = {
    args: { disabled: true }
}