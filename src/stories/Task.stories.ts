import type {Meta, StoryObj} from '@storybook/react';
import { fn } from '@storybook/test';
import { Task } from '../Task';
import { useState } from 'react';

const meta: Meta<typeof Task> = {
    title: 'TODOLISTS/Task',
    component: Task,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    args: {
        changeTaskStatus: fn(),
        changeTaskTitle: fn(),
        removeTask: fn(),
        todolistId: '123123123',
        task: { id: '123', title: 'JS', isDone: true}
    }
};

export default meta;
type Story = StoryObj<typeof Task>;

export const TaskIsDoneTrueStory: Story = {};

export const TaskIsDoneFalseStory: Story = {
    args: {
        task: { id: '123', title: 'JS', isDone: false}
    }
};