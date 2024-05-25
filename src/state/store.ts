import { combineReducers } from "redux";
import { todolistsReducer } from "./todolists-reducer";
import { tasksReducer } from "./tasks-reducer";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { appReducer } from "./app-reducer";
import { authReducer } from "./auth-reducer";
import { configureStore, UnknownAction } from "@reduxjs/toolkit";

export const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer,
    auth: authReducer,
    app: appReducer
})

//@ts-ignore
export const store = configureStore({reducer: rootReducer})

export type AppRootStateType = ReturnType<typeof rootReducer>

// создаем тип диспатча который принимает как AC так и TC
export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, UnknownAction>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, UnknownAction>;

export const useAppDispatch = useDispatch<AppDispatch>
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector

// @ts-ignore
window.store = store