import { createSlice } from "@reduxjs/toolkit"
import { appActions } from "app/app-reducer"
import { createAppAsyncThunk, handleServerNetworkError, handleServerAppError } from "common/utils"
import { TaskType, ArgsAddType, ArgsRemoveTaskType, ArgsUpdateTaskType, UpdateTaskModelType } from "features/TodolistList/api/tasks-api.type"
import { todolistsActions, todolistsThunks } from "../todolists/todolistsSlice"
import { ResultCode } from "common/enums"
import { TasksApi } from "features/TodolistList/api/tasks-api"

export type TasksStateType = {
    [key: string]: TaskType[]
}

const initialState: TasksStateType = {}

const slice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTasks.fulfilled, (state, action) => {
                state[action.payload.todolistId] = action.payload.tasks
            })
            .addCase(addTask.fulfilled, (state, action) => {
                state[action.payload.task.todoListId].unshift(action.payload.task)
            })
            .addCase(removeTask.fulfilled, (state, action) => {
                const index = state[action.payload.todolistId].findIndex(t => t.id === action.payload.taskId)
                if (index !== -1) {
                    state[action.payload.todolistId].splice(index, 1)
                }
            })
            .addCase(updateTask.fulfilled, (state, action) => {
                const index = state[action.payload.todolistId].findIndex(t => t.id === action.payload.taskId)
                if (index !== -1) {
                    state[action.payload.todolistId][index] = { ...state[action.payload.todolistId][index], ...action.payload.domainModel }
                }
            })
            .addCase(todolistsThunks.fetchTodolists.fulfilled, (state, action) => {
                action.payload.todolists.forEach(tl => {
                    state[tl.id] = []
                })
            })
            .addCase(todolistsActions.clearData, () => {
                return {}
            })
            .addCase(todolistsThunks.addTodolist.fulfilled, (state, action) => {
                state[action.payload.todolist.id] = []
            })
            .addCase(todolistsThunks.removeTodolist.fulfilled, (state, action) => {
                delete state[action.payload.id]
            })
    },
    selectors: {
        selectTasks: (state) => state
    }
})

// Thunk
const fetchTasks = createAppAsyncThunk<{ tasks: TaskType[], todolistId: string }, string>(`${slice.name}/fetchTasks`, async (todolistId: string, thunkApi) => {
    const { dispatch, rejectWithValue } = thunkApi
    try {
        dispatch(appActions.setAppStatus({ status: 'loading' }))
        const res = await TasksApi.getTasks(todolistId)
        const tasks = res.data.items
        dispatch(appActions.setAppStatus({ status: 'succeeded' }))
        return { tasks, todolistId }
    } catch (e) {
        handleServerNetworkError(dispatch, e)
        return rejectWithValue(null)
    }
})

const addTask = createAppAsyncThunk<{ task: TaskType }, ArgsAddType>(`${slice.name}/addTask`, async (arg, thunkApi) => {
    const { dispatch, rejectWithValue } = thunkApi
    try {
        dispatch(appActions.setAppStatus({ status: 'loading' }))
        const res = await TasksApi.createTasks(arg)
        if (res.data.resultCode === ResultCode.success) {
            const task = res.data.data.item
            dispatch(appActions.setAppStatus({ status: 'succeeded' }))
            return { task }
        } else {
            handleServerAppError(dispatch, res.data)
            return rejectWithValue(null)
        }
    } catch (e) {
        handleServerNetworkError(dispatch, e)
        return rejectWithValue(null)
    }
})

const removeTask = createAppAsyncThunk<ArgsRemoveTaskType, ArgsRemoveTaskType>(`${slice.name}/removeTask`, async (arg, thunkApi) => {
    const { dispatch, rejectWithValue } = thunkApi
    try {
        const res = await TasksApi.deleteTasks(arg.todolistId, arg.taskId)
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

const updateTask = createAppAsyncThunk<ArgsUpdateTaskType, ArgsUpdateTaskType>(`${slice.name}/updateTask`, async (arg, thunkApi) => {
    const { dispatch, rejectWithValue, getState } = thunkApi
    try {
        const state = getState()
        const task = state.tasks[arg.todolistId].find(t => t.id === arg.taskId)
        if (!task) {
            console.warn('task not found in the state')
            return rejectWithValue(null);
        }
        const apiModel: UpdateTaskModelType = {
            title: task.title,
            description: task.description,
            status: task.status,
            priority: task.priority,
            startDate: task.startDate,
            deadline: task.addedDate,
            ...arg.domainModel
        }
        const res = await TasksApi.updateTasks(arg.todolistId, arg.taskId, apiModel)
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

export const tasksReducer = slice.reducer
export const tasksActions = slice.actions
export const { selectTasks } = slice.selectors
export const tasksThunks = { fetchTasks, addTask, removeTask, updateTask }