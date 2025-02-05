import type { Meta, StoryObj } from '@storybook/react';
import { Task } from './Task';
import { TaskPriorities, TaskStatuses } from 'common/enums';
import { ReduxStoreProviderDecorator } from 'stories/decorators/ReduxStoreProviderDecorator';

const meta: Meta<typeof Task> = {
    title: 'TODOLISTS/Task',
    component: Task,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    args: {
        task: {
            id: '123',
            title: 'JS',
            status: TaskStatuses.Completed,
            todoListId: '123123123',
            description: '',
            priority: TaskPriorities.Low,
            order: 0,
            startDate: '',
            deadline: '',
            addedDate: ''
        }
    },
    decorators: [ReduxStoreProviderDecorator]
};

export default meta;

type Story = StoryObj<typeof Task>;

export const TaskIsDoneTrueStory: Story = {};

export const TaskIsDoneFalseStory: Story = {
    args: {
        task: {
            id: '123',
            title: 'JS',
            status: TaskStatuses.New,
            todoListId: '123123123',
            description: '',
            priority: TaskPriorities.Low,
            order: 0,
            startDate: '',
            deadline: '',
            addedDate: ''
        }
    }
};