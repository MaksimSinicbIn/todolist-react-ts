import { Dispatch } from "redux"
import { AppRootStateType, AppThunk } from "./store"
import { TaskType, TasksApi, UpdateTaskModelType } from "../api/tasks-api"
import { appActions } from "./app-reducer"
import { handleServerAppError, handleServerNetworkError } from "../utils/error-utils"
import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { todolistsActions } from "./todolists-reducer"

export type TasksStateType = {
    [key: string]: TaskType[]
}

const initialState: TasksStateType = {}

const slice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        setTasks: (state, action: PayloadAction<{ todolistId: string, tasks: TaskType[] }>) => {
            state[action.payload.todolistId] = action.payload.tasks
        },
        addTask: (state, action: PayloadAction<{ task: TaskType }>) => {
            state[action.payload.task.todoListId].unshift(action.payload.task)
        },
        removeTask: (state, action: PayloadAction<{ todolistId: string, id: string }>) => {
            const index = state[action.payload.todolistId].findIndex(t => t.id === action.payload.id)
            if (index !== -1) {
                state[action.payload.todolistId].splice(index, 1)
            }
        },
        updateTask: (state, action: PayloadAction<{ todolistId: string, id: string, model: Partial<UpdateTaskModelType> }>) => {
            const index = state[action.payload.todolistId].findIndex(t => t.id === action.payload.id)
            if (index !== -1) {
                state[action.payload.todolistId][index] = {...state[action.payload.todolistId][index], ...action.payload.model}
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(todolistsActions.setTodolists, (state, action) => {
                action.payload.todolists.forEach( tl => {
                    state[tl.id] = []
                })
            })
            .addCase(todolistsActions.addTodolist, (state, action) => {
                state[action.payload.todolist.id] = []
            })
            .addCase(todolistsActions.removeTodolist, (state, action) => {
                delete state[action.payload.id]
            })
    },
    selectors: {
        selectTasks: (state) => state
    }
})

export const tasksReducer = slice.reducer
export const tasksActions = slice.actions
export const { selectTasks } = slice.selectors

// Thunk Creators
export const setTasksTC = (todolistId: string): AppThunk  => async (dispatch: Dispatch) => {
    dispatch(appActions.setAppStatus({status: 'loading'}))
    try {
        const res = await TasksApi.getTasks(todolistId)
        dispatch(tasksActions.setTasks({todolistId, tasks: res.data.items}))
        dispatch(appActions.setAppStatus({status: 'succeeded'}))
    } catch (e) {
        handleServerNetworkError(dispatch, e)
    }
}

export const addTaskTC = (todolistId: string, title: string): AppThunk  => async (dispatch: Dispatch) => {
    dispatch(appActions.setAppStatus({status: 'loading'}))
    try {
        const res = await TasksApi.createTasks(todolistId, title)
        if (res.data.resultCode === 0) {
            dispatch(tasksActions.addTask({task: res.data.data.item}))
            dispatch(appActions.setAppStatus({status: 'succeeded'}))
        } else {
            handleServerAppError(dispatch, res.data)
        }
    } catch (e) {
        handleServerNetworkError(dispatch, e)
    }
}

export const removeTaskTC = (todolistId: string, id: string): AppThunk  => async (dispatch: Dispatch) => {
    try {
        const res = await TasksApi.deleteTasks(todolistId, id)
        if (res.data.resultCode === 0) {
            dispatch(tasksActions.removeTask({todolistId, id}))
        } else {
            handleServerAppError(dispatch, res.data)
        }
    } catch (e) {
        handleServerNetworkError(dispatch, e)
    }
}

export const updateTaskTC = (todolistId: string, id: string, domainModel: Partial<UpdateTaskModelType>): AppThunk  => {
    return async (dispatch: Dispatch, getState: () => AppRootStateType) => {
        const tasks = getState().tasks
        const task = tasks[todolistId].find(t => t.id === id)
        if (!task) {
            console.warn('task not found in the state')
            return;
        }
        const apiModel: UpdateTaskModelType = {
            title: task.title,
            description: task.description,
            status: task.status,
            priority: task.priority,
            startDate: task.startDate,
            deadline: task.addedDate,
            ...domainModel
        }
        try {
            const res = await TasksApi.updateTasks(todolistId, id, apiModel)
            if (res.data.resultCode === 0) {
                dispatch(tasksActions.updateTask({todolistId, id, model: apiModel}))
            } else {
                handleServerAppError(dispatch, res.data)
            }
        } catch (e) {
            handleServerNetworkError(dispatch, e)
        }
    }
}