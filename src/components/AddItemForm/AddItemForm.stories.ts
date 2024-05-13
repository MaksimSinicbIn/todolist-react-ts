import type {Meta, StoryObj} from '@storybook/react';
import {AddItemForm} from './AddItemForm';
import { fn } from '@storybook/test';

const meta: Meta<typeof AddItemForm> = {
    title: 'TODOLISTS/AddItemForm',
    component: AddItemForm,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        onClick: { description: 'Button clicked inside form' },
    },
    args: { 
        onClick: fn(),
    },
};

export default meta;
type Story = StoryObj<typeof AddItemForm>;

export const AddItemFormStory: Story = {}

export const AddItemFormDisabledStory: Story = {
    args: { disabled: true }
}