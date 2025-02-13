/* eslint-disable no-useless-computed-key */
import React from 'react';
import { combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { AppRootStateType } from 'app/store';
import { v1 } from 'uuid';
import { tasksReducer, tasksSlice } from 'features/TodolistList/model/tasks/tasksSlice';
import { todolistsReducer, todolistsSlice } from 'features/TodolistList/model/todolists/todolistsSlice';
import { authReducer, authSlice } from 'features/auth/model/authSlice';
import { TaskPriorities, TaskStatuses } from 'common/enums';
import { appReducer, appSlice } from 'app/appSlice';
import { HashRouter } from 'react-router';

const rootReducer = combineReducers({
    [todolistsSlice.name]: todolistsReducer,
    [tasksSlice.name]: tasksReducer,
    [authSlice.name]: authReducer,
    [appSlice.name]: appReducer
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
        themeMode: 'dark',
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

export const HashRouterStoreDecorator = (storyFn: () => React.ReactNode) => {
    return <HashRouter>
        {storyFn()}
    </HashRouter>
}