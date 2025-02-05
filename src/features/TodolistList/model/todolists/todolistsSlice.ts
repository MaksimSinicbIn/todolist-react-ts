import { PayloadAction, createSlice, isRejected } from "@reduxjs/toolkit";
import { RequestStatusType, appActions } from "app/appSlice";
import { ResultCode } from "common/enums";
import { TodolistApi } from "features/TodolistList/api/todolists-api";
import { TodolistApiType, ArgUpdateTodolistType } from "features/TodolistList/api/todolists-api.type";
import { createAppAsyncThunk } from "common/utils";

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
            .addMatcher(isRejected(todolistsThunks.removeTodolist), (state) => {
                return state.map((tl) => {
                    return { ...tl, entityStatus: 'idle' }
                })
            })
    },
    selectors: {
        selectTodolists: (state) => state
    }
})

// Thunk
const fetchTodolists = createAppAsyncThunk<{ todolists: TodolistApiType[] }, void>(`${slice.name}/fetchTodolists`,
    async () => {
        const res = await TodolistApi.getTodolists()
        const todolists = res.data
        return { todolists }
    }
)

const addTodolist = createAppAsyncThunk<{ todolist: TodolistApiType }, { title: string }>(`${slice.name}/addTodolist`,
    async (arg, { rejectWithValue }) => {
        const res = await TodolistApi.createTodolists(arg.title)
        if (res.data.resultCode === ResultCode.success) {
            return { todolist: res.data.data.item }
        } else {
            return rejectWithValue(res.data)
        }
    }
)

const removeTodolist = createAppAsyncThunk<{ id: string }, string>(`${slice.name}/removeTodolist`, async (id, thunkApi) => {
    const { dispatch, rejectWithValue } = thunkApi
    const res = await TodolistApi.deleteTodolists(id)
    if (res.data.resultCode === ResultCode.success) {
        dispatch(appActions.setAppStatus({ status: 'succeeded' }))
        return { id }
    } else {
        return rejectWithValue(res.data)
    }
})

const changeTodolistTitle = createAppAsyncThunk<ArgUpdateTodolistType, ArgUpdateTodolistType>(`${slice.name}/updateTodolist`,
    async (arg, { rejectWithValue }) => {
        const res = await TodolistApi.updateTodolists(arg)
        if (res.data.resultCode === ResultCode.success) {
            return arg
        } else {
            return rejectWithValue(res.data)
        }
    }
)

export const todolistsReducer = slice.reducer
export const todolistsActions = slice.actions
export const { selectTodolists } = slice.selectors
export const todolistsThunks = { fetchTodolists, addTodolist, removeTodolist, changeTodolistTitle }