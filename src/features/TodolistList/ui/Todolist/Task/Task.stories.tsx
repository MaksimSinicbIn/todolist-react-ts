import type {Meta, StoryObj} from '@storybook/react';
import { fn } from '@storybook/test';
import { Task } from './Task';
import { TaskPriorities, TaskStatuses } from 'common/enums';


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
    }
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