import { Dispatch } from "redux"
import { AppRootStateType, AppThunk } from "./store"
import { TaskType, TasksApi, UpdateTaskModelType } from "../api/tasks-api"
import { AddTodolistActionType, RemoveTodolistActionType, SetTodolistsActionType } from "./todolists-reducer"
import { appActions } from "./app-reducer"
import { handleServerAppError, handleServerNetworkError } from "../utils/error-utils"

type RemoveTaskActionType = ReturnType<typeof removeTaskAC>
type AddTaskActionType = ReturnType<typeof addTaskAC>
type UpdateTaskActionType = ReturnType<typeof updateTaskAC>
type SetTasksACActionType = ReturnType<typeof setTasksAC>

type ActionsType = 
    | RemoveTaskActionType
    | AddTaskActionType
    | UpdateTaskActionType
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTodolistsActionType
    | SetTasksACActionType

export type TasksStateType = {
    [key: string]: TaskType[]
}

const initialState: TasksStateType = {}

export const tasksReducer = (state = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'SET-TASKS':
            return {...state, [action.todolistId]: action.tasks}
        case 'ADD-TASK':
            return {...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]}
        case 'REMOVE-TASK':
            return {...state, [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.id)}
        case 'UPDATE-TASK':
            return {...state, [action.todolistId]: state[action.todolistId].map(t => t.id === action.id ? {...t, ...action.model} : t)}
        case 'ADD-TODOLIST':
            return {...state, [action.todolist.id]: []}
        case 'REMOVE-TODOLIST':
            const stateCopy = { ...state }
            delete stateCopy[action.id]
            return stateCopy
        case 'SET-TODOLIST':
            const copyState = { ...state }
            action.todolists.forEach(tl => {
                copyState[tl.id] = []
            })
            return copyState
        default:
            return state
    }
}

// Action Creators
export const setTasksAC = (todolistId: string, tasks: TaskType[]) => {
    return { type: 'SET-TASKS', todolistId, tasks } as const
}

export const addTaskAC = (task: TaskType) => {
    return { type: 'ADD-TASK', task } as const
}

export const removeTaskAC = (todolistId: string, id: string) => {
    return { type: 'REMOVE-TASK', todolistId, id} as const
}

export const updateTaskAC = (todolistId: string, id: string, model: Partial<UpdateTaskModelType>) => {
    return { type: 'UPDATE-TASK', todolistId, id, model} as const
}

// Thunk Creators
export const setTasksTC = (todolistId: string): AppThunk  => async (dispatch: Dispatch) => {
    dispatch(appActions.setAppStatus({status: 'loading'}))
    try {
        const res = await TasksApi.getTasks(todolistId)
        dispatch(setTasksAC(todolistId, res.data.items))
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
            dispatch(addTaskAC(res.data.data.item))
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
            dispatch(removeTaskAC(todolistId, id))
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
                dispatch(updateTaskAC(todolistId, id, apiModel))
            } else {
                handleServerAppError(dispatch, res.data)
            }
        } catch (e) {
            handleServerNetworkError(dispatch, e)
        }
    }
}