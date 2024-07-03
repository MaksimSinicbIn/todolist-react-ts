import { ArgUpdateTodolistType, TodolistApi, TodolistApiType } from "features/TodolistList/api/todolist-api";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RequestStatusType, appActions } from "app/app-reducer";
import { createAppAsyncThunk, handleServerAppError, handleServerNetworkError } from "common/utils";
import { ResultCode } from "common/enums";

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
        clearData: () => {
            return []
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(todolistsThunks.fetchTodolists.fulfilled, (state, action) => {
                action.payload.todolists.forEach(tl => { state.push({ ...tl, filter: 'all', entityStatus: 'idle' }) })
            })
            .addCase(todolistsThunks.addTodolist.fulfilled, (state, action) => {
                state.unshift({ ...action.payload.todolist, filter: 'all', entityStatus: 'idle' })
            })
            .addCase(todolistsThunks.removeTodolist.fulfilled, (state, action) => {
                const index = state.findIndex(tl => tl.id === action.payload.id)
                if (index !== -1) {
                    state.splice(index, 1)
                }
            })
            .addCase(todolistsThunks.changeTodolistTitle.fulfilled, (state, action) => {
                const index = state.findIndex(tl => tl.id === action.payload.todolistId)
                if (index !== -1) {
                    state[index].title = action.payload.title
                }
            })
    },
    selectors: {
        selectTodolists: (state) => state
    }
})

// Thunk
const fetchTodolists = createAppAsyncThunk<{ todolists: TodolistApiType[] }, void>(`${slice.name}/fetchTodolists`, async (_, thunkApi) => {
    const { dispatch, rejectWithValue } = thunkApi
    try {
        dispatch(appActions.setAppStatus({ status: 'loading' }))
        const res = await TodolistApi.getTodolists()
        const todolists = res.data
        dispatch(appActions.setAppStatus({ status: 'succeeded' }))
        return { todolists }
    } catch (e) {
        handleServerNetworkError(dispatch, e)
        return rejectWithValue(null)
    }
})

const addTodolist = createAppAsyncThunk<{ todolist: TodolistApiType }, { title: string }>(`${slice.name}/addTodolist`, async (arg, thunkApi) => {
    const { dispatch, rejectWithValue } = thunkApi
    try {
        dispatch(appActions.setAppStatus({ status: 'loading' }))
        const res = await TodolistApi.createTodolists(arg.title)
        if (res.data.resultCode === ResultCode.success) {
            dispatch(appActions.setAppStatus({ status: 'succeeded' }))
            return { todolist: res.data.data.item }
        } else {
            handleServerAppError(dispatch, res.data)
            return rejectWithValue(null)
        }
    } catch (e) {
        handleServerNetworkError(dispatch, e)
        return rejectWithValue(null)
    }
})

const removeTodolist = createAppAsyncThunk<{ id: string }, string>(`${slice.name}/removeTodolist`, async (id, thunkApi) => {
    const { dispatch, rejectWithValue } = thunkApi
    try {
        dispatch(appActions.setAppStatus({ status: 'loading' }))
        dispatch(todolistsActions.changeTodolistEntityStatus({ id, entityStatus: 'loading' }))
        const res = await TodolistApi.deleteTodolists(id)
        if (res.data.resultCode === ResultCode.success) {
            dispatch(appActions.setAppStatus({ status: 'succeeded' }))
            return { id }
        } else {
            handleServerAppError(dispatch, res.data)
            return rejectWithValue(null)
        }
    } catch (e) {
        handleServerNetworkError(dispatch, e)
        return rejectWithValue(null)
    }
})

const changeTodolistTitle = createAppAsyncThunk<ArgUpdateTodolistType, ArgUpdateTodolistType>(`${slice.name}/updateTodolist`, async (arg, thunkApi) => {
    const { dispatch, rejectWithValue } = thunkApi
    try {
        const res = await TodolistApi.updateTodolists(arg)
        if (res.data.resultCode === ResultCode.success) {
            return arg
        } else {
            handleServerAppError(dispatch, res.data)
            return rejectWithValue(null)
        }
    } catch (e) {
        handleServerNetworkError(dispatch, e)
        return rejectWithValue(null)
    }
})

export const todolistsReducer = slice.reducer
export const todolistsActions = slice.actions
export const { selectTodolists } = slice.selectors
export const todolistsThunks = { fetchTodolists, addTodolist, removeTodolist, changeTodolistTitle }