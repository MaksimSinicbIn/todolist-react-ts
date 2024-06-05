import { ArgsAddType, ArgsRemoveTaskType, ArgsUpdateTaskType, TaskType, TasksApi, UpdateTaskModelType } from "api/tasks-api"
import { appActions } from "./app-reducer"
import { createSlice } from "@reduxjs/toolkit"
import { todolistsActions } from "./todolists-reducer"
import { handleServerNetworkError } from "utils/handleServerNetworError"
import { handleServerAppError } from "utils/handleServerAppError"
import { createAppAsyncThunk } from "utils/createAppAsyncThunk"

export type TasksStateType = {
    [key: string]: TaskType[]
}

const initialState: TasksStateType = {}

const slice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        // setTasks: (state, action: PayloadAction<{ todolistId: string, tasks: TaskType[] }>) => {
        //     state[action.payload.todolistId] = action.payload.tasks
        // },
        // addTask: (state, action: PayloadAction<{ task: TaskType }>) => {
        //     state[action.payload.task.todoListId].unshift(action.payload.task)
        // },
        // removeTask: (state, action: PayloadAction<{ todolistId: string, id: string }>) => {
        //     const index = state[action.payload.todolistId].findIndex(t => t.id === action.payload.id)
        //     if (index !== -1) {
        //         state[action.payload.todolistId].splice(index, 1)
        //     }
        // },
        // updateTask: (state, action: PayloadAction<{ todolistId: string, id: string, model: Partial<UpdateTaskModelType> }>) => {
        //     const index = state[action.payload.todolistId].findIndex(t => t.id === action.payload.id)
        //     if (index !== -1) {
        //         state[action.payload.todolistId][index] = {...state[action.payload.todolistId][index], ...action.payload.model}
        //     }
        // },
    },
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
            .addCase(todolistsActions.setTodolists, (state, action) => {
                action.payload.todolists.forEach( tl => {
                    state[tl.id] = []
                })
            })
            .addCase(todolistsActions.clearData, () => {
                return {}
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

const fetchTasks = createAppAsyncThunk<{ tasks: TaskType[], todolistId: string }, string>(`${slice.name}/fetchTasks`, async (todolistId: string, thunkApi) => {
    const {dispatch, rejectWithValue} = thunkApi
    try {
        dispatch(appActions.setAppStatus({status: 'loading'}))
        const res = await TasksApi.getTasks(todolistId) 
        const tasks = res.data.items
        dispatch(appActions.setAppStatus({status: 'succeeded'}))
        return {tasks, todolistId}
    } catch (e) {
        handleServerNetworkError(dispatch, e)
        return rejectWithValue(null)
    }
})

const addTask = createAppAsyncThunk<{ task: TaskType}, ArgsAddType>(`${slice.name}/addTask`, async (arg, thunkApi) => {
    const { dispatch, rejectWithValue } = thunkApi
    try {
        dispatch(appActions.setAppStatus({status: 'loading'}))
        const res = await TasksApi.createTasks(arg)
        if (res.data.resultCode === 0) {
            const task = res.data.data.item
            dispatch(appActions.setAppStatus({status: 'succeeded'}))
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
        if (res.data.resultCode === 0) {
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
    const { dispatch, getState, rejectWithValue } = thunkApi
    try {
        const tasks = getState().tasks
        const task = tasks[arg.todolistId].find(t => t.id === arg.taskId)
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
        if (res.data.resultCode === 0) {
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

// Thunk Creators

// export const fetchTasks1 = (todolistId: string): AppThunk  => async (dispatch: Dispatch) => {
//     dispatch(appActions.setAppStatus({status: 'loading'}))
//     try {
//         const res = await TasksApi.getTasks(todolistId)
//         dispatch(tasksActions.setTasks({todolistId, tasks: res.data.items}))
//         dispatch(appActions.setAppStatus({status: 'succeeded'}))
//     } catch (e) {
//         handleServerNetworkError(dispatch, e)
//     }
// }

// export const addTaskTC = (todolistId: string, title: string): AppThunk  => async (dispatch: Dispatch) => {
//     dispatch(appActions.setAppStatus({status: 'loading'}))
//     try {
//         const res = await TasksApi.createTasks(todolistId, title)
//         if (res.data.resultCode === 0) {
//             dispatch(tasksActions.addTask({task: res.data.data.item}))
//             dispatch(appActions.setAppStatus({status: 'succeeded'}))
//         } else {
//             handleServerAppError(dispatch, res.data)
//         }
//     } catch (e) {
//         handleServerNetworkError(dispatch, e)
//     }
// }

// export const removeTaskTC = (todolistId: string, id: string): AppThunk  => async (dispatch: Dispatch) => {
//     try {
//         const res = await TasksApi.deleteTasks(todolistId, id)
//         if (res.data.resultCode === 0) {
//             dispatch(tasksActions.removeTask({todolistId, id}))
//         } else {
//             handleServerAppError(dispatch, res.data)
//         }
//     } catch (e) {
//         handleServerNetworkError(dispatch, e)
//     }
// }

// export const updateTaskTC = (todolistId: string, id: string, domainModel: Partial<UpdateTaskModelType>): AppThunk  => {
//     return async (dispatch: Dispatch, getState: () => AppRootStateType) => {
//         const tasks = getState().tasks
//         const task = tasks[todolistId].find(t => t.id === id)
//         if (!task) {
//             console.warn('task not found in the state')
//             return;
//         }
//         const apiModel: UpdateTaskModelType = {
//             title: task.title,
//             description: task.description,
//             status: task.status,
//             priority: task.priority,
//             startDate: task.startDate,
//             deadline: task.addedDate,
//             ...domainModel
//         }
//         try {
//             const res = await TasksApi.updateTasks(todolistId, id, apiModel)
//             if (res.data.resultCode === 0) {
//                 dispatch(tasksActions.updateTask({todolistId, id, model: apiModel}))
//             } else {
//                 handleServerAppError(dispatch, res.data)
//             }
//         } catch (e) {
//             handleServerNetworkError(dispatch, e)
//         }
//     }
// }

export const tasksReducer = slice.reducer
export const tasksActions = slice.actions
export const { selectTasks } = slice.selectors
export const tasksThunks = { fetchTasks, addTask, removeTask, updateTask }