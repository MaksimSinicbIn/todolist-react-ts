import type {Meta, StoryObj} from '@storybook/react';
import App from './App';
import {ReduxStoreProviderDecorator} from './ReduxStoreProviderDecorator';

const meta: Meta<typeof App> = {
    title: 'APP/App',
    component: App,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    args: {
        demo: true
    },
    decorators: [ReduxStoreProviderDecorator]
}

export default meta;

type Story = StoryObj<typeof meta>;

export const AppStory: Story = {};