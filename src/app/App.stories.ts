import type {Meta, StoryObj} from '@storybook/react';
import App from './App';
import {HashRouterStoreDecorator, ReduxStoreProviderDecorator} from '../state/ReduxStoreProviderDecorator';

const meta: Meta<typeof App> = {
    title: 'TODOLISTS/App',
    component: App,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    args: {
        demo: true
    },
    decorators: [ReduxStoreProviderDecorator, HashRouterStoreDecorator]
};

export default meta;
type Story = StoryObj<typeof App>;

export const AppStory: Story = {};