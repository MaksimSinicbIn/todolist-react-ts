import { combineReducers } from "redux";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { appReducer } from "./app-reducer";
import { authReducer } from "../features/auth/model/authSlice";
import { todolistsReducer } from "features/TodolistList/model/todolists/todolistsSlice";
import { tasksReducer } from "features/TodolistList/model/tasks/tasksSlice";
import { configureStore, UnknownAction } from "@reduxjs/toolkit";

export const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer,
    auth: authReducer,
    app: appReducer
})

export const store = configureStore({reducer: rootReducer})

export type AppRootStateType = ReturnType<typeof rootReducer>

export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, UnknownAction>;

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, UnknownAction>;

// @ts-ignore
window.store = store