import { combineReducers } from "redux";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { configureStore, UnknownAction } from "@reduxjs/toolkit";
import { appReducer, appSlice } from "app/appSlice";
import { authReducer, authSlice } from "features/auth/model/authSlice";
import { todolistsReducer, todolistsSlice } from "features/TodolistList/model/todolists/todolistsSlice";
import { tasksReducer, tasksSlice } from "features/TodolistList/model/tasks/tasksSlice";

export const rootReducer = combineReducers({
    [todolistsSlice.name]: todolistsReducer,
    [tasksSlice.name]: tasksReducer,
    [authSlice.name]: authReducer,
    [appSlice.name]: appReducer
})

export const store = configureStore({reducer: rootReducer})

export type AppRootStateType = ReturnType<typeof rootReducer>

export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, UnknownAction>;

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, UnknownAction>;

// @ts-ignore
window.store = store