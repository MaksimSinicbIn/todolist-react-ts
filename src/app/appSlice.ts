import { AnyAction, PayloadAction, createSlice, isFulfilled, isPending, isRejected } from "@reduxjs/toolkit"
import { tasksThunks } from "features/TodolistList/model/tasks/tasksSlice"
import { todolistsThunks } from "features/TodolistList/model/todolists/todolistsSlice"

export type ThemeMode = "dark" | "light"
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
    isInitialized: false,
    themeMode: "light" as ThemeMode,
    error: null as null | string,
    status: 'loading' as RequestStatusType,
}

export type InitialStateType = typeof initialState

const slice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        changeTheme: (state, action: PayloadAction<{ themeMode: ThemeMode }>) => {
            state.themeMode = action.payload.themeMode
        },
        setAppStatus: (state, action: PayloadAction<{ status: RequestStatusType }>) => {
            state.status = action.payload.status
        },
        setAppError: (state, action: PayloadAction<{ error: null | string }>) => {
            state.error = action.payload.error
        },
        setInitialized: (state, action: PayloadAction<{ isInitialized: boolean }>) => {
            state.isInitialized = action.payload.isInitialized
        },
    },
    extraReducers: (builder) => {
        builder
            .addMatcher(isPending, (state, action) => {
                state.status = 'loading'
            })
            .addMatcher(isFulfilled, (state, action) => {
                state.status = 'succeeded'
            })
            .addMatcher(isRejected, (state, action: AnyAction) => {
                state.status = 'failed'
                if (action.payload) {
                    if (action.type === todolistsThunks.addTodolist.rejected.type || tasksThunks.addTask.rejected.type) return
                    state.error = action.payload.messages[0]
                    console.log(action.payload.messages[0]);
                    
                } else {
                    state.error = action.error.message ? action.error.message : 'Some error occurred'
                }
            })
    },
    selectors: {
        selectError: (state) => state.error,
        selectStatus: (state) => state.status,
        selectThemeMode: (state) => state.themeMode,
        selectIsInitialized: (state) => state.isInitialized,
    }
})

export const appReducer = slice.reducer
export const appActions = slice.actions
export const { selectError, selectStatus, selectThemeMode, selectIsInitialized } = slice.selectors