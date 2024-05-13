import { Dispatch } from "redux"
import { AppRootStateType } from "./store"
import { TaskType, TasksApi, UpdateTaskModelType } from "../api/tasks-api"
import { AddTodolistActionType, RemoveTodolistActionType, SetTodolistsActionType } from "./todolists-reducer"
import { SetErrorActionType, SetStatusActionType, setAppError, setAppStatus } from "./app-reducer"
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
    | SetStatusActionType
    | SetErrorActionType

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
export const setTasksTC = (todolistId: string) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatus('loading'))
    TasksApi.getTasks(todolistId)
            .then(res => {
                dispatch(setTasksAC(todolistId, res.data.items))
                dispatch(setAppStatus('succeeded'))
            })
            .catch(e => {
                handleServerNetworkError(dispatch, e)
            })
}

export const addTaskTC = (todolistId: string, title: string) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatus('loading'))
    TasksApi.createTasks(todolistId, title)
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(addTaskAC(res.data.data.item))
                    dispatch(setAppStatus('succeeded'))
                } else {
                    handleServerAppError(dispatch, res.data)
                }
            })
            .catch(e => {
                handleServerNetworkError(dispatch, e)
            })
}

export const removeTaskTC = (todolistId: string, id: string) => (dispatch: Dispatch<ActionsType>) => {
    TasksApi.deleteTasks(todolistId, id)
            .then(res => {
                dispatch(removeTaskAC(todolistId, id))
            })
            .catch(e => {
                handleServerNetworkError(dispatch, e)
            })
}

export const updateTaskTC = (todolistId: string, id: string, domainModel: Partial<UpdateTaskModelType>) => {
    return (dispatch: Dispatch<ActionsType>, getState: () => AppRootStateType) => {
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
        TasksApi.updateTasks(todolistId, id, apiModel)
                .then(res => {
                    if (res.data.resultCode === 0) {
                        dispatch(updateTaskAC(todolistId, id, apiModel))
                    } else {
                        handleServerAppError(dispatch, res.data)
                    }
                })
                .catch(e => {
                    handleServerNetworkError(dispatch, e)
                })
        }
    }