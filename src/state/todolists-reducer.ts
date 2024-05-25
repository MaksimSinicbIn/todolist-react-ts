import { TodolistApi, TodolistApiType } from "../api/todolist-api";
import { Dispatch } from "redux";
import { RequestStatusType, appActions } from "./app-reducer";
import { handleServerAppError, handleServerNetworkError } from "../utils/error-utils";
import { AppThunk } from "./store";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type FilterValuesType = "all" | "active" | "completed";

export type TodolistDomainType = TodolistApiType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}

const initialState: TodolistDomainType[] = []

const slice = createSlice({
    name: 'todolists',
    initialState,
    reducers: {
        removeTodolist: (state, action: PayloadAction<{ id: string }>) => {
            const index = state.findIndex(tl => tl.id === action.payload.id)
            if (index !== -1) {
                state.splice(index, 1)
            }
        },
        addTodolist: (state, action: PayloadAction<{ todolist: TodolistApiType }>) => {
            state.unshift({ ...action.payload.todolist, filter: 'all', entityStatus: 'idle' })
        },
        changeTodolistTitle: (state, action: PayloadAction<{ id: string, title: string }>) => {
            const index = state.findIndex(tl => tl.id === action.payload.id)
            if (index !== -1) {
                state[index].title = action.payload.title
            }
        },
        changeTodolistFilter: (state, action: PayloadAction<{ id: string, newFilter: FilterValuesType }>) => {
            const index = state.findIndex(tl => tl.id === action.payload.id)
            if (index !== -1) {
                state[index].filter = action.payload.newFilter
            }
        },
        changeTodolistEntityStatus: (state, action: PayloadAction<{ id: string, entityStatus: RequestStatusType }>) => {
            const index = state.findIndex(tl => tl.id === action.payload.id)
            if (index !== -1) {
                state[index].entityStatus = action.payload.entityStatus
            }
        },
        setTodolists: (state, action: PayloadAction<{ todolists: TodolistApiType[] }>) => {
            // return action.payload.todolists.map((tl) => ({...tl, filter: "all", entityStatus: "idle"})); // вариант проще и не запрещено докой по тулкиту
            action.payload.todolists.forEach(tl => {state.push({ ...tl, filter: 'all', entityStatus: 'idle' })})
        }
    },
    selectors: {
        selectTodolists: (state) => state
    }
})

export const todolistsReducer = slice.reducer
export const todolistsActions = slice.actions
export const { selectTodolists } = slice.selectors

// Thunk Creators
export const getTodolistsTC = (): AppThunk => async (dispatch: Dispatch) => {
    dispatch(appActions.setAppStatus({status: 'loading'}))
    try {
        const res = await TodolistApi.getTodolists()
        dispatch(todolistsActions.setTodolists({todolists: res.data}))
        dispatch(appActions.setAppStatus({status: 'succeeded'}))
    } catch (e) {
        handleServerNetworkError(dispatch, e)
    }
}

export const addTodolistTC = (title: string): AppThunk => async (dispatch: Dispatch) => {
    dispatch(appActions.setAppStatus({status: 'loading'}))
    try {
        const res = await TodolistApi.createTodolists(title)
        if (res.data.resultCode === 0) {
            dispatch(todolistsActions.addTodolist({todolist: res.data.data.item}))
            dispatch(appActions.setAppStatus({status: 'succeeded'}))
        } else {
            handleServerAppError(dispatch, res.data)
        }
    } catch (e) {
        handleServerNetworkError(dispatch, e)
    }
}

export const removeTodolistTC = (todolistId: string): AppThunk => async (dispatch: Dispatch) => {
    dispatch(appActions.setAppStatus({status: 'loading'}))
    dispatch(todolistsActions.changeTodolistEntityStatus({id: todolistId, entityStatus:'loading'}))
    try {
        const res = await TodolistApi.deleteTodolists(todolistId)
        if (res.data.resultCode === 0) {
            dispatch(todolistsActions.removeTodolist({id: todolistId}))
            dispatch(appActions.setAppStatus({status: 'succeeded'}))
        } else {
            handleServerAppError(dispatch, res.data)
        }
    } catch (e) {
        handleServerNetworkError(dispatch, e)
    }
}

export const updateTodolistTC = (todolistId: string, title: string): AppThunk => async (dispatch: Dispatch) => {
    try {
        const res = await TodolistApi.updateTodolists(todolistId, title)
        if (res.data.resultCode === 0) {
            dispatch(todolistsActions.changeTodolistTitle({id: todolistId, title}))
        } else {
            handleServerAppError(dispatch, res.data)
        }
    } catch (e) {
        handleServerNetworkError(dispatch, e)
    }
}