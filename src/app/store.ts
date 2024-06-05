import { combineReducers } from "redux";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { appReducer } from "./app-reducer";
import { authReducer } from "../features/auth/model/auth-reducer";
import { todolistsReducer } from "features/TodolistList/todolists-reducer";
import { tasksReducer } from "features/TodolistList/tasks-reducer";
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