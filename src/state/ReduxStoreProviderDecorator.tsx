/* eslint-disable no-useless-computed-key */
import React from 'react';
import { Provider } from 'react-redux';
import { AppRootStateType } from './store';
import { combineReducers } from 'redux';
import { tasksReducer } from './tasks-reducer';
import { todolistsReducer } from './todolists-reducer';
import { v1 } from 'uuid';
import { TaskPriorities, TaskStatuses } from '../api/tasks-api';
import { appReducer } from './app-reducer';
import { authReducer } from './auth-reducer';
import { HashRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';


const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    auth: authReducer,
    app: appReducer
})

const initialGlobalState: AppRootStateType = {
    todolists: [
        { id: "todolistId1", title: "What to learn", filter: "all", entityStatus: 'idle', addedDate: '', order: 0 },
        { id: "todolistId2", title: "What to buy", filter: "all", entityStatus: 'loading', addedDate: '', order: 0 }
    ],
    tasks: {
        ["todolistId1"]: [
            {
                id: v1(),
                title: "HTML&CSS",
                status: TaskStatuses.Completed,
                todoListId: "todolistId1",
                description: '',
                priority: TaskPriorities.Low,
                order: 0,
                startDate: '',
                deadline: '',
                addedDate: ''
            },
            {
                id: v1(), title: "JS", status: TaskStatuses.New,
                todoListId: "todolistId1",
                description: '',
                priority: TaskPriorities.Low,
                order: 0,
                startDate: '',
                deadline: '',
                addedDate: ''
            }
        ],
        ["todolistId2"]: [
            {
                id: v1(),
                title: "Milk",
                status: TaskStatuses.New,
                todoListId: "todolistId1",
                description: '',
                priority: TaskPriorities.Low,
                order: 0,
                startDate: '',
                deadline: '',
                addedDate: ''
            },
            {
                id: v1(),
                title: "React Book",
                status: TaskStatuses.Completed,
                todoListId: "todolistId1",
                description: '',
                priority: TaskPriorities.Low,
                order: 0,
                startDate: '',
                deadline: '',
                addedDate: ''
            }
        ]
    },
    auth: {
        isLoggedIn: true
    },
    app: {
        isInitialized: true,
        error: null,
        status: 'succeeded'
    }
};

//@ts-ignore
export const storyBookStore = configureStore({
    reducer: rootReducer,
    preloadedState: initialGlobalState
})

export const ReduxStoreProviderDecorator = (storyFn: () => React.ReactNode) => {
    return <Provider store={storyBookStore}>{storyFn()}</Provider>
};

export const HashRouterStoreDecorator = (storyFn: any) => {
    return <HashRouter>
        {storyFn()}
    </HashRouter>
}